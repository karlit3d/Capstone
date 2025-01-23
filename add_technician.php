<?php
$data = json_decode(file_get_contents('php://input'), true);
$name = $data['name'];

$conn = new mysqli('localhost', 'root', '', 'agtechdb');
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => $conn->connect_error]));
}

$sql = "INSERT INTO technicians (name) VALUES ('$name')";
if ($conn->query($sql) === TRUE) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => $conn->error]);
}
$conn->close();
?>