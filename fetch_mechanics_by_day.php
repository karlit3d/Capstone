<?php
$servername = "localhost";
$username = "root";  // Update with your MySQL username
$password = "";      // Update with your MySQL password
$dbname = "agtechdb";  // Update with your database name

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['date'])) {
    $selected_date = $_GET['date'];
    $day_of_week = date('l', strtotime($selected_date));

    $sql = "SELECT m.name 
            FROM mechanics m
            JOIN mechanic_schedule ms ON m.id = ms.mechanic_id
            WHERE ms.day_of_week = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $day_of_week);
    $stmt->execute();
    $result = $stmt->get_result();

    $mechanics = [];
    while ($row = $result->fetch_assoc()) {
        $mechanics[] = ['name' => $row['name']];
    }

    header('Content-Type: application/json');
    echo json_encode(['mechanics' => $mechanics]);

    $stmt->close();
}

$conn->close();
?>
