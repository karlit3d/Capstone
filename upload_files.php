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

// Display errors for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Define log file path
$logFile = 'upload_errors.log'; // Path to the log file

// Create the log file if it doesn't exist
if (!file_exists($logFile)) {
    file_put_contents($logFile, "Upload error log created on " . date('Y-m-d H:i:s') . "\n");
}

$uploadSuccess = false; // Track if any upload was successful

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Capture the uploaded files
    $token = $_POST['token'];
    $checklistDir = 'uploads/checklists/'; // Directory for checklist uploads
    $carConditionDir = 'uploads/car_conditions/'; // Directory for car condition uploads
    $allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 
                     'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
                     'application/vnd.ms-excel', 
                     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

    // Create directories if they don't exist
    if (!is_dir($checklistDir)) {
        mkdir($checklistDir, 0755, true);
    }
    if (!is_dir($carConditionDir)) {
        mkdir($carConditionDir, 0755, true);
    }

    // Debugging: Log received files
    file_put_contents($logFile, date('Y-m-d H:i:s') . " - Full _FILES array: " . print_r($_FILES, true) . "\n", FILE_APPEND);

    // Process the checklist file (first uploaded file)
    if (isset($_FILES['uploaded_files']['name'][0]) && !empty($_FILES['uploaded_files']['name'][0])) {
        $originalFileName = $_FILES['uploaded_files']['name'][0];
        $fileName = time() . "_" . $token . "_" . basename($originalFileName); // Make filename unique
        $fileType = $_FILES['uploaded_files']['type'][0];
        $filePath = $checklistDir . $fileName;

        // Check if the file type is allowed
        if (in_array($fileType, $allowedTypes)) {
            if (move_uploaded_file($_FILES['uploaded_files']['tmp_name'][0], $filePath)) {
                $sql = "INSERT INTO checklists (file_path, token) VALUES (?, ?)";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("ss", $filePath, $token);
                $stmt->execute();
                $uploadSuccess = true; // Mark upload as successful
            } else {
                $errorMessage = "Error moving checklist file to destination.";
                file_put_contents($logFile, date('Y-m-d H:i:s') . " - " . $errorMessage . "\n", FILE_APPEND);
            }
        } else {
            $errorMessage = "File type not allowed for checklist: " . $originalFileName;
            file_put_contents($logFile, date('Y-m-d H:i:s') . " - " . $errorMessage . "\n", FILE_APPEND);
        }
    }

    // Process additional files (actual car condition) starting from the second file
    for ($i = 1; $i < count($_FILES['uploaded_files']['tmp_name']); $i++) {
        if (!empty($_FILES['uploaded_files']['name'][$i])) {
            $originalFileName = $_FILES['uploaded_files']['name'][$i];
            $fileName = time() . "_" . $token . "_" . basename($originalFileName); // Make filename unique
            $fileType = $_FILES['uploaded_files']['type'][$i];
            $filePath = $carConditionDir . $fileName;

            // Check if the file type is allowed
            if (in_array($fileType, $allowedTypes)) {
                if (move_uploaded_file($_FILES['uploaded_files']['tmp_name'][$i], $filePath)) {
                    $sql = "INSERT INTO car_conditions (file_path, token) VALUES (?, ?)";
                    $stmt = $conn->prepare($sql);
                    $stmt->bind_param("ss", $filePath, $token);
                    $stmt->execute();
                    $uploadSuccess = true; // Mark upload as successful
                } else {
                    $errorMessage = "Error moving car condition file to destination.";
                    file_put_contents($logFile, date('Y-m-d H:i:s') . " - " . $errorMessage . "\n", FILE_APPEND);
                }
            } else {
                $errorMessage = "File type not allowed for car condition: " . $originalFileName;
                file_put_contents($logFile, date('Y-m-d H:i:s') . " - " . $errorMessage . "\n", FILE_APPEND);
            }
        }
    }

    // If any file was successfully uploaded, show success message and redirect
    if ($uploadSuccess) {
        echo "<script>
            alert('Upload successful');
            window.location.href = 'https://agtechnicianservices.com';
        </script>";
        exit;
    } else {
        echo "<p>File upload failed. Please try again.</p>";
    }
}

// Fetch the appointment details based on the token
$appointmentDetails = '';
if (isset($_GET['token'])) {
    $token = $_GET['token'];

    $sql = "SELECT * FROM appointments WHERE token = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $appointment = $result->fetch_assoc();
        $appointmentDetails = "
            <p>Appointment #" . htmlspecialchars($appointment['id']) . "</p>
            <p>" . ucwords(htmlspecialchars($appointment['first_name'])) . " " . ucwords(htmlspecialchars($appointment['last_name'])) . "</p>
            <p>" . ucwords(htmlspecialchars($appointment['car_brand'])) . " " . ucwords(htmlspecialchars($appointment['car_model'])) . " (" . strtoupper(htmlspecialchars($appointment['plate_number'])) . ")</p>
        ";
    } else {
        $appointmentDetails = "<p>No appointment found for this token.</p>";
    }
}

$conn->close();
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Upload Checklist</title>
    <link rel="stylesheet" href="upload_style.css">
    <script>
        function addFileInput() {
            const fileSections = document.querySelectorAll('.file-section');
            const lastFileSection = fileSections[fileSections.length - 1]; // Get the last file section
            
            const newInputDiv = document.createElement('div');
            newInputDiv.className = 'file-section';
            newInputDiv.innerHTML = `
                <label>Additional File:</label>
                <input type="file" name="uploaded_files[]" accept="image/*" capture="environment">
            `;
            
            // Insert the new input after the last file section
            lastFileSection.insertAdjacentElement('afterend', newInputDiv);
        }
    </script>
</head>
<body>
    <div class="container">
        <div class="business-info">
                        <div class="business-details">
                            <img src="initial-logo.png" alt="AG-Tech Logo" class="business-logo">
                            <div class="business-text">
                                <h2 class="business-name">AG TECHNICIAN SERVICES</h2>
                                <p class="business-address">BLK 34 LOT 13 SANTOL KANAN St. corner MULAWIN</p>
                                <p class="business-address">AMPARO VILLAGE CALOOCAN CITY</p>
                                <p class="business-contact">AG TECH - ALEX Mobile No: 09453611707</p>
                            </div>
                        </div>
                        <hr class="business-separator">
                    </div>
        <div class="header">Upload Checklist</div>
        <div class="details">
            <?php echo $appointmentDetails; ?>
        </div>

        <form action="upload_files.php" method="POST" enctype="multipart/form-data">
            <input type="hidden" name="token" value="<?php echo htmlspecialchars($token); ?>">
            
            <div id="file-section" class="file-section">
                <label for="checklist">CHECKLIST:</label>
                <input type="file" name="uploaded_files[]" accept="image/*" capture="environment" required>
            </div>

            <div class="file-section">
                <label for="car_condition">ACTUAL CAR CONDITION:</label>
                <input type="file" name="uploaded_files[]" accept="image/*" capture="environment">
            </div>

            <div class="buttons">
                <button type="button" class="add-button" onclick="addFileInput()">Add Another</button>
                <button type="submit" class="upload-button">Upload</button>
            </div>
        </form>
    </div>
</body>
</html>
