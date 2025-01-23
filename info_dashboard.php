<?php
// Database connection details
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

// Get the current date in 'YYYY-MM-DD' format
$current_date = date('Y-m-d');

// Fetch pending appointments count
$pending_sql = "SELECT COUNT(*) AS pending_count FROM admin_appointments WHERE status = 'pending'";
$pending_result = $conn->query($pending_sql);
$pending_count = $pending_result->fetch_assoc()['pending_count'];

// Fetch total inventory capital price
$inventory_sql = "SELECT SUM(capital_price * stock) AS total_inventory_value FROM inventory";
$inventory_result = $conn->query($inventory_sql);
$total_inventory_value = $inventory_result->fetch_assoc()['total_inventory_value'];

// Fetch upcoming appointments count for today
// Fetch upcoming appointments count for today (joining with the appointments table)
$upcoming_today_sql = "
    SELECT COUNT(*) AS upcoming_today_count 
    FROM admin_appointments AS a
    JOIN appointments AS appt ON a.appointment_id = appt.id 
    WHERE a.status = 'upcoming' 
    AND DATE(appt.appointment_date) = CURDATE()
";


$upcoming_today_result = $conn->query($upcoming_today_sql);
$upcoming_today_count = $upcoming_today_result->fetch_assoc()['upcoming_today_count'];

// Fetch recent updates of users who booked pending appointments
$recent_updates_sql = "
    SELECT appt.first_name, appt.last_name, appt.appointment_date 
    FROM admin_appointments AS a
    JOIN appointments AS appt ON a.appointment_id = appt.id 
    WHERE a.status = 'pending' 
    ORDER BY a.created_at DESC 
    LIMIT 5 
"; // Adjust LIMIT as needed

$recent_updates_result = $conn->query($recent_updates_sql);

function capitalizeFirstLetter($string) {
    return ucfirst(strtolower($string)); // Capitalizes first letter and makes the rest lowercase
}

$recent_updates = [];
while ($row = $recent_updates_result->fetch_assoc()) {
    $first_name = capitalizeFirstLetter($row['first_name']);
    $last_name = capitalizeFirstLetter($row['last_name']);
    $appointment_date = date('F j, Y', strtotime($row['appointment_date']));
    
    // Push structured data into the recent_updates array
    $recent_updates[] = [
        'name' => "$first_name $last_name",
        'action' => 'booked an appointment on',
        'time' => $appointment_date
    ];
}


$low_stock_sql = "
    SELECT name, stock 
    FROM inventory 
    WHERE stock <= 2
    ORDER BY stock ASC, name ASC
";
$low_stock_result = $conn->query($low_stock_sql);

$low_stock_items = [];
while ($row = $low_stock_result->fetch_assoc()) {
    // Capitalize the first letter of each word in the name
    $item_name = ucwords(strtolower($row['name'])); // Ensures all other letters are lowercase

    // Modify the output to include separate spans for the item name and stock number
    $low_stock_items[] = "<div class='update-item'>
                         <div class='update-icon'></div>
                         <p><span class='stock-name'>$item_name</span> Only 
                         <span class='stock-number'>{$row['stock']}</span> 
                         <span class='stock-left'>left</span> in stock</p>
                      </div>";

}


// Return the data as JSON 
$response = array(
    'pending_appointments' => $pending_count,
    'total_inventory_value' => $total_inventory_value,
    'upcoming_today' => $upcoming_today_count,
    'recent_updates' => $recent_updates,
    'low_stock_items' => $low_stock_items
);

echo json_encode($response);

// Close the connection
$conn->close();
?>