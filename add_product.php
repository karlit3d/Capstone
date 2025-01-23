<?php
include 'inventory.php';

$name = $_POST['name'];
$brand = $_POST['brand'];
$category = $_POST['category'];
$status = $_POST['status'];
$type = $_POST['type'];
$stock = $_POST['stock'];
$retail_price = $_POST['retail_price'];
$capital_price = $_POST['capital_price'];
$item_by = $_POST['item_by'];
$labor_cost = $_POST['labor_cost']; // New field
$days_to_deliver = $_POST['days_to_deliver']; // New field
$completion_days = isset($_POST['completion_days']) ? intval($_POST['completion_days']) : 0;
$completion_hours = isset($_POST['completion_hours']) ? intval($_POST['completion_hours']) : 0;


$sql = "INSERT INTO inventory (name, brand, category, status, type, stock, retail_price, capital_price, item_by, labor_cost, days_to_deliver,  estimate_completion_days, estimate_completion_hours) 
        VALUES ('$name', '$brand', '$category', '$status', '$type', $stock, $retail_price, $capital_price, '$item_by', $labor_cost, $days_to_deliver, $completion_days, $completion_hours)";
    if ($conn->query($sql) === TRUE) {
        echo "New product added successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }    

$conn->close();
?>
