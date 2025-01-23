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
        die(json_encode(['success' => false, 'error' => 'Connection failed: ' . $conn->connect_error]));
    }

    // Fetch the SMS log details using appointment_id
    $stmt = $conn->prepare("SELECT appointment_id, contact_number, message FROM sms_logs WHERE appointment_id = ? ORDER BY id DESC LIMIT 1");
    $stmt->bind_param("i", $appointmentId);
    $stmt->execute();
    $result = $stmt->get_result();
    $smsLog = $result->fetch_assoc();
    $stmt->close();

    if ($smsLog) {
        $contact_number = $smsLog['contact_number'];
        $message = $smsLog['message'];

        // Send SMS using Semaphore API
        $api_key = '0901b5f50bbad1d3c4bd751080c3848d'; // Replace with your Semaphore API key
        $sender_name = 'SEMAPHORE'; // Optional, if you have a registered sender name

        // Prepare the data for the Semaphore API
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
            echo json_encode(['success' => false, 'error' => $error]);
        } else {
            // Decode response to check for success or failure
            $response_data = json_decode($response, true);
            if (isset($response_data['status']) && $response_data['status'] == 'success') {
                $status = 'sent';
                echo json_encode(['success' => true, 'message' => 'SMS resent successfully.']);
            } else {
                $status = 'failed';
                echo json_encode(['success' => false, 'error' => 'Failed to resend SMS.']);
            }

            // Log the SMS in the `sms_logs` table with the `type` column
            $sql_log_sms = "INSERT INTO sms_logs (appointment_id, contact_number, message, status, type) VALUES (?, ?, ?, ?, ?)";
            $type = "booking"; // Set the type to "resend"

            $stmt_log_sms = $conn->prepare($sql_log_sms);
            $stmt_log_sms->bind_param("issss", $appointmentId, $contact_number, $message, $status, $type);

            if (!$stmt_log_sms->execute()) {
                echo json_encode(['success' => false, 'error' => 'Error logging SMS: ' . $stmt_log_sms->error]);
            }

            $stmt_log_sms->close();
        }

        curl_close($ch);
    } else {
        echo json_encode(['success' => false, 'error' => 'SMS log not found for the provided appointment ID.']);
    }

    $conn->close();
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid appointment ID.']);
}
?>
