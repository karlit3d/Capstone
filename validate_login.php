<?php
session_start(); // Start the session at the beginning

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

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user = $_POST["username"];
    $pass = $_POST["password"];

    // Only check for the admin account
    $stmt = $conn->prepare("SELECT password FROM users WHERE username = ?");
    $stmt->bind_param("s", $user);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if (password_verify($pass, $row['password'])) {
            $_SESSION['authenticated'] = true; // Set session variable on successful login
            $_SESSION['last_activity'] = time(); // Record the time of login for session timeout
            echo "success";
        } else {
            echo "failure"; // Incorrect password
        }
    } else {
        echo "failure"; // Username not found
    }
    $stmt->close();
}
$conn->close();
?>
