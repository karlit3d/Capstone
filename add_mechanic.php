<?php
// Database connection
$conn = new mysqli("localhost", "root", "", "agtechdb");

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]);
    exit;
}

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);
$mechanicName = $data['name'];
$days = $data['days'];

// Insert mechanic into `mechanics` table
$insertMechanic = $conn->prepare("INSERT INTO mechanics (name) VALUES (?)");
$insertMechanic->bind_param("s", $mechanicName);

if ($insertMechanic->execute()) {
    $mechanicId = $insertMechanic->insert_id; // Get the inserted mechanic's ID
    $insertMechanic->close();

    // Prepare to insert days into `mechanic_schedule`
    $insertSchedule = $conn->prepare("INSERT INTO mechanic_schedule (mechanic_id, day_of_week) VALUES (?, ?)");
    foreach ($days as $day) {
        $insertSchedule->bind_param("is", $mechanicId, $day);
        $insertSchedule->execute();
    }
    $insertSchedule->close();

    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to add mechanic: " . $insertMechanic->error]);
}

$conn->close();
?>
