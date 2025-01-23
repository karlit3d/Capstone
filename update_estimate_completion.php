<?php
// Include the database connection file
require_once 'inventory.php';

header('Content-Type: application/json');

try {
    // Retrieve and decode the JSON input
    $input = json_decode(file_get_contents('php://input'), true);

    // Check if the required fields are present
    if (!isset($input['appointmentId']) || !isset($input['updatedCompletionDate'])) {
        echo json_encode([
            'success' => false,
            'error' => 'Missing required parameters: appointmentId or updatedCompletionDate.'
        ]);
        exit;
    }

    // Sanitize and validate the input
    $appointmentId = intval($input['appointmentId']);
    $updatedCompletionDate = $input['updatedCompletionDate'];

    // Validate the date format (YYYY-MM-DD)
    if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $updatedCompletionDate)) {
        echo json_encode([
            'success' => false,
            'error' => 'Invalid date format. Expected YYYY-MM-DD.'
        ]);
        exit;
    }

    // Prepare and execute the SQL update query
    $sql = "UPDATE job_orders SET estimate_completion = ? WHERE appointment_id = ?"; // Updated to match `appointment_id` column
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        echo json_encode([
            'success' => false,
            'error' => 'Failed to prepare the SQL statement: ' . $conn->error
        ]);
        exit;
    }

    $stmt->bind_param("si", $updatedCompletionDate, $appointmentId);

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(['success' => true, 'message' => 'Estimated completion date updated successfully.']);
        } else {
            echo json_encode([
                'success' => false,
                'error' => 'No rows were updated. Check if the appointmentId exists.'
            ]);
        }
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Failed to execute the update query: ' . $stmt->error
        ]);
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => 'An unexpected error occurred: ' . $e->getMessage()
    ]);
    error_log('Exception: ' . $e->getMessage());
}
?>
