<?php
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

// Check if appointment_id is provided
if (!isset($_GET['appointment_id'])) {
    echo json_encode(["error" => "Missing appointment_id"]);
    exit;
}

$appointment_id = $_GET['appointment_id'];

// Prepare the SQL statement to fetch appointment details
$stmt = $conn->prepare("SELECT first_name, last_name, services, mechanic, appointment_date FROM appointments WHERE id = ?");
$stmt->bind_param("i", $appointment_id);
$stmt->execute();
$result = $stmt->get_result();

// Check if the appointment exists
if ($result->num_rows === 0) {
    echo json_encode(["error" => "Appointment not found for the given ID"]);
    exit;
}

// Fetch and encode appointment data as JSON
$appointment = $result->fetch_assoc();
echo json_encode($appointment);
