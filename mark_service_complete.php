<?php
header('Content-Type: application/json'); // Ensure the response is JSON

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "agtechdb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'error' => 'Database connection failed']));
}

$appointmentId = $_POST['appointment_id'];
$status = $_POST['status'];

// Log for debugging
file_put_contents('php://stderr', "Updating appointment_id: $appointmentId to status: $status\n", FILE_APPEND);

// Update the `admin_appointments` table
$sql = "UPDATE admin_appointments SET status = '$status' WHERE appointment_id = '$appointmentId'";

if ($conn->query($sql) === TRUE) {
    if ($conn->affected_rows > 0) {
        // Update the `job_orders` table to set `progress` to "Complete" and set `actual_completion_date`
        $updateJobOrders = "UPDATE job_orders SET progress = 'Complete', actual_completion_date = NOW() WHERE appointment_id = ?";
        $stmtUpdateJobOrders = $conn->prepare($updateJobOrders);
        $stmtUpdateJobOrders->bind_param('i', $appointmentId);
        
        if ($stmtUpdateJobOrders->execute() && $stmtUpdateJobOrders->affected_rows > 0) {
            // Fetch the contact_number and other details from the appointments table
            $fetchQuery = $conn->prepare("SELECT first_name, last_name, car_brand, car_model, plate_number, contact_number FROM appointments WHERE id = ?");
            $fetchQuery->bind_param('i', $appointmentId);
            $fetchQuery->execute();
            $result = $fetchQuery->get_result();

            if ($result->num_rows > 0) {
                $appointmentDetails = $result->fetch_assoc();
                $firstName = $appointmentDetails['first_name']; 
                $lastName = $appointmentDetails['last_name'];
                $carBrand = $appointmentDetails['car_brand'];
                $carModel = $appointmentDetails['car_model'];
                $plateNumber = strtoupper($appointmentDetails['plate_number']); // Convert plate number to uppercase
                $contactNumber = $appointmentDetails['contact_number'];

                // Construct the SMS message
                $message = "Good Day $firstName $lastName! We are glad to tell you that the services you avail for your car $carBrand $carModel with plate number $plateNumber is done. Please come to our shop immediately.";

                // Send SMS using Semaphore API
                $api_key = '0901b5f50bbad1d3c4bd751080c3848d';
                $sender_name = 'SEMAPHORE';
                $semaphore_api_url = "https://api.semaphore.co/api/v4/messages";
                $sms_data = [
                    'apikey' => $api_key,
                    'number' => $contactNumber,
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
                    error_log($error);
                    echo json_encode(['success' => true, 'sms' => 'SMS failed to send.']);
                } else {
                    $response_data = json_decode($response, true);
                    $smsStatus = (isset($response_data['status']) && $response_data['status'] == 'success') ? 'sent' : 'failed';

                    // Log the SMS in the `sms_logs` table with the `type` column set to 'completed'
                    $sql_log_sms = "INSERT INTO sms_logs (appointment_id, contact_number, message, status, type) VALUES (?, ?, ?, ?, ?)";
                    $type = "completed";

                    $stmt_log_sms = $conn->prepare($sql_log_sms);
                    $stmt_log_sms->bind_param("issss", $appointmentId, $contactNumber, $message, $smsStatus, $type);

                    if (!$stmt_log_sms->execute()) {
                        error_log("Error logging SMS: " . $stmt_log_sms->error);
                        echo json_encode(['success' => true, 'sms' => 'SMS sent but failed to log.']);
                    } else {
                        echo json_encode(['success' => true, 'sms' => 'SMS sent and logged successfully.']);
                    }
                }

                curl_close($ch);
            } else {
                echo json_encode(['success' => false, 'error' => 'No appointment details found.']);
            }

            $fetchQuery->close();
        } else {
            echo json_encode(['success' => false, 'error' => 'Failed to update job order progress.']);
        }
        
        $stmtUpdateJobOrders->close();
    } else {
        echo json_encode(['success' => false, 'error' => 'No rows affected. Check if appointment_id exists.']);
    }
} else {
    echo json_encode(['success' => false, 'error' => $conn->error]);
}

$conn->close();
?>
