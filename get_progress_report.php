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

$ticketId = $_GET['ticketId'];

// Query to fetch the job order details along with first_name, last_name, token, and creation_time for the given appointment_id
$query = "SELECT id AS job_order_id, appointment_id, service, mechanic, appointment_date, estimate_completion, progress, progress_report_enabled, first_name, last_name, token, creation_time 
          FROM job_orders WHERE appointment_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param('i', $ticketId);
$stmt->execute();
$result = $stmt->get_result();

// Fetch the job order data
if ($result->num_rows > 0) {
    $jobOrder = $result->fetch_assoc();

    // Now, fetch the parts used for this job order from the `job_order_parts` table
    $partsQuery = "SELECT part_name, part_quantity, availability, progress, days_to_deliver FROM job_order_parts WHERE job_order_id = ?";
    $partsStmt = $conn->prepare($partsQuery);
    $partsStmt->bind_param('i', $jobOrder['job_order_id']);
    $partsStmt->execute();
    $partsResult = $partsStmt->get_result();

    // Fetch all the parts used for this job order
    $partsUsed = [];
    while ($part = $partsResult->fetch_assoc()) {
        $partsUsed[] = $part;
    }

    // Log the value of progress_report_enabled and creation_time for debugging purposes
    error_log("progress_report_enabled for appointment_id {$ticketId}: " . $jobOrder['progress_report_enabled']);
    error_log("creation_time for appointment_id {$ticketId}: " . $jobOrder['creation_time']);

    // Return the job order details along with the parts used, token, creation_time, and progress_report_enabled flag as JSON
    echo json_encode([
        'job_order_id' => $jobOrder['job_order_id'],  // Now clearly labeled as job_order_id
        'appointment_id' => $jobOrder['appointment_id'],
        'service' => $jobOrder['service'],
        'mechanic' => $jobOrder['mechanic'],
        'appointment_date' => $jobOrder['appointment_date'],
        'estimate_completion' => $jobOrder['estimate_completion'],
        'progress' => $jobOrder['progress'],
        'first_name' => $jobOrder['first_name'],  // Include first_name
        'last_name' => $jobOrder['last_name'],    // Include last_name
        'parts_used' => $partsUsed,
        'token' => $jobOrder['token'],  // Include token in the response
        'progress_report_enabled' => $jobOrder['progress_report_enabled'],  // Include this field for frontend use
        'creation_time' => $jobOrder['creation_time']  // Include creation_time in the response
    ]);

    $partsStmt->close();
} else {
    echo json_encode(['error' => 'Job order not found']);
}

$stmt->close();
$conn->close();
?>
