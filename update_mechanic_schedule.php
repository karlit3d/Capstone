<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database connection
$conn = new mysqli("localhost", "root", "", "agtechdb");

// Set autocommit to true to ensure each statement commits immediately
$conn->autocommit(TRUE);

// Check connection
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]);
    exit;
}

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['schedule']) || !is_array($data['schedule'])) {
    echo json_encode(["status" => "error", "message" => "Invalid schedule data"]);
    exit;
}

$schedule = $data['schedule'];
$success = true;

// Map day abbreviations to full day names
$dayMap = [
    'mon' => 'Monday',
    'tue' => 'Tuesday',
    'wed' => 'Wednesday',
    'thu' => 'Thursday',
    'fri' => 'Friday',
    'sat' => 'Saturday',
    'sun' => 'Sunday'
];

foreach ($schedule as $dayData) {
    if (empty($dayData['mechanic_id'])) {
        $success = false;
        echo json_encode(["status" => "error", "message" => "Mechanic ID is missing"]);
        break;
    }

    $mechanic_id = $dayData['mechanic_id'];

    // Delete all existing schedule entries for this mechanic
    $deleteStmt = $conn->prepare("DELETE FROM mechanic_schedule WHERE mechanic_id = ?");
    $deleteStmt->bind_param("i", $mechanic_id);
    if (!$deleteStmt->execute()) {
        $success = false;
        echo json_encode(["status" => "error", "message" => "Failed to delete existing schedule: " . $deleteStmt->error]);
        break;
    }
    $deleteStmt->close();

    // Insert new entries based on the selected days
    foreach ($dayMap as $shortDay => $fullDay) {
        if ($dayData[$shortDay] === 1) { // Only insert for available days
            $insertStmt = $conn->prepare("INSERT INTO mechanic_schedule (mechanic_id, day_of_week) VALUES (?, ?)");
            $insertStmt->bind_param("is", $mechanic_id, $fullDay);
            
            if (!$insertStmt->execute()) {
                $success = false;
                echo json_encode(["status" => "error", "message" => "Failed to insert schedule: " . $insertStmt->error]);
                break 2; // Exit both loops if insertion fails
            }
            $insertStmt->close();
        }
    }
}

if ($success) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to update schedule."]);
}

$conn->close();
?>
