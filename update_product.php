<?php
include 'inventory.php'; // Ensure you connect to your database

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    $name = $_POST['name']; // Capture the name
    $category = $_POST['category'];
    $type = $_POST['type'];
    $brand = $_POST['brand'];
    $retail_price = $_POST['retail_price'];
    $capital_price = $_POST['capital_price'];
    $item_by = $_POST['item_by'];
    $stock = $_POST['stock'];
    $labor_cost = $_POST['labor_cost']; // New labor cost field
    $days_to_deliver = $_POST['days_to_deliver'];
    $completion_days = isset($_POST['estimate_completion_days']) ? intval($_POST['estimate_completion_days']) : 0;
    $completion_hours = isset($_POST['estimate_completion_hours']) ? intval($_POST['estimate_completion_hours']) : 0;


    // Update database logic to include labor_cost
    $sql = "UPDATE inventory SET name = ?, category = ?, type = ?, brand = ?, retail_price = ?, capital_price = ?, item_by = ?, stock = ?, labor_cost = ?, days_to_deliver = ?, estimate_completion_days = ?, estimate_completion_hours = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssdssdiiiii", $name, $category, $type, $brand, $retail_price, $capital_price, $item_by, $stock, $labor_cost, $days_to_deliver, $completion_days, $completion_hours, $id);
    
    if ($stmt->execute()) {
        echo "Product updated successfully";
    } else {
        echo "Error updating product: " . $stmt->error;
    }
    $stmt->close();
}

$conn->close();
?>
