<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "agtechdb";

try {
    // Establish a PDO connection using $conn
    $conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Query to get selected columns (excluding 'id'), sorted alphabetically by the 'name' column
    $stmt = $conn->query("SELECT name, brand, type, stock, retail_price, capital_price, item_by FROM inventory ORDER BY name ASC");

    // Fetch all rows and output as JSON
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);
    
} catch (PDOException $e) {
    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
}
