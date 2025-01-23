<?php
// Database connection setup
$host = "localhost";
$dbname = "your_database_name"; 
$username = "root";  
$password = "";  

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get POST data
    $input = json_decode(file_get_contents('php://input'), true);
    $appointmentId = $input['id'];

    // Fetch data by joining admin_appointments and appointments on appointment_id
    $stmt = $conn->prepare("
        SELECT 
            a.firstName, 
            a.lastName, 
            a.date, 
            a.plateNo, 
            aa.service, 
            aa.status 
        FROM 
            admin_appointments aa
        JOIN 
            appointments a 
        ON 
            aa.appointment_id = a.id
        WHERE 
            aa.appointment_id = :id
    ");

    $stmt->bindParam(':id', $appointmentId, PDO::PARAM_INT);
    $stmt->execute();

    $appointment = $stmt->fetch(PDO::FETCH_ASSOC);

    // Return the appointment data as JSON
    echo json_encode($appointment);

} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
