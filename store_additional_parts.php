<?php
// store_additional_parts.php

// Get the POST data
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode(['success' => false, 'message' => 'No data received']);
    exit();
}

$appointment_id = $data['appointment_id'] ?? null;
$job_order_id = $data['job_order_id'] ?? null;
$parts = $data['parts'] ?? [];

if (!$appointment_id || !$job_order_id || empty($parts)) {
    echo json_encode(['success' => false, 'message' => 'Invalid input data']);
    exit();
}

// Database connection (replace with your actual connection details)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "agtechdb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]);
    exit();
}

// Loop through each part and insert it into the job_order_parts table
foreach ($parts as $part) {
    $part_name = $part['part_name'] ?? null;
    $part_quantity = $part['part_quantity'] ?? 0;
    $days_to_deliver = $part['days_to_deliver'] ?? 0;
    $progress = $part['progress'] ?? 'In Progress';

    if ($part_name && $part_quantity > 0) {
        $stmt = $conn->prepare("INSERT INTO job_order_parts (appointment_id, job_order_id, part_name, part_quantity, days_to_deliver, progress) VALUES (?, ?, ?, ?, ?, ?)");
        if ($stmt) {
            $stmt->bind_param("iissis", $appointment_id, $job_order_id, $part_name, $part_quantity, $days_to_deliver, $progress);

            if (!$stmt->execute()) {
                echo json_encode(['success' => false, 'message' => 'Failed to save part: ' . $stmt->error]);
                $stmt->close();
                $conn->close();
                exit();
            }
            $stmt->close();
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to prepare statement: ' . $conn->error]);
            $conn->close();
            exit();
        }
    }
}

$conn->close();

echo json_encode(['success' => true]);
?>
