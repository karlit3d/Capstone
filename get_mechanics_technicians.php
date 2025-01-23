<?php
if (isset($_GET['appointment_id'])) {
    $appointmentId = $_GET['appointment_id'];

    $conn = new mysqli('localhost', 'root', '', 'agtechdb');
    if ($conn->connect_error) {
        echo json_encode(['success' => false, 'error' => 'Database connection failed.']);
        exit;
    }

    // Fetch the assigned mechanic for the appointment
    $stmt = $conn->prepare("SELECT mechanic FROM appointments WHERE id = ?");
    $stmt->bind_param('i', $appointmentId);
    $stmt->execute();
    $stmt->bind_result($mechanic);
    $stmt->fetch();
    $stmt->close();

    // Fetch all available technicians with their IDs
    $techniciansResult = $conn->query("SELECT id, name FROM technicians");
    $technicians = [];
    while ($row = $techniciansResult->fetch_assoc()) {
        $technicians[] = [
            'id' => $row['id'],
            'name' => $row['name']
        ];
    }

    $conn->close();

    echo json_encode([
        'success' => true,
        'mechanic' => $mechanic,
        'technicians' => $technicians,
    ]);
}
?>
