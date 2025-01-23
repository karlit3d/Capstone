<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $appointmentId = $_POST['appointment_id'];
    $partName = $_POST['part_name'];
    $completedBy = $_POST['completed_by'];

    $conn = new mysqli('localhost', 'root', '', 'agtechdb');
    if ($conn->connect_error) {
        echo json_encode(['success' => false, 'error' => 'Database connection failed.']);
        exit;
    }

    // Check if completed_by is numeric (indicating a technician ID)
    if (is_numeric($completedBy)) {
        // Fetch the technician's name from the database
        $stmt = $conn->prepare("SELECT name FROM technicians WHERE id = ?");
        $stmt->bind_param('i', $completedBy);
        $stmt->execute();
        $stmt->bind_result($technicianName);
        $stmt->fetch();
        $stmt->close();

        // If the technician ID is valid, use the technician's name
        if ($technicianName) {
            $completedBy = $technicianName;
        } else {
            echo json_encode(['success' => false, 'error' => 'Technician not found.']);
            $conn->close();
            exit;
        }
    }

    // Debugging log for completed_by
    // Remove this in production
    error_log("Completed By Value: " . $completedBy);

    // Fetch the associated job_order_id
    $stmt = $conn->prepare("SELECT job_order_id FROM job_order_parts WHERE appointment_id = ? AND part_name = ?");
    $stmt->bind_param('is', $appointmentId, $partName);
    $stmt->execute();
    $stmt->bind_result($jobOrderId);
    $stmt->fetch();
    $stmt->close();

    if ($jobOrderId === null) {
        echo json_encode(['success' => false, 'error' => 'No matching job_order_id found for the given appointment_id and part_name.']);
        $conn->close();
        exit;
    }

    // Debugging log for job_order_id
    // Remove this in production
    error_log("Job Order ID: " . $jobOrderId);

    // Update the job_order_parts table with the resolved completed_by value
    $stmt = $conn->prepare("UPDATE job_order_parts SET completed_by = ? WHERE job_order_id = ? AND appointment_id = ? AND part_name = ?");
    $stmt->bind_param('siss', $completedBy, $jobOrderId, $appointmentId, $partName);
    $success = $stmt->execute();
    $stmt->close();

    if ($success) {
        echo json_encode(['success' => true, 'message' => 'Job order part updated successfully.']);
    } else {
        echo json_encode(['success' => false, 'error' => 'Failed to update job order part.']);
    }

    $conn->close();
}
?>
