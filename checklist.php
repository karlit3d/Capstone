<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "agtechdb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// Retrieve the token from the query parameter
$token = $_GET['token'] ?? null;

if (!$token) {
    echo "Invalid or missing token.";
    exit;
}

// Query to find the job order based on the provided token
$query = "SELECT * FROM job_orders WHERE token = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $token);
$stmt->execute();
$result = $stmt->get_result();

if ($result && $jobOrder = $result->fetch_assoc()) {
    // Display the checklist details associated with the token
    echo "<h2>Checklist for " . htmlspecialchars($jobOrder['first_name'] . ' ' . $jobOrder['last_name']) . "</h2>";
    echo "<p>Service: " . htmlspecialchars($jobOrder['service']) . "</p>";
    echo "<p>Mechanic: " . htmlspecialchars($jobOrder['mechanic']) . "</p>";
    echo "<p>Appointment Date: " . htmlspecialchars($jobOrder['appointment_date']) . "</p>";
    
    // Add any additional details or formatting you need for the checklist
} else {
    echo "Checklist not found for the provided token.";
}

// Close the database connection
$stmt->close();
$conn->close();
?>
