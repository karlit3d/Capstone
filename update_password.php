<?php
// Database connection
$conn = new mysqli("localhost", "root", "", "agtechdb");

// Check connection
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]);
    exit;
}

// Retrieve data from the JSON request
$data = json_decode(file_get_contents("php://input"), true);
$currentPassword = $data['currentPassword'];
$newPassword = $data['newPassword'];

// Assume there's only one user, so we fetch the existing password
$sql = "SELECT password FROM users LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();

    // Check if the current password is correct
    if (password_verify($currentPassword, $row['password'])) {
        // Hash the new password
        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

        // Update the password in the database
        $updateSql = "UPDATE users SET password='$hashedPassword' LIMIT 1";

        if ($conn->query($updateSql) === TRUE) {
            echo json_encode(["status" => "success", "message" => "Password changed successfully."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error updating password."]);
        }
    } else {
        // Send a specific error message for incorrect current password
        echo json_encode(["status" => "error", "message" => "Current password is incorrect"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "User not found"]);
}

$conn->close();
?>
