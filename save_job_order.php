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

$data = json_decode(file_get_contents('php://input'), true);

// Log the received data for debugging
error_log("Data received: " . print_r($data, true));

// Check if 'service' and other critical fields are set and not null
$requiredFields = ['appointmentId', 'firstName', 'lastName', 'carBrand', 'carModel', 'yearModel', 'plateNumber', 'mechanic', 'progress', 'estimateCompletion', 'remarks', 'appointmentDate', 'service'];
foreach ($requiredFields as $field) {
    if (empty($data[$field])) {
        error_log("Missing required field: $field");
        echo json_encode(['success' => false, 'error' => "Field '$field' cannot be null or empty."]);
        exit; // Stop further execution
    }
}

// Generate a unique token for the progress report URL
$token = bin2hex(random_bytes(16)); // Creates a 32-character hexadecimal token

// Set the creation_time for the job order
$creationTime = date('Y-m-d H:i:s'); // Current timestamp

// Fetch the contact_number from the appointments table using appointmentId
$contactQuery = $conn->prepare("SELECT contact_number FROM appointments WHERE id = ?");
$contactQuery->bind_param('i', $data['appointmentId']);
$contactQuery->execute();
$contactResult = $contactQuery->get_result();
$contactDetails = $contactResult->fetch_assoc();
$contactQuery->close();

if (!$contactDetails) {
    echo json_encode(['success' => false, 'error' => 'Contact number not found for the given appointment ID.']);
    exit;
}

$contact_number = $contactDetails['contact_number'];

// Prepare SQL to insert job order into the `job_orders` table, including the new token field and plate_number
$stmt = $conn->prepare("INSERT INTO job_orders (appointment_id, first_name, last_name, car_brand, car_model, year_model, plate_number, mechanic, progress, estimate_completion, remarks, appointment_date, service, token, creation_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param(
    'issssisssssssss',
    $data['appointmentId'],
    $data['firstName'],
    $data['lastName'],
    $data['carBrand'],
    $data['carModel'],
    $data['yearModel'],
    $data['plateNumber'],
    $data['mechanic'],
    $data['progress'],
    $data['estimateCompletion'],
    $data['remarks'],
    $data['appointmentDate'],
    $data['service'],
    $token,
    $creationTime
);

// Execute the statement
if ($stmt->execute()) {
    // Get the last inserted job order ID
    $jobOrderId = $stmt->insert_id;

    // Insert the parts used into a separate table, including plate_number
    foreach ($data['partsUsed'] as $part) {
        $partStmt = $conn->prepare("INSERT INTO job_order_parts (job_order_id, appointment_id, first_name, last_name, part_name, part_quantity, availability, progress, days_to_deliver, plate_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        
        $partStmt->bind_param(
            'iisssissis',
            $jobOrderId,
            $data['appointmentId'],           // Reuse appointment ID from main data
            $data['firstName'],               // Reuse first name from main data
            $data['lastName'],                // Reuse last name from main data
            $part['partName'],
            $part['partQuantity'],
            $part['availability'],
            $part['partProgress'],
            $part['daysToDeliver'],
            $data['plateNumber']              // Include plate_number here
        );

        if (!$partStmt->execute()) {
            error_log("Error inserting part into job_order_parts: " . $partStmt->error);
        }
    }

    // Check if a record already exists in appointment_progress_status
    $checkProgressStatus = $conn->prepare("SELECT * FROM appointment_progress_status WHERE appointment_id = ?");
    $checkProgressStatus->bind_param('i', $data['appointmentId']);
    $checkProgressStatus->execute();
    $checkResult = $checkProgressStatus->get_result();

    if ($checkResult->num_rows > 0) {
        // If a record exists, update progress_report_enabled to TRUE
        $updateProgressReport = $conn->prepare("UPDATE appointment_progress_status SET progress_report_enabled = TRUE WHERE appointment_id = ?");
        $updateProgressReport->bind_param('i', $data['appointmentId']);
        
        if (!$updateProgressReport->execute()) {
            error_log("Error updating appointment_progress_status: " . $updateProgressReport->error);
        }
        $updateProgressReport->close();
    } else {
        // If no record exists, insert a new record with progress_report_enabled = TRUE
        $insertProgressReport = $conn->prepare("INSERT INTO appointment_progress_status (appointment_id, progress_report_enabled) VALUES (?, TRUE)");
        $insertProgressReport->bind_param('i', $data['appointmentId']);
        
        if (!$insertProgressReport->execute()) {
            error_log("Error inserting into appointment_progress_status: " . $insertProgressReport->error);
        }
        $insertProgressReport->close();
    }

    $checkProgressStatus->close();

    // Generate the progress report link using the token
    $progressLink = "http://www.agtechnicianservices.com/progress_report.php?token=" . $token;

    // Send SMS using Semaphore API
    $api_key = '0901b5f50bbad1d3c4bd751080c3848d'; // Replace with your Semaphore API key
    $sender_name = 'SEMAPHORE'; // Optional, if you have a registered sender name

    // Construct the SMS message
    $message = "Hi {$data['firstName']} {$data['lastName']}! We are glad to inform you that your car will now be undergoing service. For progress updates, please click this link: Progress Report Link: www.agtechnicianservices.com/$token";

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
        error_log($error);
        echo json_encode(['success' => true, 'progressLink' => $progressLink, 'sms' => 'SMS failed to send.']);
    } else {
        // Decode response to check for success or failure
        $response_data = json_decode($response, true);
        $status = (isset($response_data['status']) && $response_data['status'] == 'success') ? 'sent' : 'failed';

        // Log the SMS in the `sms_logs` table with the `type` column set to 'service'
        $sql_log_sms = "INSERT INTO sms_logs (appointment_id, contact_number, message, status, type) VALUES (?, ?, ?, ?, ?)";
        $type = "service";

        $stmt_log_sms = $conn->prepare($sql_log_sms);
        $stmt_log_sms->bind_param("issss", $data['appointmentId'], $contact_number, $message, $status, $type);

        if (!$stmt_log_sms->execute()) {
            error_log("Error logging SMS: " . $stmt_log_sms->error);
            echo json_encode(['success' => true, 'progressLink' => $progressLink, 'sms' => 'SMS sent but failed to log.']);
        } else {
            echo json_encode(['success' => true, 'progressLink' => $progressLink, 'sms' => 'SMS sent and logged successfully.']);
        }
    }

    curl_close($ch);
} else {
    // Log the error if job_orders insertion fails
    error_log("Error inserting job order: " . $stmt->error);
    echo json_encode(['success' => false, 'error' => $stmt->error]);
}

// Close the database connection
$conn->close();
?>
