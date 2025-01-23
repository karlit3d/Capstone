<?php
if (isset($_GET['token'])) {
    $token = $_GET['token'];

    // Database connection
    $conn = new mysqli("localhost", "root", "", "agtechdb");
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Fetch the appointment ID associated with the token
    $stmt = $conn->prepare("SELECT appointment_id FROM job_orders WHERE token = ?");
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $appointmentId = $row['appointment_id'];

        // Display the upload form
        echo '<form action="upload_checklist.php" method="POST" enctype="multipart/form-data">
                <input type="hidden" name="appointment_id" value="' . $appointmentId . '">
                <label for="checklistFile">Upload Checklist:</label>
                <input type="file" name="checklistFile" id="checklistFile" required>
                <button type="submit">Upload</button>
              </form>';
    } else {
        echo "Invalid token.";
    }

    $stmt->close();
    $conn->close();
} else {
    echo "No token provided.";
}
?>
