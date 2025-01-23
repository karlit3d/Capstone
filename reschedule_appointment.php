<?php
// reschedule_appointment.php

// Assuming you're using a POST request with JSON data
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

// Check if the necessary data exists in the request
if (!isset($data['id'], $data['date'], $data['time'], $data['mechanic'])) {
    http_response_code(400);
    echo json_encode(['message' => 'Missing required fields.']);
    exit();
}

// Extract data from the request
$id = $data['id'];  // Changed from appointmentId to id
$newDate = $data['date'];
$newTime = $data['time'];
$newMechanic = $data['mechanic'];

// Database credentials
$servername = "localhost"; // Change this if your database is hosted elsewhere
$username = "root"; // replace with your MySQL username
$password = ""; // replace with your MySQL password
$dbname = "agtechdb"; // replace with your database name

// Connect to your MySQL database
$mysqli = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($mysqli->connect_error) {
    http_response_code(500);
    echo json_encode(['message' => 'Database connection failed.']);
    exit();
}

// Check if the appointment exists in the appointments table
$fetchQuery = "SELECT id, first_name, last_name, contact_number, appointment_date, appointment_time FROM appointments WHERE id = ?";
$fetchStmt = $mysqli->prepare($fetchQuery);
$fetchStmt->bind_param('i', $id); // Bind appointment ID
$fetchStmt->execute();
$fetchResult = $fetchStmt->get_result();
$appointmentDetails = $fetchResult->fetch_assoc();
$fetchStmt->close();

// Check if the appointment ID was found
if (!$appointmentDetails) {
    http_response_code(404);
    echo json_encode(['message' => 'Appointment ID not found.']);
    exit();
}

// Extract appointment details for the SMS message
$first_name = $appointmentDetails['first_name'];
$last_name = $appointmentDetails['last_name'];
$contact_number = $appointmentDetails['contact_number'];
$oldDate = $appointmentDetails['appointment_date'];
$oldTime = $appointmentDetails['appointment_time'];

// Update the appointment details in the appointments table
$updateQuery = "UPDATE appointments SET appointment_date = ?, appointment_time = ?, mechanic = ? WHERE id = ?";
$updateStmt = $mysqli->prepare($updateQuery);
$updateStmt->bind_param('sssi', $newDate, $newTime, $newMechanic, $id);  // Bind the new values

if (!$updateStmt->execute()) {
    http_response_code(500);
    echo json_encode(['message' => 'Failed to update appointment.']);
    exit();
}
$updateStmt->close();

// Update the status in the admin_appointment table
$updateStatusQuery = "UPDATE admin_appointments SET status = 'upcoming' WHERE appointment_id = ?";
$updateStatusStmt = $mysqli->prepare($updateStatusQuery);
$updateStatusStmt->bind_param('i', $id);  // Use the appointment_id reference

if ($updateStatusStmt->execute()) {
    // Construct the SMS message
    $message = "Hi $first_name $last_name! Please mind that your booking has been rescheduled from $oldDate at $oldTime to $newDate at $newTime. Thank you for your understanding.";

    // Send SMS using Semaphore API
    $api_key = '0901b5f50bbad1d3c4bd751080c3848d'; // Replace with your Semaphore API key
    $sender_name = 'SEMAPHORE'; // Optional, if you have a registered sender name
    $semaphore_api_url = "https://api.semaphore.co/api/v4/messages";
    $sms_data = [
        'apikey' => $api_key,
        'number' => $contact_number,
        'message' => $message,
        'sendername' => $sender_name
    ];

    // Send the SMS using cURL
    $ch = curl_init($semaphore_api_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($sms_data));
    $response = curl_exec($ch);

    if ($response === false) {
        $error = "Error sending SMS: " . curl_error($ch);
        logCustomError($error);
        echo json_encode(['message' => 'Appointment and status updated successfully, but SMS failed to send.']);
    } else {
        // Decode response to check for success or failure
        $response_data = json_decode($response, true);
        $status = (isset($response_data['status']) && $response_data['status'] == 'success') ? 'sent' : 'failed';

        // Log the SMS in the `sms_logs` table with the `type` column set to 'rescheduled'
        $sql_log_sms = "INSERT INTO sms_logs (appointment_id, contact_number, message, status, type) VALUES (?, ?, ?, ?, ?)";
        $type = "rescheduled";

        $stmt_log_sms = $mysqli->prepare($sql_log_sms);
        $stmt_log_sms->bind_param("issss", $id, $contact_number, $message, $status, $type);

        if (!$stmt_log_sms->execute()) {
            logCustomError("Error logging SMS: " . $stmt_log_sms->error);
            echo json_encode(['message' => 'Appointment and status updated, but failed to log SMS.']);
        } else {
            echo json_encode(['message' => 'Appointment and status updated successfully, SMS sent and logged.']);
        }
    }

    curl_close($ch);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Failed to update status.']);
}

// Close connections
$updateStatusStmt->close();
$mysqli->close();
?>
