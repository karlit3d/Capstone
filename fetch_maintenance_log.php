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

// Get plate number from the query string
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
    'jobs' => []
];

// Fetch the latest car details for the given plate number
$carQuery = $conn->prepare("
    SELECT car_brand, car_model, car_year 
    FROM appointments 
    WHERE plate_number = ? 
    ORDER BY appointment_date DESC LIMIT 1
");
$carQuery->bind_param("s", $plate_number);
$carQuery->execute();
$carResult = $carQuery->get_result();

if ($carRow = $carResult->fetch_assoc()) {
    $response['car_brand'] = $carRow['car_brand'];
    $response['car_model'] = $carRow['car_model'];
    $response['car_year'] = $carRow['car_year'];
} else {
    echo json_encode(['error' => 'No car details found for the given plate number']);
    exit;
}

// Fetch all job orders associated with the plate number
$jobOrdersQuery = $conn->prepare("
    SELECT id AS job_order_id, service AS task, mechanic AS performed_by, appointment_date AS date_performed 
    FROM job_orders 
    WHERE plate_number = ?
");
$jobOrdersQuery->bind_param("s", $plate_number);
$jobOrdersQuery->execute();
$jobOrdersResult = $jobOrdersQuery->get_result();

while ($jobRow = $jobOrdersResult->fetch_assoc()) {
    $job_order_id = $jobRow['job_order_id'];

    // Fetch parts and calculate material and labor costs
    $partsQuery = $conn->prepare("
        SELECT 
            job_order_parts.part_name, 
            job_order_parts.part_quantity, 
            inventory.retail_price, 
            inventory.labor_cost 
        FROM job_order_parts 
        INNER JOIN inventory ON job_order_parts.part_name = inventory.name 
        WHERE job_order_parts.job_order_id = ?
    ");
    $partsQuery->bind_param("i", $job_order_id);
    $partsQuery->execute();
    $partsResult = $partsQuery->get_result();

    $parts = [];
    $total_material = 0;
    $total_labor = 0;

    while ($partRow = $partsResult->fetch_assoc()) {
        $material_cost = $partRow['retail_price'] * $partRow['part_quantity'];
        $total_material += $material_cost;

        // Only add labor cost once per part, regardless of quantity
        $total_labor += $partRow['labor_cost'];

        $parts[] = [
            'part_name' => $partRow['part_name'],
            'quantity' => $partRow['part_quantity'],
            'retail_price' => $partRow['retail_price'],
            'labor_cost' => $partRow['labor_cost'],
            'material_cost' => $material_cost
        ];
    }

    $jobRow['parts'] = $parts;
    $jobRow['total_material'] = $total_material;
    $jobRow['total_labor'] = $total_labor;
    $jobRow['total_cost'] = $total_material + $total_labor;

    $response['jobs'][] = $jobRow;
}

// Output the JSON response
header('Content-Type: application/json');
echo json_encode($response);

?>
