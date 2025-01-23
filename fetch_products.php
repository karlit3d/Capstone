<?php
include 'inventory.php'; // Ensure this file contains the connection logic to the database

// Initialize arrays to hold your products, categories, and brands
$products = array();
$categories = array();
$brands = array(); // Initialize an array for brands

// Prepare the base SQL query
$sql = "SELECT id, name, brand, category, status, type, stock, retail_price, capital_price, labor_cost, item_by, days_to_deliver, estimate_completion_days, estimate_completion_hours FROM inventory WHERE 1=1"; // Added labor_cost, days_to_deliver, and estimate completion fields

// Get filter parameters from the request
$category = isset($_GET['category']) ? $_GET['category'] : 'all';
$brand = isset($_GET['brand']) ? $_GET['brand'] : 'all'; // Get brand filter
$type = isset($_GET['type']) ? $_GET['type'] : 'all';

// Add category filter if not 'all'
if ($category !== 'all') {
    $sql .= " AND category = '" . $conn->real_escape_string($category) . "'";
}

// Add brand filter if not 'all'
if ($brand !== 'all') {
    $sql .= " AND brand = '" . $conn->real_escape_string($brand) . "'";
}

// Add type filter if not 'all'
if ($type !== 'all') {
    $sql .= " AND type = '" . $conn->real_escape_string($type) . "'";
}

// Execute the query
$result = $conn->query($sql);

// Check if there are results and fetch them
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;

        // Add the category to the categories array if it's not already there
        if (!in_array($row['category'], $categories)) {
            $categories[] = $row['category'];
        }

        // Add the brand to the brands array if it's not already there
        if (!in_array($row['brand'], $brands)) {
            $brands[] = $row['brand'];
        }
    }
}

// Sort the categories and brands arrays alphabetically
sort($categories);
sort($brands);

// Return the results as JSON, including products, categories, and brands
header('Content-Type: application/json');
echo json_encode([
    'products' => $products, 
    'categories' => $categories, 
    'brands' => $brands
]); // Include completion_days and completion_hours in products

// Close the database connection
$conn->close();
?>
