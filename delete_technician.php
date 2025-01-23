<?php
$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];

$conn = new mysqli('localhost', 'root', '', 'agtechdb');
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => $conn->connect_error]));
}

$sql = "DELETE FROM technicians WHERE id = $id";
if ($conn->query($sql) === TRUE) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => $conn->error]);
}
$conn->close();
?>
