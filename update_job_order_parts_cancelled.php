<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "agtechdb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $appointmentId = $_POST['appointment_id']; // Appointment ID from the frontend
    $partName = $_POST['part_name']; // Part name from the frontend

    // Log incoming data for debugging
    error_log("Appointment ID: $appointmentId, Part Name: $partName");

    // Ensure the required fields are not empty
    if (!empty($appointmentId) && !empty($partName)) {
        // Fetch the estimate_completion_days and estimate_completion_hours from the inventory table
        $fetchEstimateQuery = "
            SELECT i.estimate_completion_days, i.estimate_completion_hours 
            FROM job_order_parts jop
            INNER JOIN inventory i ON jop.part_name = i.name
            WHERE jop.appointment_id = ? AND jop.part_name = ?";
        $fetchStmt = $conn->prepare($fetchEstimateQuery);
        if (!$fetchStmt) {
            error_log("Prepare failed: " . $conn->error);
            echo json_encode(['success' => false, 'error' => 'SQL prepare failed']);
            exit();
        }

        $fetchStmt->bind_param("is", $appointmentId, $partName);
        $fetchStmt->execute();
        $fetchResult = $fetchStmt->get_result();

        if ($fetchResult->num_rows > 0) {
            $row = $fetchResult->fetch_assoc();
            $estimateDays = (int)$row['estimate_completion_days'];
            $estimateHours = (int)$row['estimate_completion_hours'];

            // Log the fetched estimates
            error_log("Fetched Estimate Completion Days: $estimateDays, Estimate Completion Hours: $estimateHours");

            // Update the part's progress to "cancelled" and set the completion time to NOW()
            $updateQuery = "UPDATE job_order_parts SET progress = 'cancelled', completion_time = NOW() WHERE appointment_id = ? AND part_name = ?";
            $updateStmt = $conn->prepare($updateQuery);
            if (!$updateStmt) {
                error_log("Prepare failed: " . $conn->error);
                echo json_encode(['success' => false, 'error' => 'SQL prepare failed']);
                exit();
            }

            $updateStmt->bind_param("is", $appointmentId, $partName);
            if ($updateStmt->execute()) {
                // Update the estimated completion date in the job_orders table
                $updateEstimateQuery = "
                    UPDATE job_orders 
                    SET estimate_completion = DATE_SUB(
                        DATE_SUB(estimate_completion, INTERVAL ? DAY), INTERVAL ? HOUR
                    ) 
                    WHERE appointment_id = ?";
                $estimateStmt = $conn->prepare($updateEstimateQuery);
                if (!$estimateStmt) {
                    error_log("Prepare failed: " . $conn->error);
                    echo json_encode(['success' => false, 'error' => 'SQL prepare failed']);
                    exit();
                }

                $estimateStmt->bind_param("iii", $estimateDays, $estimateHours, $appointmentId);

                if ($estimateStmt->execute()) {
                    echo json_encode(['success' => true]);
                } else {
                    error_log("Execution failed: " . $estimateStmt->error);
                    echo json_encode(['success' => false, 'error' => $estimateStmt->error]);
                }

                $estimateStmt->close();
            } else {
                error_log("Execution failed: " . $updateStmt->error);
                echo json_encode(['success' => false, 'error' => $updateStmt->error]);
            }

            $updateStmt->close();
        } else {
            error_log("Part not found or inventory entry missing for appointment_id = $appointmentId, part_name = $partName");
            echo json_encode(['success' => false, 'error' => 'Part not found in inventory']);
        }

        $fetchStmt->close();
    } else {
        error_log("Invalid parameters: appointment_id = $appointmentId, part_name = $partName");
        echo json_encode(['success' => false, 'error' => 'Invalid parameters']);
    }

    $conn->close();
}
?>
