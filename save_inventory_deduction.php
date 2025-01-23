<?php
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "agtechdb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "Connection failed: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);

if (
    isset($data["job_order_id"], $data["first_name"], $data["last_name"], 
    $data["part_name"], $data["quantity"], $data["completion_time"])
) {
    $jobOrderId = $conn->real_escape_string($data["job_order_id"]);
    $firstName = $conn->real_escape_string($data["first_name"]);
    $lastName = $conn->real_escape_string($data["last_name"]);
    $partName = $conn->real_escape_string($data["part_name"]);
    $quantity = $conn->real_escape_string($data["quantity"]);
    $completionTime = $conn->real_escape_string($data["completion_time"]);

    $sql = "INSERT INTO inventory_deduction (job_order_id, first_name, last_name, part_name, quantity, completion_time)
            VALUES ('$jobOrderId', '$firstName', '$lastName', '$partName', '$quantity', '$completionTime')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Completion data saved successfully."]);
    } else {
        echo json_encode(["success" => false, "error" => "Error: " . $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Invalid input data"]);
}

$conn->close();
?>
