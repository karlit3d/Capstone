<?php
$conn = new mysqli("localhost", "root", "", "agtechdb");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);
$jobOrderId = $data['job_order_id'] ?? '';
$estimateCompletion = $data['estimate_completion'] ?? '';

$sql = "UPDATE job_orders SET estimate_completion = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $estimateCompletion, $jobOrderId);
$success = $stmt->execute();

echo json_encode(["success" => $success]);

$stmt->close();
$conn->close();
?>
