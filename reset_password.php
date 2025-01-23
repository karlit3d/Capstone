<?php
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

session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $newPassword = $_POST["newPassword"];
    $confirmPassword = $_POST["confirmPassword"];
    $email = $_SESSION["email"];

    if ($newPassword !== $confirmPassword) {
        echo "Passwords do not match.";
        exit();
    }

    // Hash the new password
    $hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);

    // Update the password in the database
    $stmt = $conn->prepare("UPDATE users SET password = ? WHERE email = ?");
    $stmt->bind_param("ss", $hashedPassword, $email);

    if ($stmt->execute()) {
        echo "Password reset successful.";
        unset($_SESSION["otp"]); // Clear OTP after success
    } else {
        echo "Failed to reset password.";
    }
    $stmt->close();
}
$conn->close();
?>
