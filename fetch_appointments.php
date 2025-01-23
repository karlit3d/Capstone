<?php
// Database connection
$servername = "localhost";
$username = "root"; // replace with your MySQL username
$password = ""; // replace with your MySQL password
$dbname = "agtechdb";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Update status for past appointments
$currentDate = date('Y-m-d H:i:s');
$yesterday = date('Y-m-d 00:00:00', strtotime('today'));

$updateSql = "
    UPDATE appointments a
    JOIN admin_appointments aa ON a.id = aa.appointment_id
    SET aa.status = 'cancelled'
    WHERE aa.status = 'upcoming' AND a.appointment_date < ?
";

$stmt = $conn->prepare($updateSql);
$stmt->bind_param("s", $yesterday);
$stmt->execute();
$stmt->close();
// Fetch required appointment data
$sql = "
    SELECT a.appointment_date, 
           CONCAT(UPPER(SUBSTRING(a.first_name, 1, 1)), LOWER(SUBSTRING(a.first_name, 2))) AS first_name, 
           CONCAT(UPPER(SUBSTRING(a.last_name, 1, 1)), LOWER(SUBSTRING(a.last_name, 2))) AS last_name,   
           a.appointment_time, 
           a.services, 
           a.car_brand, 
           a.car_model, 
           a.car_year, 
           a.contact_number,  
           a.mechanic,
           UPPER(a.plate_number) AS plate_number,      
           aa.status,
           a.id
    FROM appointments a
    JOIN admin_appointments aa ON a.id = aa.appointment_id
";

$result = $conn->query($sql);
$appointments = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Reformat data to match the expected structure
        $appointments[] = [
            'date' => $row['appointment_date'],
            'name' => $row['first_name'] . ' ' . $row['last_name'],  // Combine first and last name
            'time' => $row['appointment_time'],
            'service' => $row['services'],
            'vehicle' => $row['car_brand'] . ' ' . $row['car_model'] . ', ' . $row['car_year'],
            'contact' => $row['contact_number'], // Store contact number
            'mechanic' => $row['mechanic'], // Store mechanic name
            'platenumber' => $row['plate_number'],
            'id'=> $row['id'],
            'status' => $row['status']
        ];
    }
}

// Return data as JSON
header('Content-Type: application/json');
echo json_encode($appointments);

$conn->close();
?>
