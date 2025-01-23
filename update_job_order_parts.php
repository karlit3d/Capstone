<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "agtechdb";

// Set JSON response header
header('Content-Type: application/json');

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    error_log("Database connection failed: " . $conn->connect_error);
    echo json_encode(['success' => false, 'error' => 'Database connection failed']);
    exit();
}

// Check if request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $appointmentId = $_POST['appointment_id'] ?? null;
    $partName = $_POST['part_name'] ?? null;

    // Validate input parameters
    if (empty($appointmentId) || empty($partName)) {
        error_log("Invalid parameters: appointment_id = $appointmentId, part_name = $partName");
        echo json_encode(['success' => false, 'error' => 'Invalid parameters']);
        exit();
    }

    try {
        // Update progress to 'complete' and set completion_time in job_order_parts table
        $completionTime = date('Y-m-d H:i:s'); // Generate current timestamp
        $updateSql = "UPDATE job_order_parts SET progress = 'complete', completion_time = ? WHERE appointment_id = ? AND part_name = ?";
        $stmt = $conn->prepare($updateSql);
        if (!$stmt) {
            throw new Exception("Prepare failed: " . $conn->error);
        }

        $stmt->bind_param("sis", $completionTime, $appointmentId, $partName);
        if (!$stmt->execute()) {
            throw new Exception("Execution failed: " . $stmt->error);
        }

        // Fetch part_quantity from job_order_parts
        $fetchSqlParts = "SELECT part_quantity FROM job_order_parts WHERE appointment_id = ? AND part_name = ?";
        $fetchStmtParts = $conn->prepare($fetchSqlParts);
        if (!$fetchStmtParts) {
            throw new Exception("Fetch prepare failed: " . $conn->error);
        }

        $fetchStmtParts->bind_param("is", $appointmentId, $partName);
        if (!$fetchStmtParts->execute()) {
            throw new Exception("Fetch execution failed: " . $fetchStmtParts->error);
        }

        $fetchStmtParts->bind_result($partQuantity);
        if (!$fetchStmtParts->fetch()) {
            throw new Exception("No part quantity found for appointment_id: $appointmentId, part_name: $partName");
        }
        $fetchStmtParts->close(); // Close ONLY ONCE here

        // Fetch estimate_completion_days and estimate_completion_hours from inventory
        $fetchSqlInventory = "SELECT estimate_completion_days, estimate_completion_hours FROM inventory WHERE name = ?";
        $fetchStmtInventory = $conn->prepare($fetchSqlInventory);
        if (!$fetchStmtInventory) {
            throw new Exception("Inventory fetch prepare failed: " . $conn->error);
        }

        $fetchStmtInventory->bind_param("s", $partName);
        if (!$fetchStmtInventory->execute()) {
            throw new Exception("Inventory fetch execution failed: " . $fetchStmtInventory->error);
        }

        $fetchStmtInventory->bind_result($estimateDays, $estimateHours);
        if (!$fetchStmtInventory->fetch()) {
            throw new Exception("No data found in inventory for part_name: $partName");
        }
        $fetchStmtInventory->close();

        // Return JSON response
        echo json_encode([
            'success' => true,
            'part_quantity' => $partQuantity,
            'estimate_completion_days' => $estimateDays,
            'estimate_completion_hours' => $estimateHours,
            'completion_time' => $completionTime // Include the completion_time in the response
        ]);
    } catch (Exception $e) {
        error_log($e->getMessage());
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
}

$conn->close();
