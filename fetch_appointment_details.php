<?php
// Database connection
$servername = "localhost";
$username = "root";  // replace with your MySQL username
$password = "";  // replace with your MySQL password
$dbname = "agtechdb";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    // Display the actual connection error
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['id'])) {
    $appointmentId = $_GET['id'];

    // Debugging: Log the appointment ID received
    error_log("Received appointment ID from admin_appointments: " . $appointmentId);

    // Prepare a SQL query to join the two tables and fetch the appointment details
    $query = "
        SELECT a.id, 
               CONCAT(a.first_name, ' ', a.last_name) AS name, 
               a.contact_number, 
               CONCAT(a.car_brand, ' ', a.car_model, ' ', a.car_year) AS vehicle, 
               a.services, a.mechanic, a.appointment_date AS date, a.appointment_time AS time, a.plate_number 
        FROM appointments a
        JOIN admin_appointments aa ON a.id = aa.appointment_id
        WHERE aa.id = ?";  // Match the id from the admin_appointments table

    if ($stmt = $conn->prepare($query)) {
        // Bind the appointment ID to the query
        $stmt->bind_param("i", $appointmentId);

        // Execute the query
        if ($stmt->execute()) {
            // Get the result
            $result = $stmt->get_result();

            // Check if the appointment was found
            if ($result->num_rows > 0) {
                // Fetch the appointment details as an associative array
                $appointmentDetails = $result->fetch_assoc();

                // Send the appointment details back as JSON
                echo json_encode($appointmentDetails);
            } else {
                // Display a message if no appointment is found
                echo json_encode(['error' => 'No appointment found for the provided ID: ' . $appointmentId]);
            }
        } else {
            // Display detailed error message if query execution fails
            echo json_encode(['error' => 'Query execution failed: ' . $stmt->error]);
        }

        // Close the statement
        $stmt->close();
    } else {
        // Display detailed error message if query preparation fails
        echo json_encode(['error' => 'Failed to prepare SQL query: ' . $conn->error]);
    }
} else {
    // Display a message if no appointment ID was provided
    echo json_encode(['error' => 'No appointment ID provided']);
}

// Close the database connection
$conn->close();
?>
