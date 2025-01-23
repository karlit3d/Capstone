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
// Get the appointment ID from the request
$appointmentId = $_GET['appointmentId'];

// Validate that appointmentId is provided
if (empty($appointmentId)) {
    echo json_encode(['success' => false, 'error' => 'Appointment ID is required']);
    exit;
}

// Prepare the SQL query to fetch the token from the job_orders table
$query = "SELECT token FROM job_orders WHERE appointment_id = ?";
$stmt = $conn->prepare($query); 
$stmt->bind_param("i", $appointmentId);
$stmt->execute();
$result = $stmt->get_result();

// Check if the token is found
if ($result && $row = $result->fetch_assoc()) {
    echo json_encode(['success' => true, 'token' => $row['token']]);
} else {
    echo json_encode(['success' => false, 'error' => 'Token not found for this appointment']);
}

// Close the database connection
$stmt->close();
$conn->close();
?>
