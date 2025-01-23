<?php
// Database connection
$servername = "localhost";
$username = "root"; // replace with your MySQL username
$password = ""; // replace with your MySQL password
$dbname = "agtechdb";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    logCustomError("Database connection failed: " . $conn->connect_error);
    die("Connection failed: " . $conn->connect_error);
}

// Function to log custom error messages
function logCustomError($message) {
    $logFilePath = __DIR__ . '/error_log.txt'; // This will create the log file in the same directory as this PHP script

    // Check if the log file exists, create it if not
    if (!file_exists($logFilePath)) {
        file_put_contents($logFilePath, "Log created on: " . date("Y-m-d H:i:s") . "\n", FILE_APPEND);
    }

    // Append the custom error message to the log file
    $logMessage = "[" . date("Y-m-d H:i:s") . "] " . $message . "\n";
    file_put_contents($logFilePath, $logMessage, FILE_APPEND);
}

// Function to generate a secure token
function generateToken($length = 32) {
    return bin2hex(random_bytes($length / 2)); // Generates a secure token
}

// Capture form data
$first_name = ucfirst(strtolower($_POST['first-name']));
$last_name = ucfirst(strtolower($_POST['last-name']));
$contact_number = $_POST['contact-number'];
$plate_number = $_POST['plate-number'];
$car_brand = $_POST['car-brand'];
$car_model = $_POST['car-model'];
$car_year = $_POST['car-year'];
$services = implode(", ", $_POST['services']); // Multiple services can be selected
$appointment_date = $_POST['appointment_date'];
$appointment_time = $_POST['appointment_time'];
$mechanic = isset($_POST['mechanic']) && !empty($_POST['mechanic']) ? $_POST['mechanic'] : null;  // Optional mechanic selection


// Convert the appointment date to a day of the week
$day_of_week = date('l', strtotime($appointment_date)); // 'l' returns full name of the day (e.g., Monday)

if ($mechanic) {
    // If a mechanic is selected, check if the selected mechanic is available on that day of the week
    $sql_mechanic_check = "
        SELECT COUNT(*) as availability_count 
        FROM mechanic_schedule ms
        JOIN mechanics m ON ms.mechanic_id = m.id
        WHERE m.name = ? AND ms.day_of_week = ?
    ";

    $stmt_mechanic_check = $conn->prepare($sql_mechanic_check);
    $stmt_mechanic_check->bind_param("ss", $mechanic, $day_of_week);
    if (!$stmt_mechanic_check->execute()) {
        logCustomError("Error executing mechanic availability check: " . $stmt_mechanic_check->error);
    }
    $result_mechanic_check = $stmt_mechanic_check->get_result();
    $row_mechanic_check = $result_mechanic_check->fetch_assoc();

    if ($row_mechanic_check['availability_count'] == 0) {
        $message = "The selected mechanic is not available on " . $day_of_week . ". Please choose another mechanic or day.";
        logCustomError($message);
        echo $message;
        exit; // Stop further processing if the mechanic is not available
    }
} else {
    // If no mechanic is chosen, find an available one for the selected day and time
    $sql_available_mechanics = "
        SELECT m.name 
        FROM mechanics m
        JOIN mechanic_schedule ms ON m.id = ms.mechanic_id
        WHERE ms.day_of_week = ? 
        AND m.name NOT IN (
            SELECT mechanic 
            FROM appointments 
            WHERE appointment_date = ? AND appointment_time = ?
        )
    ";

    $stmt_available_mechanics = $conn->prepare($sql_available_mechanics);
    $stmt_available_mechanics->bind_param("sss", $day_of_week, $appointment_date, $appointment_time);
    if (!$stmt_available_mechanics->execute()) {
        logCustomError("Error executing available mechanics query: " . $stmt_available_mechanics->error);
    }
    $result_available_mechanics = $stmt_available_mechanics->get_result();

    if ($result_available_mechanics->num_rows > 0) {
        $row = $result_available_mechanics->fetch_assoc();
        $mechanic = $row['name']; // Assign the first available mechanic
    } else {
        $message = "No mechanics are available for the selected date and time.";
        logCustomError($message);
        echo $message;
        exit; // Stop further processing if no mechanic is available
    }
}

