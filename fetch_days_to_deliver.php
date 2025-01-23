<?php
// Database connection
$conn = new mysqli("localhost", "root", "", "agtechdb");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch partName from the request
$partName = $_GET['partName'] ?? '';

// Query the database for days_to_deliver
$sql = "SELECT days_to_deliver FROM inventory WHERE name = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $partName);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    echo json_encode(['daysToDeliver' => $row['days_to_deliver']]);
} else {
    echo json_encode(['daysToDeliver' => null]);
}

$stmt->close();
$conn->close();
?>
