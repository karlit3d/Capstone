<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "agtechdb";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password); // Use $servername instead of $host
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

header('Content-Type: application/json');

try {
    $query = "SELECT name, type, stock FROM inventory";
    $stmt = $conn->prepare($query);
    $stmt->execute();

    $inventoryData = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($inventoryData);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
