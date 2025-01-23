<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "agtechdb";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$token = $_GET['token'] ?? '';

// Initialize arrays to hold file paths
$checklistFilePaths = [];
$carConditionFilePaths = [];

// Fetch paths from `checklists` table
$query1 = "SELECT file_path FROM checklists WHERE token = ?";
$stmt1 = $conn->prepare($query1);
$stmt1->bind_param("s", $token);
$stmt1->execute();
$result1 = $stmt1->get_result();

while ($row = $result1->fetch_assoc()) {
    $checklistFilePaths[] = $row['file_path'];
}
$stmt1->close();

// Fetch paths from `car_conditions` table
$query2 = "SELECT file_path FROM car_conditions WHERE token = ?";
$stmt2 = $conn->prepare($query2);
$stmt2->bind_param("s", $token);
$stmt2->execute();
$result2 = $stmt2->get_result();

while ($row = $result2->fetch_assoc()) {
    $carConditionFilePaths[] = $row['file_path'];
}
$stmt2->close();

// Output JSON with all file paths
echo json_encode([
    'success' => !empty($checklistFilePaths) || !empty($carConditionFilePaths),
    'checklistFilePaths' => $checklistFilePaths,
    'carConditionFilePaths' => $carConditionFilePaths
]);

$conn->close();
?>
