<?php
// Database connection setup
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "agtechdb";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['job_order_id'])) {
    $job_order_id = intval($_GET['job_order_id']);
    $sql = "SELECT appointment_id FROM job_orders WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $job_order_id);
    $stmt->execute();
    $stmt->bind_result($appointment_id);
    $stmt->fetch();
    $stmt->close();
    $conn->close();

    if ($appointment_id) {
        echo json_encode(['appointment_id' => $appointment_id]);
    } else {
        echo json_encode(['error' => 'No appointment ID found']);
    }
} else {
    echo json_encode(['error' => 'No job order ID provided']);
}
?>
