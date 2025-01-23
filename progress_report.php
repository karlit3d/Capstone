<?php
date_default_timezone_set('Asia/Manila'); // Set timezone to Manila

// Prevent caching of the response
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Expires: Thu, 01 Jan 1970 00:00:00 GMT");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "agtechdb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the token from the URL
$token = $_GET['token'];

// Query to fetch job order details using the token
$query = "SELECT id, service, mechanic, appointment_date, estimate_completion, actual_completion_date, first_name, last_name 
          FROM job_orders WHERE token = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param('s', $token);
$stmt->execute();
$result = $stmt->get_result();

// Check if job order exists
if ($result->num_rows > 0) {
    $jobOrder = $result->fetch_assoc();
    
 // Check if actual completion date is set and calculate if 5 minutes have passed
    if (!is_null($jobOrder['actual_completion_date'])) {
        $currentDate = new DateTime();
        $completionDate = new DateTime($jobOrder['actual_completion_date']);

           // Add 5 minutes to the actual completion date to calculate the expiration time
           $expirationTime = clone $completionDate;
           $expirationTime->modify('+1000 minutes');

       // Check if the current time is past the expiration time
       if ($currentDate > $expirationTime) {
            echo '
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Progress Report Expired</title>
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                        height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                    }
                    .expired-message {
                        text-align: center;
                        padding: 20px;
                        background-color: #f8d7da;
                        color: #721c24;
                        border: 1px solid #f5c6cb;
                        border-radius: 8px;
                        width: 80%;
                        max-width: 500px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }
                    .expired-message h1 {
                        font-size: 24px;
                        margin-bottom: 10px;
                    }
                    .expired-message p {
                        font-size: 16px;
                        margin: 10px 0;
                    }
                    .support-button {
                        display: inline-block;
                        background-color: #3f51b5;
                        color: white;
                        padding: 10px 20px;
                        text-decoration: none;
                        border-radius: 5px;
                        margin-top: 15px;
                    }
                    .support-button:hover {
                        background-color: #5c6bc0;
                    }
                </style>
            </head>
            <body>
                <div class="expired-message">
                    <h1>Progress Report Link Expired</h1>
                    <p>This progress report link has expired and is no longer accessible.</p>
                    <p>If you believe this is a mistake, please contact our support team.</p>
                    <a href="mailto:support@example.com" class="support-button">Contact Support</a>
                </div>
            </body>
            </html>
            ';
            exit;
        }
    }

    // Fetch parts used for this job order including days_to_deliver
    $partsQuery = "SELECT part_name, part_quantity, progress, availability, days_to_deliver 
                   FROM job_order_parts WHERE job_order_id = ?";
    $partsStmt = $conn->prepare($partsQuery);
    $partsStmt->bind_param('i', $jobOrder['id']);
    $partsStmt->execute();
    $partsResult = $partsStmt->get_result();

    $partsUsed = [];
    while ($part = $partsResult->fetch_assoc()) {
        $partsUsed[] = $part;
    }
} else {
    echo "Invalid token or job order not found.";
    exit;
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="icon" href="initial-logo.png" type="image/x-icon">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Progress Report</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="progress_report.css"> <!-- Include your CSS file -->
</head>
<body>
    <div class="logo-text">
        <span class="logo-ag">AG</span><span class="logo-tech">TECH</span>
    </div>

    <div class="Title">
        <h5>Progress Report</h5>
    </div>
    
    <div class="container">
    <!-- Left Column -->
    <div class="container-left">
    <div class="progress-header">
            <div class="icon-text">
                <i class="fas fa-id-badge"></i>
                <p><span class="bold-label">ID #<span><?php echo $jobOrder['id']; ?></p>
            </div>
            <h1><?php echo $jobOrder['first_name'] . " " . $jobOrder['last_name']; ?></h1>
            <div class="icon-text">
                <i class="fas fa-cogs"></i>
                <p><span class="bold-label">Service:</span> <?php echo $jobOrder['service']; ?></p>
            </div>
            <div class="icon-text">
                <i class="fas fa-user-cog"></i>
                <p><span class="bold-label">Mechanic:</span> <?php echo $jobOrder['mechanic']; ?></p>
            </div>
            <div class="icon-text">
                <i class="fas fa-calendar-check"></i>
                <p><span class="bold-label">Estimated Completion Date:</span> <?php echo $jobOrder['estimate_completion']; ?></p>
            </div>
        </div>
       
    
     <!-- Right Column -->
     <div class="container-right">
        
 <!-- Horizontal Progress Section -->
 <div class="horizontal-progress">
    <!-- Pending Button -->
    <div class="progress-item">
        <button id="pendingButton" class="step-button pending">
            <div class="icon">
                <i class="fas fa-check"></i>
            </div>
            <p>Pending</p>
        </button>
        <div class="status-line pending-line"></div>
    </div>

    <!-- In Progress Button -->
    <div class="progress-item">
        <button id="inProgressButton" class="step-button in-progress">
            <div class="icon">
                <i class="fas fa-spinner"></i>
            </div>
            <p>In Progress</p>
        </button>
        <div class="status-line in-progress-line"></div>
    </div>

    <!-- Completed Button -->
    <div class="progress-item">
        <button id="completedButton" class="step-button completed">
            <div class="icon">
                <i class="far fa-circle"></i>
            </div>
            <p>Completed</p>
        </button>
    </div>
</div>



</div>
<div id="progressSections">

            <?php
    
// Pending Parts Section
$pendingQuery = "SELECT part_name, progress 
                 FROM job_order_parts 
                 WHERE job_order_id = ? AND progress = 'pending'
                 ORDER BY part_name ASC";
$pendingStmt = $conn->prepare($pendingQuery);
$pendingStmt->bind_param('i', $jobOrder['id']);
$pendingStmt->execute();
$pendingResult = $pendingStmt->get_result();

echo "<div id='pendingSection' class='progress-section'>
        <h4>Pending Items</h4>
        <ul>";
if ($pendingResult->num_rows > 0) {
    while ($row = $pendingResult->fetch_assoc()) {
        echo "
            <li>
                <div class='timeline-content'>
                    {$row['part_name']} is still on delivery
                </div>
            </li>";
    }
} else {
    echo "
        <li>
            <div class='timeline-content'>
                No pending items
            </div>
        </li>";
}
echo "</ul>
    </div>";
$pendingStmt->close();

// In Progress Parts Section
$inProgressQuery = "SELECT part_name, progress 
                    FROM job_order_parts 
                    WHERE job_order_id = ? AND progress = 'in progress'
                    ORDER BY part_name ASC";
$inProgressStmt = $conn->prepare($inProgressQuery);
$inProgressStmt->bind_param('i', $jobOrder['id']);
$inProgressStmt->execute();
$inProgressResult = $inProgressStmt->get_result();

echo "<div id='inProgressSection' class='progress-section'>
        <h4>In Progress Vehicle Parts</h4>
        <ul>";
if ($inProgressResult->num_rows > 0) {
    while ($row = $inProgressResult->fetch_assoc()) {
        echo "
            <li>
                <div class='timeline-content in-progress-item'>
                    {$row['part_name']} is still in progress
                </div>
            </li>";
    }
} else {
    echo "
        <li>
            <div class='timeline-content'>
                No parts are currently in progress
            </div>
        </li>";
}
echo "</ul>
    </div>";

$inProgressStmt->close();

echo "<div id='completedSection' class='progress-section'>
        <h4>Progress Timeline</h4>
        <ul class='timeline'>";

// Query for completed and canceled parts
$timelineQuery = "SELECT part_name, progress, completion_time 
                  FROM job_order_parts 
                  WHERE job_order_id = ? AND (progress = 'complete' OR progress = 'cancelled')
                  ORDER BY completion_time DESC"; // Newest first
$timelineStmt = $conn->prepare($timelineQuery);
$timelineStmt->bind_param('i', $jobOrder['id']);
$timelineStmt->execute();
$timelineResult = $timelineStmt->get_result();

$isFirst = true;

if ($timelineResult->num_rows > 0) {
    while ($row = $timelineResult->fetch_assoc()) {
        // Ensure proper handling of progress values
        $progress = strtolower(trim($row['progress']));
        $status = $progress === 'complete' ? 'Completed' : 'Cancelled';
        $circleClass = $isFirst ? 'green-circle' : ($progress === 'complete' ? 'blue-circle' : 'red-circle');
        $contentClass = $progress === 'complete' ? 'completed-item' : 'cancelled-item'; // Add class for content styling
    
        // Generate timeline item
        echo "
            <li>
                <div class='timeline-point $circleClass'></div>
                <div class='timeline-time'>" . date("M d h:i A", strtotime($row['completion_time'])) . "</div>
                <div class='timeline-content $contentClass'>{$row['part_name']} is $status</div>
            </li>";
        $isFirst = false;
    }
    
} else {
    // No entries fallback
// No need for conditional logic for the circle class
echo "
<li>
    <div class='timeline-point'></div>
    <div class='timeline-time'>" . date("M d h:i A", strtotime($row['completion_time'])) . "</div>
    <div class='timeline-content'>{$row['part_name']} is {$status}</div>
</li>";

}

echo "</ul></div>";

$timelineStmt->close();



            ?>
        </ul>
    </div>
    </div>

    </div>
</div>
</div>



    <!-- Separator Line and Footer Section -->
    <hr class="business-separator">
    <div class="reminder">
        <p><strong>Reminder:</strong> Please contact AG Technician Services for further assistance on your vehicle's progress.</p>
        <p><strong>Contact Number:</strong> 09453611707</p>
    </div>
    <!-- JavaScript Code -->
    <script>
        document.addEventListener('DOMContentLoaded', function () {
    const pendingButton = document.getElementById('pendingButton');
    const inProgressButton = document.getElementById('inProgressButton');
    const completedButton = document.getElementById('completedButton');

    const pendingSection = document.getElementById('pendingSection');
    const inProgressSection = document.getElementById('inProgressSection');
    const completedSection = document.getElementById('completedSection');

    pendingButton.addEventListener('click', function () {
        pendingSection.style.display = 'block';
        inProgressSection.style.display = 'none';
        completedSection.style.display = 'none';
    });

    inProgressButton.addEventListener('click', function () {
        pendingSection.style.display = 'none';
        inProgressSection.style.display = 'block';
        completedSection.style.display = 'none';
    });

    completedButton.addEventListener('click', function () {
        pendingSection.style.display = 'none';
        inProgressSection.style.display = 'none';
        completedSection.style.display = 'block';
    });

    // Default to Pending section
    pendingButton.click();
    const buttons = document.querySelectorAll(".step-button");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            // Remove selected class from all buttons
            buttons.forEach((btn) => btn.classList.remove("selected"));

            // Add selected class to the clicked button
            button.classList.add("selected");
        });
    });

});



</script>

</body>
</html>

    
<?php
$partsStmt->close();
$stmt->close();
$conn->close();
?>
