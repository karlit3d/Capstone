<?php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['isLoggedIn']) && $_SESSION['isLoggedIn'] === true) {
    echo json_encode(['isAuthenticated' => true]);
} else {
    echo json_encode(['isAuthenticated' => false]);
}
?>
