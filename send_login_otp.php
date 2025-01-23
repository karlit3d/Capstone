<?php
session_start();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

// Generate a random OTP
$otp = rand(100000, 999999);

// Store the OTP in the session for login verification
$_SESSION['login_otp'] = $otp;

// Get the user’s email based on the username, if necessary
// For example, fetch it from the database
// Replace `your_database_connection` and `your_table` with your actual values

$username = $_POST['username'];
$_SESSION['otp_expiry'] = time() + 600;

// Retrieve the email associated with this username
$conn = new mysqli("localhost", "root", "", "agtechdb");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT email FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->bind_result($email);
$stmt->fetch();
$stmt->close();
$conn->close();

if (!$email) {
    echo "Failed to retrieve email. Please try again.";
    exit;
}

// Send the OTP via email using PHPMailer
$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com'; // Set the SMTP server to send through
    $mail->SMTPAuth = true;
    $mail->Username = 'cancercancer001@gmail.com'; // SMTP username
    $mail->Password = 'bljbohynjaultepy'; // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    //Recipients
    $mail->setFrom('cancercancer001@gmail.com', 'AG TECH SERVICES');
    $mail->addAddress($email); // Add the user's email

    // Content
    $mail->isHTML(true);
    $mail->Subject = 'Your Login OTP';
    $mail->Body    = "Your OTP for login verification is <b>$otp</b>.";

    $mail->send();
    echo "OTP sent";
} catch (Exception $e) {
    echo "Failed to send OTP. Error: {$mail->ErrorInfo}";
}
?>