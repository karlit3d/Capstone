<?php
header('Content-Type: application/json');
$servername = "localhost";  // Update with your server details if needed
$username = "root";
$password = "";
$dbname = "agtechdb";

// Get the appointment ID from the query parameters
$appointmentId = isset($_GET['appointmentId']) ? $_GET['appointmentId'] : '';

if ($appointmentId) {
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
    }

    // Fetch appointment details including the contact number
    $stmt = $conn->prepare("SELECT first_name, last_name, contact_number FROM appointments WHERE id = ?");
    $stmt->bind_param("i", $appointmentId);
    $stmt->execute();
    $appointmentResult = $stmt->get_result();
    $appointmentDetails = $appointmentResult->fetch_assoc();
    $stmt->close();

    // Fetch all SMS logs excluding the contact number (now retrieved from the appointments table)
    $stmt = $conn->prepare("SELECT message, status, sent_at FROM sms_logs WHERE appointment_id = ?");
    $stmt->bind_param("i", $appointmentId);
    $stmt->execute();
    $result = $stmt->get_result();

    $smsLogs = [];
    while ($row = $result->fetch_assoc()) {
        $smsLogs[] = $row;
    }

    $stmt->close();
    $conn->close();

    echo json_encode([
        'appointmentDetails' => $appointmentDetails,
        'smsLogs' => $smsLogs
    ]);
} else {
    echo json_encode(['error' => 'Invalid parameters']);
}
?>
