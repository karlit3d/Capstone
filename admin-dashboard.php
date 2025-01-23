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
    <title>Admin Dashboard</title>
    <link rel="stylesheet" href="admin-dashboard.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">  
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="header-left">
                <h1>AG</h1>
                <h2>TECH</h2>
                <div class="nav-links">
                    <a href="admin-dashboard.php" class="nav-item active">Dashboard</a>
                    <a href="admin-inventory.php" class="nav-item">Inventory</a>
                    <a href="admin-appointment.php" class="nav-item">Appointments</a>
                    <a href="service-tagging.php" class="nav-item">Service Tagging</a>
                </div>
            </div>
            <div class="header-right">
                <p>Hey, Admin</p>
                <div class="profile-pic"></div>
                <div class="dropdown">
                <button class="dropbtn" onclick="toggleDropdown()">▼</button>
                <div class="dropdown-content" id="myDropdown">
                    <a href="javascript:void(0);" onclick="openLogoutModal()">Log Out</a>
                    <a href="javascript:void(0);" onclick="openChangePasswordModal()">Change Password</a>
                    <a href="javascript:void(0);" onclick="openMechanicScheduleModal()">Mechanic Schedule</a>
                    <a href="javascript:void(0)" onclick="openTechnicianScheduleModal()">Technician Schedule</a>
                </div>
            </div>

            <!-- Change Password Modal -->
            <div id="changePasswordModal" class="modal">
                <div class="change-pass-modal-content">
                    <span class="modal-close" onclick="closeChangePasswordModal()">&times;</span>
                    <h2>Change Password</h2>
                    
                    <!-- Change Password Form -->
                    <form>
                        <label for="currentPassword">Current Password:</label>
                        <div class="password-input-container">
                            <input type="password" id="currentPassword" name="currentPassword">
                            <span class="toggle-password-visibility" onclick="togglePasswordVisibility('currentPassword')">&#128065;</span>
                        </div>
                        
                        <label for="newPassword">New Password:</label>
                        <div class="password-input-container">
                            <input type="password" id="newPassword" name="newPassword">
                            <span class="toggle-password-visibility" onclick="togglePasswordVisibility('newPassword')">&#128065;</span>
                        </div>

                        <label for="confirmPassword">Repeat Password:</label>
                        <div class="password-input-container">
                            <input type="password" id="confirmPassword" name="confirmPassword">
                            <span class="toggle-password-visibility" onclick="togglePasswordVisibility('confirmPassword')">&#128065;</span>
                        </div>

                        <div class="button-container">
                            <button type="button" class="cancel-button" onclick="closeChangePasswordModal()">Cancel</button>
                            <button type="button" class="save-button" onclick="submitPasswordChange()">Save</button>
                        </div>

                        <div class="password-requirements">
                            <p>Password Must:</p>
                            <ul>
                                <li>Include Lower and Upper Characters</li>
                                <li>Include at least 1 Number or Symbol</li>
                                <li>Be at least 8 Characters Long</li>
                                <li>Match in Both Fields</li>
                                <li>Cannot Contain Spaces and “|” Symbol</li>
                            </ul>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Mechanic Schedule Popup -->
            <div id="mechanicScheduleModal" class="modal">
                <div class="mechanic-schedule-modal-content">
                    <span class="modal-close" onclick="closeMechanicScheduleModal()">&times;</span>
                    <h2>AG TECH'S MECHANIC SCHEDULES</h2>
                    <button onclick="openAddMechanic()">Add Mechanic</button>
                    <button onclick="openEditSchedule()">Edit Schedule</button>
                    <table id="mechanicScheduleTable">
                        <thead>
                            <tr>
                                <th>Mechanic ID</th> <!-- New column for Mechanic ID -->
                                <th>Mechanic</th>
                                <th>Mon</th>
                                <th>Tues</th>
                                <th>Wed</th>
                                <th>Thurs</th>
                                <th>Fri</th>
                                <th>Sat</th>
                                <th>Sun</th>
                            </tr>
                        </thead>
                        <tbody id="mechanicScheduleBody">
                            <!-- Rows will be populated dynamically with JavaScript -->
                        </tbody>
                    </table>
                    <button id="cancelButton" disabled>Cancel</button>
                    <button id="saveButton" disabled>Save Changes</button>
                </div>
            </div>

            </div> 
        </div>

        <!-- Add Mechanic Popup -->
        <div id="addMechanicModal" class="modal" style="display: none;">
            <div id="addMechanicModalContent" class="modal-content">
                <span class="modal-close" onclick="closeAddMechanicModal()">&times;</span>
                <h2>Add Mechanic</h2>
                
                <!-- Mechanic Name Input -->
                <label for="mechanicName">Mechanic Name:</label>
                <input type="text" id="mechanicName" placeholder="Enter mechanic's name" autocomplete="off" required>

                <!-- Day Selection Checkboxes -->
                <label>Available Days:</label>
                <div class="day-checkboxes">
                    <label><input type="checkbox" name="day" value="Monday"> Monday</label>
                    <label><input type="checkbox" name="day" value="Tuesday"> Tuesday</label>
                    <label><input type="checkbox" name="day" value="Wednesday"> Wednesday</label>
                    <label><input type="checkbox" name="day" value="Thursday"> Thursday</label>
                    <label><input type="checkbox" name="day" value="Friday"> Friday</label>
                    <label><input type="checkbox" name="day" value="Saturday"> Saturday</label>
                    <label><input type="checkbox" name="day" value="Sunday"> Sunday</label>
                </div>

                <!-- Save and Cancel Buttons -->
                <button class="cancel-button" onclick="cancelAddMechanic()">Cancel</button>
                <button class="save-button" onclick="saveNewMechanic()">Save Mechanic</button>
            </div>
        </div>

        <div id="technicianScheduleModal" class="modal">
            <div class="mechanic-schedule-modal-content">
                <span class="modal-close" onclick="closeTechnicianScheduleModal()">&times;</span>
                <h2>Technician List</h2>
                <button class="add-technician-btn" onclick="openAddTechnician()">Add Technician</button>
                <table>
                    <thead>
                        <tr>
                            <th>Technician Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="technicianScheduleBody"></tbody>
                </table>
            </div>
        </div>

        <div id="addTechnicianModal" class="add-technician-modal">
            <div id="addTechnicianModalContent" class="modal-content">
                <span class="modal-close" onclick="closeAddTechnicianModal()">&times;</span>
                <h2>Add Technician</h2>
                <label for="technicianName">Technician Name:</label>
                <input type="text" id="technicianName" placeholder="Enter Technician Name" />
                <div class="modal-actions">
                    <button class="cancel-button" onclick="cancelAddTechnician()">Cancel</button>
                    <button class="save-technician-button" onclick="saveNewTechnician()">Save Technician</button>
                </div>
            </div>
        </div>



        <!-- Success Notification Modal -->
        <div id="successModal" class="modal" style="display: none;">
            <div class="modal-content success-content">
                <span class="modal-close" onclick="closeSuccessModal()">&times;</span>
                <h2>Success!</h2>
                <p>The mechanic was added successfully.</p>
                <button onclick="closeSuccessModal()">OK</button>
            </div>
        </div>

        <div id="scheduleSuccessModal" class="modal" style="display: none;">
            <div class="modal-content success-content">
                <span class="modal-close" onclick="closeScheduleSuccessModal()">&times;</span>
                <h2>Success!</h2>
                <p>Schedule updated successfully.</p>
                <button onclick="closeScheduleSuccessModal()">OK</button>
            </div>
        </div>

        <div id="deleteMechanicConfirmModal" class="modal" style="display: none;">
            <div class="modal-content confirm-content">
                <span class="modal-close" onclick="closeDeleteMechanicConfirmModal()">&times;</span>
                <h2>Confirm Deletion</h2>
                <p>Are you sure you want to delete this mechanic?</p>
                <button onclick="closeDeleteMechanicConfirmModal()" class="cancel-button">Cancel</button>
                <button onclick="confirmDeleteMechanic()" class="confirm-button">Yes, Delete</button>
            </div>
        </div>

        <div id="deleteMechanicSuccessModal" class="modal" style="display: none;">
            <div class="modal-content success-content">
                <span class="modal-close" onclick="closeDeleteMechanicSuccessModal()">&times;</span>
                <h2>Success!</h2>
                <p>Mechanic Deleted Successfully.</p>
                <button onclick="closeDeleteMechanicSuccessModal()">OK</button>
            </div>
        </div> 

        <div id="logoutConfirmModal" class="modal">
            <div class="modal-content confirm-content">
                <span class="modal-close" onclick="closeLogoutModal()">&times;</span>
                <h2>Confirmation</h2>
                <p>Are you sure you want to logout?</p>
                <button class="cancel-button logout-cancel-btn" onclick="closeLogoutModal()">Cancel</button>
                <button class="confirm-button logout-confirm-btn" onclick="confirmLogoutAction()">OK</button>
            </div>
        </div>


        <!-- Success Popup Modal -->
        <div id="successPopup" class="modal">
            <div class="modal-content">
                <span class="close" onclick="closeSuccessPopup()">&times;</span>
                <h2>Password Changed Successfully</h2>
                <p>Your password has been updated.</p>
                <button onclick="closeSuccessPopup()" class="btn">OK</button>
            </div>
        </div>

        <div id="passwordMismatchPopup" class="modal">
            <div class="modal-content">
                <span class="close" onclick="closePasswordMismatchPopup()">&times;</span>
                <h2>Passwords Do Not Match</h2>
                <p>The new password and confirmation password do not match.</p>
                <button onclick="closePasswordMismatchPopup()" class="btn">OK</button>
            </div>
        </div>

        <!-- Incorrect Current Password Popup Modal -->
        <div id="incorrectPasswordPopup" class="modal">
            <div class="modal-content">
                <span class="close" onclick="closeIncorrectPasswordPopup()">&times;</span>
                <h2>Incorrect Current Password</h2>
                <p>The current password you entered is incorrect.</p>
                <button onclick="closeIncorrectPasswordPopup()" class="btn">OK</button>
            </div>
        </div>

        <div class="dashboard-stats">   
            <div class="card pending">
                <div class="icon"></div>
                <h2>Pending Appointments</h2>
                <h3></h3>
            </div>
            <div class="card upcoming">
                <div class="icon"></div>
                <h2>Appointments Today</h2>
                <h3></h3>
            </div>

            <div class="card inventory">
                <div class="icon"></div>
                <h2>Total Inventory Value</h2>
                <h3></h3>
            </div>
        </div>
        <div class="update-container">
            <div class="booking-section">
                <h2>Recent Bookings</h2>
                <div class="updates" id="updates-list"></div>
            </div>
            <div class="stock-section">
                <h2>Stock Level</h2>
                <div class="updates" id="updates-list"></div>
            </div>
        </div>          
    </div>
    <script src="admin-dashboard.js"></script>
</body>
</html>
 