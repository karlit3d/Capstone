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

$data = json_decode(file_get_contents("php://input"), true);
$mechanicId = $data['mechanic_id'];

// Validate input
if (isset($mechanicId)) {
    // Start a transaction
    $conn->begin_transaction();

    try {
        // First, delete the mechanic's schedule from the mechanic_schedule table
        $stmt1 = $conn->prepare("DELETE FROM mechanic_schedule WHERE mechanic_id = ?");
        $stmt1->bind_param("i", $mechanicId);
        if (!$stmt1->execute()) {
            throw new Exception("Error deleting mechanic schedule.");
        }
        $stmt1->close();

        // Then, delete the mechanic from the mechanics table
        $stmt2 = $conn->prepare("DELETE FROM mechanics WHERE id = ?");
        $stmt2->bind_param("i", $mechanicId);
        if (!$stmt2->execute()) {
            throw new Exception("Error deleting mechanic.");
        }
        $stmt2->close();

        // Commit the transaction
        $conn->commit();
        echo json_encode(["status" => "success"]);
    } catch (Exception $e) {
        // Rollback the transaction in case of an error
        $conn->rollback();
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid mechanic ID."]);
}

$conn->close();
?>
