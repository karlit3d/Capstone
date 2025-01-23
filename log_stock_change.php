<?php
header("Content-Type: application/json");

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

// Decode the JSON data sent in the request body
$data = json_decode(file_get_contents("php://input"), true);

// Log the incoming data
file_put_contents('log_debug.txt', "Received data: " . print_r($data, true), FILE_APPEND);

// Validate and extract data (without part_id)
if (isset($data["part_name"], $data["change_type"], $data["quantity"], $data["total_stock"])) {
    $partName = $conn->real_escape_string($data["part_name"]);
    $changeType = ($data["change_type"] === 'add' || $data["change_type"] === 'deduct') ? $data["change_type"] : 'add';
    $quantity = intval($data["quantity"]);
    $totalStock = intval($data["total_stock"]);

    // Insert the data into the inventory_stock_changes table
    $sql = "INSERT INTO inventory_stock_changes (part_name, change_type, quantity, total_stock, change_date)
            VALUES ('$partName', '$changeType', '$quantity', '$totalStock', NOW())";

    // Log the SQL query
    file_put_contents('log_debug.txt', "Executing SQL: $sql\n", FILE_APPEND);

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Stock change logged successfully."]);
    } else {
        $error_message = "Error updating database: " . $conn->error;
        file_put_contents('log_debug.txt', "SQL Error: $error_message\n", FILE_APPEND);
        echo json_encode(["success" => false, "error" => $error_message]);
    }
} else {
    $error_message = "Invalid input data";
    file_put_contents('log_debug.txt', "$error_message\n", FILE_APPEND);
    echo json_encode(["success" => false, "error" => $error_message]);
}

$conn->close();
?>
