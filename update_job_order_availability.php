<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "agtechdb";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get part name from request
$partName = $_POST['part_name'];

if (empty($partName)) {
    echo json_encode(['success' => false, 'message' => 'Part name is required']);
    exit;
}

// Check the stock level of the part in the inventory
$checkStockSql = "SELECT stock FROM inventory WHERE name = ?";
$stmt = $conn->prepare($checkStockSql);
$stmt->bind_param("s", $partName);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $stock = $row['stock'];

    // If stock is 0 or less, update the availability of job orders with this part to "Unavailable" where progress is "in progress"
    if ($stock <= 0) {
        $updateAvailabilitySql = "UPDATE job_order_parts SET availability = 'Unavailable' WHERE part_name = ? AND progress = 'in progress'";
        $updateStmt = $conn->prepare($updateAvailabilitySql);
        $updateStmt->bind_param("s", $partName);
        $updateStmt->execute();

        if ($updateStmt->affected_rows > 0) {
            echo json_encode(['success' => true, 'message' => 'Availability updated successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'No job orders were updated']);
        }
        $updateStmt->close();
    } else {
        echo json_encode(['success' => true, 'message' => 'Stock is sufficient, no update needed']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Part not found']);
}

$stmt->close();
$conn->close();
?>
