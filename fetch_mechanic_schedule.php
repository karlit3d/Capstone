<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database connection
$conn = new mysqli("localhost", "root", "", "agtechdb");

// Check connection
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]);
    exit;
}

// SQL query to fetch mechanic information and their availability by day
$sql = "SELECT m.id AS mechanic_id, m.name AS mechanic_name, s.day_of_week
        FROM mechanics m
        LEFT JOIN mechanic_schedule s ON m.id = s.mechanic_id";
$result = $conn->query($sql);

$scheduleData = [];

// Process each row in the result set
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $mechanic_id = $row['mechanic_id'];
        $mechanic_name = $row['mechanic_name'];
        $day_of_week = strtolower($row['day_of_week']); // Convert day to lowercase for easy matching

        // Initialize mechanic entry if not already present
        if (!isset($scheduleData[$mechanic_id])) {
            $scheduleData[$mechanic_id] = [
                'mechanic_id' => $mechanic_id,
                'mechanic_name' => $mechanic_name,
                'mon' => 0,
                'tue' => 0,
                'wed' => 0,
                'thu' => 0,
                'fri' => 0,
                'sat' => 0,
                'sun' => 0
            ];
        }

        // Update the availability based on the day of the week
        switch ($day_of_week) {
            case 'monday': $scheduleData[$mechanic_id]['mon'] = 1; break;
            case 'tuesday': $scheduleData[$mechanic_id]['tue'] = 1; break;
            case 'wednesday': $scheduleData[$mechanic_id]['wed'] = 1; break;
            case 'thursday': $scheduleData[$mechanic_id]['thu'] = 1; break;
            case 'friday': $scheduleData[$mechanic_id]['fri'] = 1; break;
            case 'saturday': $scheduleData[$mechanic_id]['sat'] = 1; break;
            case 'sunday': $scheduleData[$mechanic_id]['sun'] = 1; break;
        }
    }
}

// Convert associative array to indexed array
$scheduleArray = array_values($scheduleData);

// Set header to JSON
header('Content-Type: application/json');

// Output the JSON data
echo json_encode($scheduleArray, JSON_PRETTY_PRINT);

$conn->close();
?>
