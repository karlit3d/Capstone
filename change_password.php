<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "agtechdb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the request method is POST and the user has a verified session
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_SESSION["email"])) {
    $newPassword = $_POST["newPassword"];

    // Validate the new password (e.g., check length)
    if (strlen($newPassword) < 6) {
        echo "Password must be at least 6 characters long.";
        exit();
    }

    // Hash the new password for security
    $hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);

    // Update the password in the database
    $email = $_SESSION["email"];
    $stmt = $conn->prepare("UPDATE users SET password = ? WHERE email = ?");
    $stmt->bind_param("ss", $hashedPassword, $email);

    if ($stmt->execute()) {
        // Success: clear the OTP session and show success message
        unset($_SESSION["otp"]);
        unset($_SESSION["email"]);
        echo "Password reset successful.";
    } else {
        echo "Failed to reset password.";
    }

    $stmt->close();
} else {
    echo "Unauthorized access.";
}

$conn->close();
?>
