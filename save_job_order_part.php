<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Content-Type: application/json");

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "agtechdb";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

// Get the JSON data from the request
$data = json_decode(file_get_contents("php://input"), true);

// Temporary log file for debugging (optional, use for testing)
file_put_contents("log.txt", json_encode($data) . "\n", FILE_APPEND);

if (isset($data["appointment_id"], $data["job_order_id"], $data["part_name"], $data["part_quantity"], $data["days_to_deliver"], $data["availability"], $data["progress"], $data["estimate_completion_days"], $data["estimate_completion_hours"])) {
    $appointmentId = $data["appointment_id"];
    $jobOrderId = $data["job_order_id"];
    $partName = $data["part_name"];
    $partQuantity = $data["part_quantity"];
    $daysToDeliver = $data["days_to_deliver"]; 
    $availability = $data["availability"];
    $progress = $data["progress"];
    $estimateCompletionDays = $data["estimate_completion_days"];
    $estimateCompletionHours = $data["estimate_completion_hours"];

    // Fetch first_name, last_name, and plate_number based on job_order_id and appointment_id
    $nameQuery = $conn->prepare("SELECT first_name, last_name, plate_number FROM job_orders WHERE id = ? AND appointment_id = ?");
    $nameQuery->bind_param("ii", $jobOrderId, $appointmentId);
    $nameQuery->execute();
    $nameResult = $nameQuery->get_result();

    if ($nameResult->num_rows > 0) {
        $nameRow = $nameResult->fetch_assoc();
        $firstName = $nameRow['first_name'];
        $lastName = $nameRow['last_name'];
        $plateNumber = $nameRow['plate_number'];
    } else {
        echo json_encode(["success" => false, "message" => "No matching record found for the provided job_order_id and appointment_id."]);
        exit();
    }

    // Step 1: Insert the part into job_order_parts table
    $stmt = $conn->prepare("INSERT INTO job_order_parts (job_order_id, appointment_id, first_name, last_name, plate_number, part_name, part_quantity, days_to_deliver, availability, progress) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("iissssiiss", $jobOrderId, $appointmentId, $firstName, $lastName, $plateNumber, $partName, $partQuantity, $daysToDeliver, $availability, $progress);

    if (!$stmt->execute()) {
        echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
        exit();
    }
    $stmt->close();

    // Step 2: Calculate the additional estimate time based on the part
    $additionalDays = $estimateCompletionDays * $partQuantity;
    $additionalHours = $estimateCompletionHours * $partQuantity;

    // Convert hours to days if hours exceed 24
    if ($additionalHours >= 24) {
        $additionalDays += floor($additionalHours / 24);
        $additionalHours = $additionalHours % 24;
    }

    // Step 3: Fetch the current estimate_completion from job_orders
    $currentCompletionQuery = $conn->prepare("SELECT estimate_completion FROM job_orders WHERE id = ?");
    $currentCompletionQuery->bind_param("i", $jobOrderId);
    $currentCompletionQuery->execute();
    $currentCompletionResult = $currentCompletionQuery->get_result();

    if ($currentCompletionResult->num_rows > 0) {
        $currentCompletionRow = $currentCompletionResult->fetch_assoc();
        $currentCompletion = new DateTime($currentCompletionRow['estimate_completion']);
    } else {
        echo json_encode(["success" => false, "message" => "No matching job order found for the provided job_order_id."]);
        exit();
    }
    $currentCompletionQuery->close();

    // Step 4: Update the current estimate_completion with additional time
    $currentCompletion->add(new DateInterval("P{$additionalDays}D"));
    $currentCompletion->add(new DateInterval("PT{$additionalHours}H"));

    $updatedCompletion = $currentCompletion->format('Y-m-d H:i:s');

    // Step 5: Update the estimate_completion in job_orders table
    $updateCompletionQuery = $conn->prepare("UPDATE job_orders SET estimate_completion = ? WHERE id = ?");
    $updateCompletionQuery->bind_param("si", $updatedCompletion, $jobOrderId);

    if ($updateCompletionQuery->execute()) {
        echo json_encode(["success" => true, "updated_estimate_completion" => $updatedCompletion]);
    } else {
        echo json_encode(["success" => false, "message" => "Error updating estimate_completion: " . $updateCompletionQuery->error]);
    }
    $updateCompletionQuery->close();

} else {
    echo json_encode(["success" => false, "message" => "Invalid input"]);
}

$conn->close();
?>
