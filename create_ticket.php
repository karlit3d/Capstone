<?php
// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "agtechdb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Extract data from the input
$firstName = $data['firstName'];
$lastName = $data['lastName'];
$appointmentDate = $data['appointmentDate'];
$appointmentTime = $data['appointmentTime'];
$carBrand = $data['carBrand'];
$carModel = $data['carModel'];
$carYear = $data['carYear'];
$plateNumber = $data['plateNumber'];
$contactNumber = $data['contactNumber'];
$services = $data['services'];
$mechanic = $data['mechanic'];

// Generate a unique token
$token = bin2hex(random_bytes(16)); // Generates a 32-character hexadecimal token

// Insert data into `appointments` table, including the token
$sql = "INSERT INTO appointments (first_name, last_name, appointment_date, appointment_time, car_brand, car_model, car_year, plate_number, contact_number, services, mechanic, token)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssssssssss", $firstName, $lastName, $appointmentDate, $appointmentTime, $carBrand, $carModel, $carYear, $plateNumber, $contactNumber, $services, $mechanic, $token);

if ($stmt->execute()) {
    $appointmentId = $conn->insert_id; // Get the last inserted ID
    
    // Insert into `admin_appointments` table
    $adminSql = "INSERT INTO admin_appointments (appointment_id, status)
                 VALUES (?, 'past')"; // No token needed here

    $adminStmt = $conn->prepare($adminSql);
    $adminStmt->bind_param("i", $appointmentId);

    if ($adminStmt->execute()) {
        echo json_encode(["success" => true, "token" => $token]); // Optionally return the token
    } else {
        echo json_encode(["success" => false, "error" => $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$stmt->close();
$conn->close();
?>
