<?php
session_start();

$enteredOtp = trim($_POST['otp']); // Trim any extra whitespace from the entered OTP

// Check if session OTP is set and retrieve it
if (!isset($_SESSION['login_otp'])) {
    echo "Session OTP not set.";
    exit;
}

$storedOtp = trim($_SESSION['login_otp']); // Trim any extra whitespace from the stored OTP

// Debug: Confirm both OTPs after trimming and check types
echo "Entered OTP: " . var_export($enteredOtp, true) . "; Stored OTP: " . var_export($storedOtp, true) . "\n";
echo "Entered OTP type: " . gettype($enteredOtp) . "; Stored OTP type: " . gettype($storedOtp) . "\n";

// Perform strict comparison to ensure types and values match
if ($enteredOtp === $storedOtp) {
    echo "OTP verified";

    // Clear OTP after successful verification for security
    unset($_SESSION['login_otp']);
} else {
    echo "Invalid OTP";
}
?>
