<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Manually include PHPMailer files
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

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

header('Content-Type: application/json'); // Set response as JSON

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];

    // Check if the email exists in the database
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Generate a random 6-digit OTP
        $otp = rand(100000, 999999);

        // Save the OTP in the session
        session_start();
        $_SESSION["otp"] = $otp;
        $_SESSION["email"] = $email;

        // Send OTP to email
        $mail = new PHPMailer(true);

        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'cancercancer001@gmail.com';
            $mail->Password = 'bljbohynjaultepy';
            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;

            $mail->setFrom('cancercancer001@gmail.com', 'AG TECHNICIAN SERVICES');
            $mail->addAddress($email);

            $mail->isHTML(true);
            $mail->Subject = 'Your OTP Code';
            $mail->Body    = "Your OTP code is <b>$otp</b>. Please use this to reset your password.";

            $mail->send();
            echo json_encode(["status" => "success", "message" => "OTP sent successfully."]);
        } catch (Exception $e) {
            echo json_encode(["status" => "error", "message" => "Failed to send OTP. Mailer Error: {$mail->ErrorInfo}"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Incorrect Email."]);
    }
    $stmt->close();
}
$conn->close();
?>
