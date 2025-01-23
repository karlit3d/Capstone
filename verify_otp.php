<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userOtp = $_POST["otp"];

    // Check if OTP matches
    if ($userOtp == $_SESSION["otp"]) {
        echo "OTP verified";
    } else {
        echo "Invalid OTP";
    }
}
?>
