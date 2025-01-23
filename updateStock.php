<?php
header("Content-Type: application/json");

// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "agtechdb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "Connection failed: " . $conn->connect_error]));
}

// Get the JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Check if required parameters are set
if (isset($data["name"], $data["newStock"])) {
    $name = $conn->real_escape_string($data["name"]);
    $newStock = intval($data["newStock"]);

    // Update stock for the specified part name
    $sql = "UPDATE inventory SET stock = '$newStock' WHERE name = '$name'";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Stock updated successfully."]);
    } else {
        echo json_encode(["success" => false, "error" => "Error updating stock: " . $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Invalid input data"]);
}

// Close the database connection
$conn->close();
?>
