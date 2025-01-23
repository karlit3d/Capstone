<?php
$servername = "localhost";
$username = "root";  // Update with your MySQL username
$password = "";      // Update with your MySQL password
$dbname = "agtechdb";  // Update with your database name

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Log the received date and time parameters
if (isset($_GET['date']) && isset($_GET['time'])) { 
    $selected_date = $_GET['date'];
    $selected_time = $_GET['time'];
    error_log("Received date: $selected_date and time: $selected_time", 0);
} else {
    die("Error: 'date' and 'time' parameters are required.");
}
 
// Convert the selected date to the day of the week
$day_of_week = date('l', strtotime($selected_date));

// Query to fetch all mechanics available on the selected day
$sql_available = "SELECT m.name 
                  FROM mechanics m
                  JOIN mechanic_schedule ms ON m.id = ms.mechanic_id
                  WHERE ms.day_of_week = ?";

$stmt_available = $conn->prepare($sql_available);
$stmt_available->bind_param("s", $day_of_week);
$stmt_available->execute();
$result_available = $stmt_available->get_result();

$available_mechanics = [];
while ($row = $result_available->fetch_assoc()) {
    $available_mechanics[] = $row['name'];
}

// Query to fetch the mechanics that are already booked at the selected date and time
$sql_booked = "SELECT mechanic 
               FROM appointments 
               WHERE appointment_date = ? 
               AND appointment_time = ? 
               AND mechanic IS NOT NULL";  // Only consider booked mechanics

$stmt_booked = $conn->prepare($sql_booked);
$stmt_booked->bind_param("ss", $selected_date, $selected_time);
$stmt_booked->execute();
$result_booked = $stmt_booked->get_result();

$booked_mechanics = [];
while ($row = $result_booked->fetch_assoc()) {
    $booked_mechanics[] = $row['mechanic'];
}

// Send both available and booked mechanics to the frontend
header('Content-Type: application/json');
echo json_encode([
    'mechanics' => $available_mechanics,    // All available mechanics for the day
    'bookedMechanics' => $booked_mechanics  // Mechanics already booked for the selected time
]);

$conn->close();
?>
