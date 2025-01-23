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
$jobOrderId = $_GET['job_order_id'] ?? '';

$query = "SELECT appointment_id FROM job_orders WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $jobOrderId);
$stmt->execute();
$stmt->bind_result($appointmentId);
$stmt->fetch();
$stmt->close();

echo json_encode(['success' => $appointmentId ? true : false, 'appointment_id' => $appointmentId]);
