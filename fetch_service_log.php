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

// Get plate_number from the query string
$plate_number = $_GET['plate_number'] ?? '';

if (!$plate_number) {
    echo json_encode(['error' => 'Plate number is required']);
    exit;
}

// Initialize the response
$response = [
    'plate_number' => $plate_number,
    'car_brand' => '',
    'car_model' => '',
    'car_year' => '',
    'generated_date' => date('Y-m-d'),
    'job_orders' => []
];

// Fetch car details for the given plate number
$carQuery = $conn->prepare("
    SELECT DISTINCT car_brand, car_model, year_model 
    FROM job_orders 
    WHERE plate_number = ? 
    LIMIT 1
");
$carQuery->bind_param("s", $plate_number);
$carQuery->execute();
$carResult = $carQuery->get_result();

if ($carRow = $carResult->fetch_assoc()) {
    $response['car_brand'] = $carRow['car_brand'];
    $response['car_model'] = $carRow['car_model'];
    $response['car_year'] = $carRow['year_model'];
} else {
    echo json_encode(['error' => 'No vehicle details found for the given plate number']);
    exit;
}

// Fetch all job orders for the given plate number
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
        job_orders.year_model
    FROM job_orders
    WHERE plate_number = ?
");
$jobOrdersQuery->bind_param("s", $plate_number);
$jobOrdersQuery->execute();
$jobOrdersResult = $jobOrdersQuery->get_result();

while ($jobOrderRow = $jobOrdersResult->fetch_assoc()) {
    $job_order_id = $jobOrderRow['job_order_id'];

    // Fetch parts and technicians for this job order
    $partsQuery = $conn->prepare("
        SELECT 
            job_order_parts.part_name,
            job_order_parts.part_quantity,
            job_order_parts.completed_by,
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
    $technicians = [];
    $total_parts_cost = 0;
    $total_labor_cost = 0;

    while ($partRow = $partsResult->fetch_assoc()) {
        $total_parts_cost += $partRow['total_price'];
        $total_labor_cost += $partRow['labor_cost'];

        // Collect unique technicians excluding the mechanic
        if (!empty($partRow['completed_by']) && $partRow['completed_by'] !== $jobOrderRow['mechanic']) {
            if (!in_array($partRow['completed_by'], $technicians)) {
                $technicians[] = $partRow['completed_by'];
            }
        }

        $parts[] = [
            'part_name' => $partRow['part_name'],
            'part_quantity' => $partRow['part_quantity'],
            'completed_by' => $partRow['completed_by'] ?? 'N/A',
            'retail_price' => $partRow['retail_price'],
            'labor_cost' => $partRow['labor_cost'],
            'total_price' => $partRow['total_price']
        ];
    }

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
            'technicians' => implode(", ", $technicians), // Technicians as comma-separated values
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
