<?php
$password = "jigz053003"; // Replace with your actual password
$hashed_password = password_hash($password, PASSWORD_BCRYPT);
echo $hashed_password;
?>