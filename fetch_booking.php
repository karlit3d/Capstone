<?php
// Database connection
$servername = "localhost";
$username = "root"; // replace with your MySQL username
$password = ""; // replace with your MySQL password
$dbname = "agtechdb";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Maximum bookings allowed per time slot
$maxBookingsPerSlot = 3; 
$startHour = 10;
$endHour = 16;
$totalSlots = ($endHour - $startHour) / 2 + 1; // Assuming 2-hour intervals

// Check if 'date' parameter is present
if (isset($_GET['date'])) {
    $appointment_date = $_GET['date'];

    // Fetch booking counts for the selected date
    $sql = "SELECT appointment_time, COUNT(*) as booking_count FROM appointments WHERE appointment_date = ? GROUP BY appointment_time";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $appointment_date);
    $stmt->execute();
    $result = $stmt->get_result();

    $slotCounts = [];
    while ($row = $result->fetch_assoc()) {
        $slotCounts[$row['appointment_time']] = $row['booking_count'];
    }

    // Return the booking counts for the specific date as a JSON object
    header('Content-Type: application/json');
    echo json_encode(['slotCounts' => $slotCounts]);

// Check if 'month' parameter is present (for fetching fully booked dates)
} elseif (isset($_GET['month'])) {
    $appointment_month = $_GET['month'] . '%'; // Format to match all dates in the month

    // Fetch booking counts for the entire month
    $sql = "SELECT appointment_date, appointment_time, COUNT(*) as booking_count 
            FROM appointments 
            WHERE appointment_date LIKE ? 
            GROUP BY appointment_date, appointment_time";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $appointment_month);
    $stmt->execute();
    $result = $stmt->get_result();

    $fullyBookedDates = [];
    $dateSlotCounts = [];

    // Initialize counts for each date in the month
    while ($row = $result->fetch_assoc()) {
        $date = $row['appointment_date'];
        if (!isset($dateSlotCounts[$date])) {
            $dateSlotCounts[$date] = 0;
        }
        if ($row['booking_count'] >= $maxBookingsPerSlot) {
            $dateSlotCounts[$date]++;
        }

        // If all slots for the date are fully booked, mark it as fully booked
        if ($dateSlotCounts[$date] >= $totalSlots) {
            $fullyBookedDates[] = $date;
        }
    }

    // Return the fully booked dates as a JSON object
    header('Content-Type: application/json');
    echo json_encode(['fullyBookedDates' => $fullyBookedDates]);

} else {
    // If neither 'date' nor 'month' is provided, return empty data
    header('Content-Type: application/json');
    echo json_encode(['slotCounts' => [], 'fullyBookedDates' => []]);
}

$conn->close();
?>
