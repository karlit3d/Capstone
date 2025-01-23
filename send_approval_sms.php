<?php
header('Content-Type: application/json');
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "agtechdb";

// Get the appointment ID from the request
$appointmentId = isset($_POST['appointmentId']) ? $_POST['appointmentId'] : '';

if ($appointmentId) {
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
    }

    // Fetch appointment details
    $stmt = $conn->prepare("SELECT first_name, last_name, contact_number, appointment_date, appointment_time FROM appointments WHERE id = ?");
    $stmt->bind_param("i", $appointmentId);
    $stmt->execute();
    $result = $stmt->get_result();
    $appointmentDetails = $result->fetch_assoc();
    $stmt->close();

    if ($appointmentDetails) {
        $first_name = $appointmentDetails['first_name'];
        $last_name = $appointmentDetails['last_name'];
        $contact_number = $appointmentDetails['contact_number'];
        $appointment_date = $appointmentDetails['appointment_date'];
        $appointment_time = $appointmentDetails['appointment_time'];

        // Construct the SMS message
        $message = "Hi $first_name $last_name! We are glad to inform you that your appointment has been Approved! Please be at our shop at least 30 minutes before your booked date and time slot: $appointment_date at $appointment_time.";

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
            echo json_encode(['error' => $error]);
        } else {
            // Decode response to check for success or failure
            $response_data = json_decode($response, true);
            $status = (isset($response_data['status']) && $response_data['status'] == 'success') ? 'sent' : 'failed';

            // Log the SMS in the `sms_logs` table with the `type` column set to 'approved'
            $sql_log_sms = "INSERT INTO sms_logs (appointment_id, contact_number, message, status, type) VALUES (?, ?, ?, ?, ?)";
            $type = "approved";

            $stmt_log_sms = $conn->prepare($sql_log_sms);
            $stmt_log_sms->bind_param("issss", $appointmentId, $contact_number, $message, $status, $type);

            if (!$stmt_log_sms->execute()) {
                logCustomError("Error logging SMS: " . $stmt_log_sms->error);
                echo json_encode(['error' => "Error logging SMS: " . $stmt_log_sms->error]);
            } else {
                echo json_encode(['success' => "Approval SMS sent and logged successfully."]);
            }
        }

        curl_close($ch);
    } else {
        echo json_encode(['error' => 'Appointment not found.']);
    }

    $conn->close();
} else {
    echo json_encode(['error' => 'Invalid appointment ID.']);
}
?>
