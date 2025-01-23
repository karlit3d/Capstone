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
$appointmentId = $_GET['appointmentId'];

// Prepare SQL to fetch job order from the `job_orders` table
$stmt = $conn->prepare("SELECT * FROM job_orders WHERE appointment_id = ?");
$stmt->bind_param('i', $appointmentId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $jobOrder = $result->fetch_assoc();

    // Fetch the parts used for this job order
    $partsStmt = $conn->prepare("SELECT * FROM job_order_parts WHERE job_order_id = ?");
    $partsStmt->bind_param('i', $jobOrder['id']);
    $partsStmt->execute();
    $partsResult = $partsStmt->get_result();

    $jobOrder['partsUsed'] = [];
    while ($part = $partsResult->fetch_assoc()) {
        $jobOrder['partsUsed'][] = $part;
    }

    // Return the job order data with parts
    echo json_encode($jobOrder);
} else {
    // Return not found error
    echo json_encode(['error' => 'Job order not found']);
}

$conn->close();
?>