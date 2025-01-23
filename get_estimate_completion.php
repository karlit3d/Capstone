<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "agtechdb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'error' => 'Connection failed: ' . $conn->connect_error]));
}

$part_name = $_GET['part_name'];

$sql = "SELECT estimate_completion_days, estimate_completion_hours FROM inventory WHERE name = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $part_name);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode([
        'success' => true,
        'estimate_completion_days' => $row['estimate_completion_days'],
        'estimate_completion_hours' => $row['estimate_completion_hours']
    ]);
} else {
    echo json_encode(['success' => false, 'error' => 'Part not found']);
}

$stmt->close();
$conn->close();
?>
