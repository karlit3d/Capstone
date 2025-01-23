<?php
$conn = new mysqli("localhost", "root", "", "agtechdb");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$jobOrderId = $_GET['job_order_id'] ?? '';

$sql = "SELECT estimate_completion FROM job_orders WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $jobOrderId);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    echo json_encode(["success" => true, "estimate_completion" => $row["estimate_completion"]]);
} else {
    echo json_encode(["success" => false]);
}
$stmt->close();
$conn->close();
?>
