<?php
// Database connection parameters
$servername = "localhost"; // Change this if your database is hosted elsewhere
$username = "root"; // replace with your MySQL username
$password = ""; // replace with your MySQL password
$dbname = "agtechdb";

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

// Set the content type to JSON
header('Content-Type: application/json');

// Get the input JSON
$input = json_decode(file_get_contents('php://input'), true);

// Check if id and status are set
if (isset($input['id']) && isset($input['status'])) {
    $id = $input['id'];
    $status = $input['status'];

    // Prepare the SQL statement to update the appointment status
    $stmt = $conn->prepare("UPDATE admin_appointments SET status = ? WHERE id = ?");
    
    if ($stmt === false) {
        die(json_encode(["success" => false, "message" => "SQL preparation failed: " . $conn->error]));
    }

    // Bind parameters
    $stmt->bind_param("si", $status, $id);

    // Execute the statement
    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(["success" => true, "message" => "Appointment updated successfully."]);
        } else {
            echo json_encode(["success" => false, "message" => "No appointment found with the provided ID."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Error executing query: " . $stmt->error]);
    }

    // Close the statement
    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Invalid input: ID and status are required."]);
}

// Close the database connection
$conn->close();
?>
