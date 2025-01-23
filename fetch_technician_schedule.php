<?php
$conn = new mysqli('localhost', 'root', '', 'agtechdb');
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => $conn->connect_error]));
}

$result = $conn->query("SELECT id, name FROM technicians");
$technicians = [];
while ($row = $result->fetch_assoc()) {
    $technicians[] = $row;
}
echo json_encode($technicians);
$conn->close();
?>
