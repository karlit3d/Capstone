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

// Retrieve part name and quantity from POST request
$part_name = isset($_POST['part_name']) ? $_POST['part_name'] : '';
$quantity = isset($_POST['quantity']) ? intval($_POST['quantity']) : 0;

// Validate inputs
if (empty($part_name) || $quantity <= 0) {
    echo json_encode(['success' => false, 'message' => 'Invalid part name or quantity.']);
    exit;
}

// Prepare the SQL statement to update the stock
$sql = "UPDATE inventory SET stock = stock - ? WHERE name = ?";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    echo json_encode(['success' => false, 'message' => 'Failed to prepare the statement.']);
    exit;
}

$stmt->bind_param("is", $quantity, $part_name);

// Execute the query
if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        // Fetch the updated stock level
        $stmt->close();

        $sql = "SELECT stock FROM inventory WHERE name = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $part_name);
        $stmt->execute();
        $stmt->bind_result($new_total_stock);
        $stmt->fetch();

        echo json_encode([
            'success' => true,
            'message' => 'Stock updated successfully.',
            'new_total_stock' => $new_total_stock // Include updated stock level
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'No matching part found or no stock to deduct.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Error updating stock: ' . $stmt->error]);
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>
