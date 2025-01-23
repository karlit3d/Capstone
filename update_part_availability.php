<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "agtechdb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Debugging: Display all errors (for development purposes, remove this in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $appointmentId = $_POST['appointment_id'];
    $partName = $_POST['part_name'];
    $availability = $_POST['availability'];

    // First, check the stock of the part in the inventory
    $checkStockSql = "SELECT stock FROM inventory WHERE name = ?";
    $checkStockStmt = $conn->prepare($checkStockSql);
    $checkStockStmt->bind_param('s', $partName);
    $checkStockStmt->execute();
    $checkStockResult = $checkStockStmt->get_result();

    if ($checkStockResult->num_rows > 0) {
        $row = $checkStockResult->fetch_assoc();
        $currentStock = $row['stock'];

        // Debugging: Log the current stock to confirm value
        error_log("Current stock for $partName: $currentStock");

        // Only update availability if stock is greater than 0
        if ($currentStock > 0) {
            $sql = "UPDATE job_order_parts SET availability = ?, progress = 'In Progress' WHERE appointment_id = ? AND part_name = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('sis', $availability, $appointmentId, $partName);

            if ($stmt->execute()) {
                error_log("Successfully updated availability for $partName to $availability for appointment $appointmentId.");
                echo json_encode(['success' => true]);
            } else {
                error_log("Database error on update: " . $stmt->error);
                echo json_encode(['success' => false, 'error' => $stmt->error]);
            }

            $stmt->close();
        } else {
            error_log("No stock available for $partName, unable to update.");
            echo json_encode(['success' => false, 'error' => 'Stock unavailable']);
        }
    } else {
        error_log("Part $partName not found in inventory.");
        echo json_encode(['success' => false, 'error' => 'Part not found in inventory']);
    }

    $checkStockStmt->close();
}

$conn->close();
?>
