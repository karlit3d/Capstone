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

$appointmentId = $_GET['appointment_id'] ?? '';

$query = "SELECT token FROM appointments WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $appointmentId);
$stmt->execute();
$stmt->bind_result($token);
$stmt->fetch();
$stmt->close();

echo json_encode(['success' => $token ? true : false, 'token' => $token]);
