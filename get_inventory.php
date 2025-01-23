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

$searchTerm = isset($_GET['term']) ? $_GET['term'] : '';

// Updated SQL query to fetch name, stock, status, inProgress, days_to_deliver, 
// estimate_completion_days, and estimate_completion_hours
$sql = "
    SELECT i.name, i.stock, i.status, i.days_to_deliver, 
           i.estimate_completion_days, i.estimate_completion_hours,
           COALESCE(SUM(jop.part_quantity), 0) AS inProgress 
    FROM inventory i
    LEFT JOIN job_order_parts jop ON i.name = jop.part_name AND jop.progress = 'in progress'
    WHERE i.name LIKE '%$searchTerm%'
    GROUP BY i.name, i.stock, i.status, i.days_to_deliver, i.estimate_completion_days, i.estimate_completion_hours
";

$result = $conn->query($sql);

$parts = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $parts[] = [
            'name' => $row['name'],
            'stock' => (int)$row['stock'],  // Include stock information in the response
            'status' => $row['status'],    // Include status information in the response
            'days_to_deliver' => (int)$row['days_to_deliver'],  // Include days_to_deliver
            'estimate_completion_days' => (int)$row['estimate_completion_days'], // Include estimate_completion_days
            'estimate_completion_hours' => (int)$row['estimate_completion_hours'], // Include estimate_completion_hours
            'inProgress' => (int)$row['inProgress']            // Include "in progress" count
        ];
    }
}

echo json_encode($parts);
$conn->close();
?>
