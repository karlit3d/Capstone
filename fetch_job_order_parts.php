<?php
// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "agtechdb";

// Check if 'appointment_id' parameter is provided
if (!isset($_GET['appointment_id'])) {
    echo json_encode(["error" => "Missing appointment_id"]);
    exit;
}

// Get the appointment_id from the request
$appointment_id = $_GET['appointment_id'];

// Connect to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query to get job_order_id, mechanic, appointment_date, service, and parts under the specified appointment_id
$sql = "SELECT job_order_parts.job_order_id, job_order_parts.part_name, job_order_parts.part_quantity, 
               job_orders.mechanic, job_orders.appointment_date, job_orders.service
        FROM job_order_parts 
        JOIN job_orders ON job_order_parts.job_order_id = job_orders.id 
        WHERE job_order_parts.appointment_id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $appointment_id);
$stmt->execute();
$result = $stmt->get_result();

// Check if any records were found
if ($result->num_rows > 0) {
    $jobOrders = [];

    // Loop through each row and structure data by job_order_id
    while ($row = $result->fetch_assoc()) {
        $job_order_id = $row['job_order_id'];
        $part_name = $row['part_name'];
        $part_quantity = $row['part_quantity'];
        $mechanic = $row['mechanic'];
        $appointment_date = $row['appointment_date'];
        $service = $row['service'];

        // Initialize job order entry if not already set
        if (!isset($jobOrders[$job_order_id])) {
            $jobOrders[$job_order_id] = [
                "mechanic" => $mechanic,
                "appointment_date" => $appointment_date,
                "service" => $service,
                "parts" => []
            ];
        }

        // Check if the part_name already exists under the job_order_id
        if (isset($jobOrders[$job_order_id]['parts'][$part_name])) {
            // Add quantity if the part already exists
            $jobOrders[$job_order_id]['parts'][$part_name] += $part_quantity;
        } else {
            // Initialize part with its quantity if not already present
            $jobOrders[$job_order_id]['parts'][$part_name] = $part_quantity;
        }
    }

    // Format data for JSON response
    $formattedJobOrders = [];
    foreach ($jobOrders as $jobOrderId => $jobOrderData) {
        $formattedJobOrders[$jobOrderId] = [
            "mechanic" => $jobOrderData['mechanic'],
            "appointment_date" => $jobOrderData['appointment_date'],
            "service" => $jobOrderData['service'],
            "parts" => []
        ];
        foreach ($jobOrderData['parts'] as $name => $quantity) {
            $formattedJobOrders[$jobOrderId]["parts"][] = [
                "part_name" => $name,
                "part_quantity" => $quantity
            ];
        }
    }

    // Output the data as JSON
    echo json_encode(["success" => true, "data" => $formattedJobOrders]);
} else {
    echo json_encode(["success" => false, "message" => "No parts found for this appointment_id"]);
}

// Close the database connection
$stmt->close();
$conn->close();
?>
