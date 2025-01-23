<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "agtechdb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get repair_id from the query string
$repair_id = $_GET['repair_id'] ?? '';

if (!$repair_id) {
    echo json_encode(['error' => 'Repair ID is required']);
    exit;
}

// Initialize the response
$response = [
    'repair_id' => $repair_id,
    'car_brand' => '',
    'car_model' => '',
    'car_year' => '',
    'plate_number' => '', // Initialize plate number
    'generated_date' => date('Y-m-d'),
    'job_orders' => []
];

// Fetch car details for the given repair ID, including plate_number
$carQuery = $conn->prepare("
    SELECT car_brand, car_model, year_model, plate_number 
    FROM job_orders 
    WHERE id = ? 
    LIMIT 1
");
$carQuery->bind_param("i", $repair_id);
$carQuery->execute();
$carResult = $carQuery->get_result();

if ($carRow = $carResult->fetch_assoc()) {
    $response['car_brand'] = $carRow['car_brand'];
    $response['car_model'] = $carRow['car_model'];
    $response['car_year'] = $carRow['year_model'];
    $response['plate_number'] = $carRow['plate_number']; // Fetch plate number
} else {
    echo json_encode(['error' => 'No vehicle details found for the given repair ID']);
    exit;
}

// Fetch all job orders for the given repair ID
$jobOrdersQuery = $conn->prepare("
    SELECT 
        job_orders.id AS job_order_id,
        job_orders.first_name,
        job_orders.last_name,
        job_orders.appointment_date,
        job_orders.service,
        job_orders.mechanic,
        job_orders.car_brand,
        job_orders.car_model,
        job_orders.year_model,
        job_orders.plate_number
    FROM job_orders
    WHERE id = ?
");
$jobOrdersQuery->bind_param("i", $repair_id);
$jobOrdersQuery->execute();
$jobOrdersResult = $jobOrdersQuery->get_result();

while ($jobOrderRow = $jobOrdersResult->fetch_assoc()) {
    $job_order_id = $jobOrderRow['job_order_id'];

    // Fetch parts associated with this job order
    $partsQuery = $conn->prepare("
        SELECT 
            job_order_parts.part_name,
            job_order_parts.part_quantity,
            job_order_parts.completed_by, -- Fetch completed_by
            inventory.retail_price,
            inventory.labor_cost,
            (job_order_parts.part_quantity * inventory.retail_price) AS total_price
        FROM job_order_parts
        LEFT JOIN inventory ON job_order_parts.part_name = inventory.name
        WHERE job_order_parts.job_order_id = ?
    ");
    $partsQuery->bind_param("i", $job_order_id);
    $partsQuery->execute();
    $partsResult = $partsQuery->get_result();

    $parts = [];
    $total_parts_cost = 0;
    $total_labor_cost = 0;
    $technicians = []; // Array to hold unique technicians

    while ($partRow = $partsResult->fetch_assoc()) {
        $total_parts_cost += $partRow['total_price'];
        $total_labor_cost += $partRow['labor_cost']; // Accumulate labor cost

        // Add to technicians array if not the mechanic and not already in the list
        if ($partRow['completed_by'] && $partRow['completed_by'] !== $jobOrderRow['mechanic']) {
            if (!in_array($partRow['completed_by'], $technicians)) {
                $technicians[] = $partRow['completed_by'];
            }
        }

        $parts[] = [
            'part_name' => $partRow['part_name'],
            'part_quantity' => $partRow['part_quantity'],
            'completed_by' => $partRow['completed_by'] ?? 'N/A', // Include completed_by
            'retail_price' => $partRow['retail_price'],
            'labor_cost' => $partRow['labor_cost'], // Include labor cost in response
            'total_price' => $partRow['total_price']
        ];
    }

    // Calculate the grand total for this job order
    $grand_total = $total_parts_cost + $total_labor_cost;

    // Append job order data
    $response['job_orders'][] = [
        'order_info' => [
            'id' => $jobOrderRow['job_order_id'],
            'first_name' => $jobOrderRow['first_name'],
            'last_name' => $jobOrderRow['last_name'],
            'appointment_date' => $jobOrderRow['appointment_date'],
            'service' => $jobOrderRow['service'],
            'mechanic' => $jobOrderRow['mechanic'],
            'vehicle' => $jobOrderRow['car_brand'] . ' ' . $jobOrderRow['car_model'] . ' ' . $jobOrderRow['year_model'] . ' (' . $jobOrderRow['plate_number'] . ')',
            'technicians' => $technicians // Include technicians array
        ],
        'parts' => $parts,
        'total_parts_cost' => $total_parts_cost,
        'total_labor_cost' => $total_labor_cost,
        'grand_total' => $grand_total
    ];
}

// Output JSON response
header('Content-Type: application/json');
echo json_encode($response);

$conn->close();
?>
