<?php
header('Content-Type: application/json');
include 'inventory.php';  // Ensure this file is included and has the database connection

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve product ID and status from the POST request
    $product_id = intval($_POST['id']);
    $status = $_POST['status'];

    // Ensure the status is either 'active' or 'inactive'
    if ($status !== 'active' && $status !== 'inactive') {
        echo json_encode(['success' => false, 'message' => 'Invalid status value']);
        exit;
    }

    // Prepare and execute the update query
    $stmt = $conn->prepare("UPDATE inventory SET status = ? WHERE id = ?");
    if ($stmt === false) {
        echo json_encode(['success' => false, 'message' => 'Error preparing statement: ' . $conn->error]);
        exit;
    }

    $stmt->bind_param("si", $status, $product_id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error executing query: ' . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
