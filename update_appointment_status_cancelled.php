<?php
// update_appointment_status_cancelled.php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "agtechdb";

// Get data from POST request
$appointmentId = $_POST['appointment_id'];
$status = $_POST['status'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Update status in admin_appointment table
$sql = "UPDATE admin_appointments SET status = ? WHERE appointment_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $status, $appointmentId);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