// Check how many times the selected time slot has been booked
$sql_check = "SELECT COUNT(*) as booking_count FROM appointments WHERE appointment_date = ? AND appointment_time = ?";
$stmt_check = $conn->prepare($sql_check);
$stmt_check->bind_param("ss", $appointment_date, $appointment_time);
if (!$stmt_check->execute()) {
    logCustomError("Error executing time slot check: " . $stmt_check->error);
}
$result_check = $stmt_check->get_result();
$row_check = $result_check->fetch_assoc();

if ($row_check['booking_count'] >= 3) {
    $message = "This time slot has already been fully booked. Please select another time slot.";
    logCustomError($message);
    echo $message;
} else {
    // Time slot and mechanic availability confirmed (or mechanic auto-assigned), proceed to book the appointment

    // Generate a token for the appointment
    $token = generateToken();

    $sql_insert = "INSERT INTO appointments (first_name, last_name, contact_number, plate_number, car_brand, car_model, car_year, services, appointment_date, appointment_time, mechanic, token)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt_insert = $conn->prepare($sql_insert);
    $stmt_insert->bind_param("ssssssssssss", $first_name, $last_name, $contact_number, $plate_number, $car_brand, $car_model, $car_year, $services, $appointment_date, $appointment_time, $mechanic, $token);

    if ($stmt_insert->execute()) {
        // Get the last inserted appointment ID
        $appointment_id = $conn->insert_id;

        // Now insert into the admin_appointments table with default 'pending' status
        $sql_admin_insert = "INSERT INTO admin_appointments (appointment_id, status) VALUES (?, 'pending')";
        $stmt_admin_insert = $conn->prepare($sql_admin_insert);
        $stmt_admin_insert->bind_param("i", $appointment_id);

        if ($stmt_admin_insert->execute()) {
            // Send SMS using Semaphore API
            $api_key = '0901b5f50bbad1d3c4bd751080c3848d'; // Replace with your Semaphore API key
            $sender_name = 'SEMAPHORE'; // Optional, if you have a registered sender name

            // Construct the SMS message
            $message = "Hello $first_name $last_name, your appointment for $appointment_date has been processed. Please wait for the confirmation of your booking. Looking forward to giving you our quality service.";

            // Prepare the data for the Semaphore API
            $semaphore_api_url = "https://api.semaphore.co/api/v4/messages";
            $sms_data = [
                'apikey' => $api_key,
                'number' => $contact_number,
                'message' => $message,
                'sendername' => $sender_name
            ];

            // Send the SMS using cURL
            $ch = curl_init($semaphore_api_url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($sms_data));
            $response = curl_exec($ch);

            if ($response === false) {
                $error = "Error sending SMS: " . curl_error($ch);
                logCustomError($error);
                echo $error;
            } else {
                // Decode response to check for success or failure
                $response_data = json_decode($response, true);
                if (isset($response_data['status']) && $response_data['status'] == 'success') {
                    $status = 'sent';
                } else {
                    $status = 'failed';
                    logCustomError("Failed to send SMS. Response: " . json_encode($response_data));
                }

                // Log the SMS in the `sms_logs` table with the `type` column
                $sql_log_sms = "INSERT INTO sms_logs (appointment_id, contact_number, message, status, type) VALUES (?, ?, ?, ?, ?)";

                $type = "booking"; // Set the type to "booking"

                $stmt_log_sms = $conn->prepare($sql_log_sms);
                $stmt_log_sms->bind_param("issss", $appointment_id, $contact_number, $message, $status, $type);

                if (!$stmt_log_sms->execute()) {
                    logCustomError("Error logging SMS: " . $stmt_log_sms->error);
                    echo "Error logging SMS: " . $stmt_log_sms->error;
                } else {
                    echo "SMS sent and logged successfully.";
                }

            }

            curl_close($ch);

            // Redirect the user to the homepage
            header("Location: homepage.html");
            exit; // Ensure no further processing happens
        } else {
            logCustomError("Error adding to admin panel: " . $stmt_admin_insert->error);
            echo "Error adding to admin panel: " . $stmt_admin_insert->error;
        }
    } else {
        logCustomError("Error inserting into appointments: " . $stmt_insert->error);
        echo "Error: " . $stmt_insert->error;
    }
}

// Close the connection
$conn->close();
?>
