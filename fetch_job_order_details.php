<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "agtechdb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$job_order_id = $_GET['job_order_id'] ?? '';

if ($job_order_id) {
    // Updated query to fetch parts, job order, and inventory details
    $stmt = $conn->prepare("
        SELECT 
            job_order_parts.part_name, 
            job_order_parts.part_quantity, 
            job_orders.id, 
            job_orders.first_name, 
            job_orders.last_name, 
            job_orders.appointment_date,
            job_orders.service,
            job_orders.mechanic,
            job_orders.car_brand,
            job_orders.car_model,
            job_orders.year_model,
            job_orders.plate_number,
            inventory.retail_price,
            inventory.labor_cost
        FROM 
            job_order_parts 
        JOIN 
            job_orders ON job_order_parts.job_order_id = job_orders.id 
        LEFT JOIN 
            inventory ON job_order_parts.part_name = inventory.name
        WHERE 
            job_order_parts.job_order_id = ? 
            AND job_order_parts.progress = 'complete'
    ");
    $stmt->bind_param("i", $job_order_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $parts = [];
    $order_info = null;
    $total_labor_cost = 0;
    $total_amount_due = 0;

    while ($row = $result->fetch_assoc()) {
        // Store order info once as it will be the same for all parts
        if (!$order_info) {
            $order_info = [
                'id' => $row['id'],
                'first_name' => $row['first_name'],
                'last_name' => $row['last_name'],
                'appointment_date' => $row['appointment_date'],
                'service' => $row['service'],
                'mechanic' => $row['mechanic'],
                'vehicle' => $row['car_brand'] . ' ' . $row['car_model'] . ' ' . $row['year_model'] . ' (' . $row['plate_number'] . ')' // Combine vehicle details
            ];
        }

        // If the part already exists in the $parts array, accumulate its quantity and total price
        if (isset($parts[$row['part_name']])) {
            $parts[$row['part_name']]['part_quantity'] += $row['part_quantity'];
            $parts[$row['part_name']]['total_price'] += $row['part_quantity'] * $row['retail_price'];
        } else {
            // Otherwise, add it as a new entry
            $parts[$row['part_name']] = [
                'part_name' => $row['part_name'],
                'part_quantity' => $row['part_quantity'],
                'retail_price' => $row['retail_price'],
                'total_price' => $row['part_quantity'] * $row['retail_price'], // Include total price for each part
                'labor_cost' => $row['labor_cost']
            ];
        }

        // Accumulate the labor cost for each part
        $total_labor_cost += $row['labor_cost'];
    }

    // Calculate the total amount due by summing up all total prices of parts
    foreach ($parts as $part) {
        $total_amount_due += $part['total_price'];
    }

    // Calculate the grand total
    $grand_total = $total_amount_due + $total_labor_cost;

    // Output JSON response with order info, grouped parts details, total labor cost, total amount due, and grand total
    echo json_encode([
        'order_info' => $order_info,
        'parts' => array_values($parts), // Reset array keys for JSON output
        'total_labor_cost' => $total_labor_cost,
        'total_amount_due' => $total_amount_due,
        'grand_total' => $grand_total
    ]);
} else {
    echo json_encode(['error' => 'No job_order_id provided']);
}

$conn->close();
?>
