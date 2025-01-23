<?php
$servername = "localhost";
$username = "root";  // Update with your MySQL username
$password = "";      // Update with your MySQL password
$dbname = "agtechdb";  // Update with your database name

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['date']) && isset($_GET['time'])) {
    $selected_date = $_GET['date'];
    $selected_time = $_GET['time'];

    $sql = "SELECT mechanic FROM appointments WHERE appointment_date = ? AND appointment_time = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $selected_date, $selected_time);
    $stmt->execute();
    $result = $stmt->get_result();

    $booked_mechanics = [];
    while ($row = $result->fetch_assoc()) {
        $booked_mechanics[] = $row['mechanic'];
    }

    header('Content-Type: application/json');
    echo json_encode(['booked_mechanics' => $booked_mechanics]);

    $stmt->close();
}

$conn->close();
?>
