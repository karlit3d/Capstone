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

    // Get the ticket ID from the request
    $ticketId = isset($_GET['id']) ? $_GET['id'] : null;

    if ($ticketId) {
        // Prepare SQL to fetch appointment data by id, including the token
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
                   a.token,  -- Include the token here
                   a.id
            FROM appointments a
            JOIN admin_appointments aa ON a.id = aa.appointment_id
            WHERE a.id = :ticketId
        ";

        // Prepare and execute the statement
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':ticketId', $ticketId, PDO::PARAM_INT);
        $stmt->execute();

        // Fetch the result
        $appointment = $stmt->fetch(PDO::FETCH_ASSOC);

        // Return the data as a JSON response
        header('Content-Type: application/json');
        if ($appointment) {
            echo json_encode($appointment);
        } else {
            echo json_encode(['error' => 'No appointment found']);
        }
    } else {
        echo json_encode(['error' => 'Invalid ticket ID']);
    }
} catch (PDOException $e) {
    // Handle any connection errors
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
}
?>
