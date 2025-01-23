<?php
// Include your database connection
$servername = "localhost";
$username = "root"; // replace with your MySQL username
$password = ""; // replace with your MySQL password
$dbname = "agtechdb";

// Create the connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set the content type to JSON, because we'll be working with JSON data
header('Content-Type: application/json');

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw POST data
    $data = json_decode(file_get_contents('php://input'), true);

    // Extract appointment ID and new status from the POST data
    $appointmentId = $data['id'];
    $newStatus = $data['status'];

    // Sanitize input to prevent SQL injection
    $appointmentId = mysqli_real_escape_string($conn, $appointmentId);
    $newStatus = mysqli_real_escape_string($conn, $newStatus);

    // Prepare the SQL query to update the status in the correct table
    $query = "UPDATE admin_appointments SET status = '$newStatus' WHERE appointment_id = '$appointmentId'";

    // Execute the query
    if (mysqli_query($conn, $query)) {
        // If the query was successful, return a success response   
        echo json_encode([
            'status' => 'success',
            'message' => 'Appointment status updated successfully.'
        ]);
    } else {
        // If there was an error, return an error response along with SQL error message
        echo json_encode([
            'status' => 'error',
            'message' => 'Failed to update appointment status: ' . mysqli_error($conn)
        ]);
    }

    // Close the database connection
    mysqli_close($conn);
} else {
    // If the request method is not POST, return an error
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method.'
    ]);
}
?>
