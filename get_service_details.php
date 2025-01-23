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

// Check if the 'id' parameter is set in the GET request
if (isset($_GET['id'])) {
    $repairId = $_GET['id'];

    // Prepare the SQL statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT appointment_date AS date, first_name AS name, contact_number AS contact, car_brand AS vehicle, service, mechanic, appointment_time AS time FROM job_orders WHERE id = ?");
    $stmt->bind_param("i", $repairId);

    // Execute the query
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if a record is found
    if ($result->num_rows > 0) {
        // Fetch the result as an associative array
        $serviceDetails = $result->fetch_assoc();

        // Return the service details as JSON
        echo json_encode($serviceDetails);
    } else {
        // Return an error if no record found
        echo json_encode(['error' => 'No service details found for this ID']);
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
} else {
    // Return an error if 'id' parameter is missing
    echo json_encode(['error' => 'No ID provided']);
}
?>
