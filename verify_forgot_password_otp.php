<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "agtechdb";

// Create a database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve the OTP and email from the request
    $otp = $_POST['otp'];
    $email = $_POST['email']; // Ensure the frontend sends the email for validation

    // Verify the OTP and email combination in the database
    $query = "SELECT otp, expires_at FROM otp_codes WHERE email = ? AND otp = ? LIMIT 1";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ss", $email, $otp);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $current_time = time();

        // Check if OTP is still valid (not expired)
        if ($current_time < strtotime($row['expires_at'])) {
            echo "OTP verified";
        } else {
            echo "OTP expired";
        }
    } else {
        echo "Invalid OTP";
    }

    // Close database connection
    $stmt->close();
    $conn->close();
}
?>
