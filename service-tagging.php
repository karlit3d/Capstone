<?php
session_start();
if (!isset($_SESSION['authenticated']) || $_SESSION['authenticated'] !== true) {
    header('Location: login.html'); // Redirect to login page if not authenticated
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Service-Tagging</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="service-tagging.css">
</head>
<body>
<!-- Header from admin-inventory.html -->
    <div class="header">
        <div class="header-left">
            <h1>AG</h1>
            <h2>TECH</h2>
            <div class="nav-links">
                <a href="admin-dashboard.php" class="nav-item">Dashboard</a>
                <a href="admin-inventory.php" class="nav-item">Inventory</a>
                <a href="admin-appointment.php" class="nav-item">Appointment</a>
                <a href="service-tagging.php" class="nav-item active">Service Tagging</a>
            </div>
        </div>
        <div class="header-right">
            <p>Hey, Admin</p>
            <div class="profile-pic"></div>
        </div>
    </div>

    <!-- Heading Section -->
    <section class="booking-header">
        <h1>Service-Tagging</h1>
        <p class="subheading">Service Records and History</p>
    </section>

    <!-- Tabs inside a gray container -->
    <div class="tab-container">
        <div class="tabs">
            <button class="tab active" data-tab="ticketing">Ticketing</button>
            <button class="tab" data-tab="service-history">Service History</button>
        </div>
    </div>
  
    <!-- Create Ticket Button moved outside the tab container -->
    <button id="create-ticket-btn" class="create-ticket-btn">Create Ticket</button>

    <input type="text" id="service-history-search" placeholder="Search by name..." oninput="renderServiceHistory()" style="display: none;">
    <div id="service-history-list"></div>



    <!-- Create Ticket Popup -->
    <!-- Create Ticket Popup -->
    <div id="create-ticket-popup" class="popup hidden">
        <div class="popup-content">
            <h3>Create a Walk - In Customer Ticket</h3>
            <form id="createTicketForm">
                <!-- First Name and Last Name -->
                <div class="form-row">
                    <div class="half-width">
                        <label for="firstName">First Name:</label>
                        <input type="text" id="firstName" name="firstName" required>
                    </div>
                    <div class="half-width">
                        <label for="lastName">Last Name:</label>
                        <input type="text" id="lastName" name="lastName" required>
                    </div>
                </div>
                
                <!-- Appointment Date and Time -->
                <div class="form-row">
                    <div class="half-width">
                        <label for="appointmentDate">Appointment Date:</label>
                        <input type="date" id="appointmentDate" name="appointmentDate" required>
                    </div>
                    <div class="half-width">
                        <label for="appointmentTime">Appointment Time:</label>
                        <input type="time" id="appointmentTime" name="appointmentTime" required>
                    </div>
                </div>

                <!-- Car Brand, Car Model, and Car Year -->
                <div class="form-row">
                    <div class="third-width">
                        <label for="carBrand">Car Brand:</label>
                        <input type="text" id="carBrand" name="carBrand" required>
                    </div>
                    <div class="third-width">
                        <label for="carModel">Car Model:</label>
                        <input type="text" id="carModel" name="carModel" required>
                    </div>
                    <div class="third-width">
                        <label for="carYear">Car Year:</label>
                        <input type="text" id="carYear" name="carYear" required>
                    </div>
                </div>

                <!-- Plate Number and Contact Number -->
                <div class="form-row">
                    <div class="half-width">
                        <label for="plateNumber">Plate Number:</label>
                        <input type="text" id="plateNumber" name="plateNumber" required>
                    </div>
                    <div class="half-width">
                        <label for="contactNumber">Contact Number:</label>
                        <input type="text" id="contactNumber" name="contactNumber" placeholder="(63)" required>
                    </div>
                </div>

                <!-- Service and Mechanic -->
                <label for="services">Service:</label>
                <input type="text" id="services" name="services" required>

                <label for="mechanic">Mechanic:</label>
                <input type="text" id="mechanic" name="mechanic" required>

                <!-- Buttons -->
                <div class="popup-buttons">
                    <button type="button" id="close-create-ticket-popup-btn" class="close-btn">Close</button>
                    <button type="submit" class="done-btn">Create Ticket</button>
                </div>
            </form>
        </div>
    </div>
    <div id="create-ticket-overlay" class="overlay hidden"></div>



    
    <!-- Ticketing Tab -->
    <div class="tab-content active" id="ticketing">
        <div class="appointments-list" id="ticketing-list">
            <!-- Ticketing cards will be dynamically added here -->
        </div>
        <div id="ticketing-pagination-controls">
            <!-- Pagination controls will be rendered here -->
        </div>
    </div>


    <!-- Service History Tab -->
    <div class="tab-content" id="service-history">
        <div class="appointments-list" id="service-history-list">
            <!-- Service history cards will be dynamically added here -->
        </div>
        <div id="service-history-pagination-controls">
            <!-- Pagination controls will be rendered here -->
        </div>
    </div>


    <!-- Popup Modal for Edit -->
    <div id="edit-popup" class="hidden">
        <div class="popup-content">
            <ul>
                <!-- Popup content for editing tickets will be injected here -->
            </ul>
        </div>
    </div>

    <!-- Checklist Popup Modal -->
    <div id="checklist-popup" class="popup-checklist hidden">
        <div class="popup-checklist-content">
            <div id="checklist-content"></div> <!-- Where the checklist will be displayed -->
        </div>
    </div>
    
    <div id="create-job-order-popup" class="popup hidden"></div>
    <div id="overlay" class="overlay hidden"></div>

    <!-- Upload Checklist Popup Modal --> 
    <!-- Overlay specifically for the Upload Checklist popup -->
    <div id="upload-checklist-popup" class="popup-checklist hidden">
        <div class="popup-checklist-contents">
            <h3>Upload Checklist</h3>
            <div id="appointment-details">
                <!-- Appointment details will be populated here -->
            </div>

            <form id="upload-checklist-form">
                <div class="upload-section">
                    <label></label>
                    <input type="file" id="checklistFile" accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg" required>
                </div>

                <div class="upload-section">
                    <label></label>
                    <div id="car-condition-uploads">
                        <input type="file" class="car-condition-file" accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg" required>
                    </div>
                    <button id="add-car-condition-btn" type="button">Add Another Upload</button>
                </div>
    
                <div class="popup-buttons">
                    <button type="submit" class="done-bttn">Upload</button>
                    <button type="button" id="close-upload-popup-btn" class="close-btn">Close</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Overlay for the popup -->
    <div id="upload-checklist-overlay" class="overlay hidden"></div>





    <div id="progress-report-popup" class="progress-popup">
        <div class="progress-header">
            <p class="small-id"></p> <!-- Small ID goes here -->
            <h3></h3> <!-- Service name goes here -->
            <p>Date: 19 Aug 2024</p> <!-- Example Appointment Date -->
            <p>Mechanic: Alfredo Batumbakal</p> <!-- Example Mechanic -->
            <p>Name:</p>
            <p>Estimate Date of Completion:</p>
        </div>
    
        <div class="progress-content">
            <!-- In Progress Section -->
            <div class="progress-section">
                <h4>In Progress</h4>
                <ul id="in-progress-list">
                    <!-- JavaScript will populate this -->
                </ul>
            </div>
    
            <!-- Completed Section -->
            <div class="progress-section">
                <h4>Completed</h4>
                <ul id="completed-list">
                    <!-- JavaScript will populate this -->
                </ul>
            </div>
        </div>

        <div id="progressLinkContainer">
            <label for="progressLink">Progress Report Link:</label>
            <div id="inputButtonContainer">
                <input type="text" id="progressLink" readonly />
                <button id="copyLinkBtn">Copy Link</button>
                <button id="add-part-button" class="progress-add-part-btn">Add Part</button>
            </div>
        </div>
        <div id="add-part-popup" class="popup hidden">
            <div class="popup-content">
                <h3>Additional Parts</h3>

                <label for="partName">Part Name:</label>
                <input type="text" id="partName" placeholder="Enter part name" required>

                <label for="partQuantity">Quantity:</label>
                <input type="number" id="partQuantity" min="1" placeholder="Enter quantity" required>

                <label for="availableStock">Available Stock:</label>
                <input type="number" id="availableStocks" placeholder="Stock Available" readonly>
        
                <label for="daysToDeliver">Days to Deliver:</label>
                <input type="number" id="daysToDeliver" min="0" placeholder="Enter days to deliver" style="display: none;" readonly>

                <button id="add-part-to-list" class="add-button">Add</button>

                <h4>Parts Used:</h4>
                <div id="partsAddedContainer" class="parts-list">
                    <!-- Added parts will be displayed here -->
                </div>

                <div class="popup-button">
                    <button id="close-add-part-popup">Close</button>
                    <button id="save-part-button">Save</button>
                </div>
            </div>
        </div>
        <button id="close-progress-report-btn" class="close-btn">Close</button>
    </div>
    
    <div id="overlay" class="overlay"></div>

    <div class="overlay hidden"></div>
    <!-- Empty popup structure -->
    <div id="view-service-popup" class="popup hidden">
        <div class="view-popup-content">
            <button class="generate-report-btn-customer" onclick="openCustomerReportPopup()">Generate Report</button>
            <span id="close-view-service-popup" class="close-btn">&times;</span>
            <div class="popup-header">
                <div class="profile-info">
                    <h2>Carlos Yulo</h2>
                </div>
            </div>
            
            <div class="popup-section">
                <div class="basic-info">
                    <h3>Basic Information</h3>
                    <p><i class="fas fa-car"></i> Car Model: Yamaha</p>
                    <p><i class="fas fa-industry"></i> Car Brand: Toyota</p>
                    <p><i class="fas fa-id-card"></i> Plate Number: ABC 1234</p>
                    <p><i class="fas fa-calendar"></i> Year Model: 2002</p>
                    <p><i class="fas fa-phone"></i> Phone Number: +63 921 732 8235</p>
                </div>

                <div class="appointment-schedule">
                    <h3>Appointment Schedule</h3>
                    <div class="appointment">
                        <p>Appointment Date: 19 September 2024</p>
                        <p>Service: Brake Inspection</p>
                        <p>Mechanic:</p>
                    </div>
                    <div class="appointment">
                        <p>Appointment Date: 19 September 2024</p>
                        <p>Service: Brake Inspection</p>
                        <p>Mechanic:</p>
                    </div>
                </div>
            </div>

            <div class="history-of-repairs">
                <h3>History of Repairs</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Job Order ID</th>
                            <th>Type of Service</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Mechanic</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#1234</td>
                            <td>Change Oil</td>
                            <td>19 Aug 2024</td>
                            <td>11:00 PM</td>
                            <td>Alfredo Batumbakal</td>
                            <td>
                            
                            </td>
                        </tr>
                        <!-- Repeat for additional rows -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div id="view-service-popup-overlay"></div> 
    <!-- Popup Modal Structure -->
<div id="job-order-popup" class="modal hidden">
    <div class="modal-content">
        <span id="close-job-order-popup" class="close-btn">&times;</span>
        
        <button id="print-job-order-btn" class="print-btn">Print</button>
        
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
        <div id="job-order-details"></div>
    </div>
</div>
<div id="repair-copy-popup" class="modal hidden">
    <div class="modal-content">
        <span id="close-repair-copy-popup" class="close-btn">&times;</span>
        
        <button id="print-repair-copy-btn" class="print-btn">Print</button>
        
        <div id="repair-copy-header"></div>
        <div id="repair-copy-details"></div>
    </div>
</div>

<div id="customerReportPopup" class="customer-report-popup hidden">
    <div class="customer-report-popup-content">
        <div class="customer-popup-header">
            <h2>CUSTOMER HISTORY DETAILED REPORTS</h2>
            <button class="customer-close-popup-btn" onclick="closeCustomerReportPopup()">X</button>
        </div>
        <div class="customer-popup-filters">
            <select id="customerReportTypeSelect">
                <option value="">Select Report</option>
                <option value="Maintenance">Maintenance Log</option>
                <option value="Repair">Repair History Report</option>
                <option value="Service">Detailed Repair Report</option>
            </select>
            <button id="customerGenerateReportButton" onclick="generateCustomerReport(currentPlateNumber)">Generate</button>
        </div>
        <div class="customer-report-box">
            <div class="customer-generate-report-body">
                <!-- Dynamic content for customer report will be displayed here -->
            </div>
        </div>
        <button id="customerPrintReportButton" onclick="printCustomerReport()">Print</button>
    </div>
</div>



    <div id="file-popup">
        <div id="file-popup-content"></div>
        <button id="close-file-popup-btn">x</button>
    </div>



    <div id="parts-summary-popup" class="popup hidden">
        <div class="popup-content">
            <h3>Parts Summary</h3>
            <div id="parts-summary-details">Loading job order parts...</div>
            <button id="close-summary-popup-btn" class="close-btn">Close</button>
        </div>
    </div>
    <div id="parts-summary-overlay" class="overlay hidden"></div>
    
    <div id="mechanic-technician-popup" class="mechanic-technician-overlay hidden-popup">
    <div class="mechanic-technician-content">
        <h3>Select Mechanic/Technician</h3>
        <select id="mechanic-technician-select-dropdown">
            <option value="" disabled selected>Select an option</option>
        </select>
        <div class="mechanic-technician-actions">
            <button id="mechanic-technician-submit-btn" class="mechanic-technician-btn">Submit</button>
            <button id="mechanic-technician-cancel-btn" class="mechanic-technician-btn">Cancel</button>
        </div>
    </div>
</div>


    
    <!-- Link the JavaScript file -->
    <script src="service-tagging.js"></script>
 
</body>
</html>
