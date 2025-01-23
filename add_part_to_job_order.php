<?php
// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "agtechdb";

// Create database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set response header to JSON
header('Content-Type: application/json');

try {
    // Decode JSON data from the POST request
    $inputData = json_decode(file_get_contents('php://input'), true);
    $jobOrderId = $inputData['jobOrderId'];
    $partName = $inputData['partName'];
    $partQuantity = intval($inputData['partQuantity']);
    $availability = $inputData['availability'] ?? 'Unavailable';
    $daysToDeliver = intval($inputData['daysToDeliver'] ?? 0);

    // Validate input data
    if (!$jobOrderId || !$partName || !$partQuantity) {
        echo json_encode(['success' => false, 'message' => 'Invalid input data.']);
        exit;
    }

    // Prepare the SQL insert statement
    $stmt = $conn->prepare("INSERT INTO job_order_parts (job_order_id, part_name, part_quantity, availability, progress, days_to_deliver) VALUES (?, ?, ?, ?, 'In Progress', ?)");
    $stmt->bind_param("isisi", $jobOrderId, $partName, $partQuantity, $availability, $daysToDeliver);

    // Execute the statement and check for success
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Part added successfully.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to add part.']);
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
} catch (Exception $e) {
    // Handle any errors
    echo json_encode(['success' => false, 'message' => 'Server error: ' . $e->getMessage()]);
}
?>
