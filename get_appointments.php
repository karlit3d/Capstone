<?php
// Database connection parameters
$host = 'localhost';
$dbname = 'agtechdb';
$username = 'root';
$password = '';

try {
    // Create a new PDO connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // SQL query to fetch appointments and join with admin_appointments
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

    // Execute the query
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    // Fetch the result set as an associative array
    $appointments = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
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

    // Return the data as a JSON response
    header('Content-Type: application/json');
    echo json_encode($appointments);
} catch (PDOException $e) {
    // Handle any connection errors
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
}
?>
