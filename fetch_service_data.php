<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "agtechdb";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Get the plate_number from the query parameters
$plate_number = isset($_GET['plate_number']) ? $_GET['plate_number'] : '';

$response = [];

if (!empty($plate_number)) {
    // Fetch latest basic info using plate_number and appointment_date
    $stmt = $conn->prepare("
        SELECT first_name, last_name, car_model, car_brand, plate_number, car_year, contact_number 
        FROM appointments 
        WHERE plate_number = ? 
        ORDER BY appointment_date DESC 
        LIMIT 1
    ");
    $stmt->bind_param("s", $plate_number);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result && $result->num_rows > 0) {
        $basic_info = $result->fetch_assoc();
        // Capitalize the required fields
        $basic_info['first_name'] = strtoupper($basic_info['first_name']);
        $basic_info['last_name'] = strtoupper($basic_info['last_name']);
        $basic_info['car_model'] = strtoupper($basic_info['car_model']);
        $basic_info['car_brand'] = strtoupper($basic_info['car_brand']);
        $basic_info['plate_number'] = strtoupper($basic_info['plate_number']);
        $basic_info['car_year'] = strtoupper($basic_info['car_year']);
        $response['basic_info'] = $basic_info;
    }

    // Fetch latest appointment schedule based on appointment_date
    $stmt = $conn->prepare("
        SELECT appointment_date, service, mechanic 
        FROM job_orders 
        WHERE plate_number = ? 
        ORDER BY appointment_date DESC
    ");
    $stmt->bind_param("s", $plate_number);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result && $result->num_rows > 0) {
        $response['appointments'] = [];
        while ($row = $result->fetch_assoc()) {
            $response['appointments'][] = $row;
        }
    }

    // Fetch latest repair history based on appointment_date and time
    $stmt = $conn->prepare("
        SELECT j.id, j.service, j.appointment_date, a.appointment_time, j.mechanic 
        FROM job_orders j
        INNER JOIN appointments a ON j.appointment_id = a.id
        WHERE j.plate_number = ? 
        ORDER BY j.appointment_date DESC, a.appointment_time DESC
    ");
    $stmt->bind_param("s", $plate_number);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result && $result->num_rows > 0) {
        $response['repair_history'] = [];
        while ($row = $result->fetch_assoc()) {
            $response['repair_history'][] = $row;
        }
    }
}

// Send JSON response
echo json_encode($response);

$conn->close();
?>
