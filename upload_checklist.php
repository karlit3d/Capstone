<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['checklistFile'])) {
    // Directory where the file will be uploaded
    $targetDir = "uploads/";

    // Ensure the upload directory exists
    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0755, true);
    }

    $fileName = basename($_FILES["checklistFile"]["name"]);
    
    // Sanitize the file name
    $fileName = preg_replace("/[^a-zA-Z0-9\._-]/", "_", $fileName);
    
    $targetFilePath = $targetDir . $fileName;

    // Allowed file types
    $allowedTypes = ['pdf', 'docx', 'xlsx', 'txt'];
    $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);

    // Validate file type
    if (!in_array($fileType, $allowedTypes)) {
        echo json_encode(['success' => false, 'message' => 'Invalid file type.']);
        exit;
    }

    // Move the uploaded file to the target directory
    if (move_uploaded_file($_FILES["checklistFile"]["tmp_name"], $targetFilePath)) {
        // Database connection
        $conn = new mysqli("localhost", "root", "", "agtechdb");

        // Check for connection errors
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Query to find the most recent appointment with status "past"
        $sql = "
                SELECT aa.appointment_id 
                FROM admin_appointments aa
                JOIN appointments a ON aa.appointment_id = a.id
                WHERE aa.status = 'past'
                ORDER BY a.appointment_date DESC
                LIMIT 1
            ";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $appointmentId = $row['appointment_id'];  // Get the appointment ID of the most recent "past" appointment

            // Insert file details into the checklist_uploads table and associate with the appointment
            $stmt = $conn->prepare("INSERT INTO checklist_uploads (appointment_id, file_name, file_path, uploaded_at) VALUES (?, ?, ?, NOW())");
            $stmt->bind_param("iss", $appointmentId, $fileName, $targetFilePath);

            if ($stmt->execute()) {
                // Construct the link to access the uploaded checklist
                $fileLink = "http://" . $_SERVER['HTTP_HOST'] . "/" . $targetFilePath;

                // Return success response with the image URL and link
                echo json_encode([
                    'success' => true,
                    'imageUrl' => $targetFilePath,
                    'fileLink' => $fileLink // Add this line to return the file link
                ]);
            } else {
                // Return failure response
                echo json_encode(['success' => false, 'message' => 'Database insertion failed.']);
            }
 
            $stmt->close();
        } else {
            // No appointment found with status "past"
            echo json_encode(['success' => false, 'message' => 'No past appointments found.']);
        }

        $conn->close();
    } else {
        // File upload failed
        echo json_encode(['success' => false, 'message' => 'Failed to move uploaded file.']);
    }
} else {
    // No file uploaded
    echo json_encode(['success' => false, 'message' => 'No file uploaded.']);
}
?>
