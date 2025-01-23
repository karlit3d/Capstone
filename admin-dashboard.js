function toggleDropdown() {
    const dropdownContent = document.getElementById('myDropdown');
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn') && !event.target.closest('.dropdown')) {
        const dropdowns = document.getElementsByClassName('dropdown-content');
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.style.display === 'block') {
                openDropdown.style.display = 'none';
            }
        }
    }
};

// Logout Confirmation
function openLogoutModal() {
    document.getElementById('logoutConfirmModal').style.display = 'block';
}

function closeLogoutModal() {
    document.getElementById('logoutConfirmModal').style.display = 'none';
}

function confirmLogoutAction() {
    // Perform logout action here
    window.location.href = 'logout.php';
}


// Fetch and Update Dashboard Data
document.addEventListener('DOMContentLoaded', function() {
    fetch('info_dashboard.php')
    .then(response => response.json())
    .then(data => {
        document.querySelector('.card.pending h3').textContent = data.pending_appointments;
        document.querySelector('.card.upcoming h3').textContent = data.upcoming_today;
        document.querySelector('.card.inventory h3').innerHTML = '₱&nbsp;' + new Intl.NumberFormat().format(data.total_inventory_value);

        const updatesList = document.getElementById('updates-list');
        updatesList.innerHTML = ''; // Clear existing updates

        data.recent_updates.forEach(update => {
            const updateItem = document.createElement('div');
            updateItem.classList.add('update-item');

            const updateIcon = document.createElement('div');
            updateIcon.classList.add('update-icon');
            updateItem.appendChild(updateIcon);

            const nameElement = document.createElement('p');
            nameElement.textContent = update.name;
            updateItem.appendChild(nameElement);

            const actionElement = document.createElement('span');
            actionElement.textContent = update.action;
            updateItem.appendChild(actionElement);

            const timeElement = document.createElement('small');
            timeElement.textContent = update.time;
            updateItem.appendChild(timeElement);

            updatesList.appendChild(updateItem);
        });

        const stockList = document.querySelector('.stock-section .updates');
        stockList.innerHTML = ''; // Clear existing stock items

        if (data.low_stock_items.length > 0) {
            data.low_stock_items.forEach(item => {
                const stockItem = document.createElement('div');
                stockItem.innerHTML = item; // Directly add the HTML from PHP
                stockList.appendChild(stockItem);
            });
        } else {
            const noStockItem = document.createElement('div');
            noStockItem.classList.add('update-item');
            noStockItem.innerHTML = `<p>No low stock items</p>`;
            stockList.appendChild(noStockItem);
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});

// Print Function
function printPage() {
    window.print();
}

// Clear Change Password Fields
function clearPasswordFields() {
    document.getElementById("currentPassword").value = "";
    document.getElementById("newPassword").value = "";
    document.getElementById("confirmPassword").value = "";
}

// Modal Functions
function openChangePasswordModal() {
    toggleDropdown(); // Close dropdown
    document.getElementById("changePasswordModal").style.display = "block";
}

function closeChangePasswordModal() {
    document.getElementById("changePasswordModal").style.display = "none";
    clearPasswordFields(); // Clear fields when closing the modal
}

// Mechanic Schedule Modal Functions
function openMechanicScheduleModal() {
    toggleDropdown(); // Close dropdown
    document.getElementById("mechanicScheduleModal").style.display = "block";
    loadMechanicSchedule(); // Load mechanic schedule data when the modal opens
}

function closeMechanicScheduleModal() {
    document.getElementById("mechanicScheduleModal").style.display = "none";
}
// Function to show the schedule success modal
function showScheduleSuccessModal() {
    document.getElementById("scheduleSuccessModal").style.display = "block";
}

// Function to close the schedule success modal
function closeScheduleSuccessModal() {
    document.getElementById("scheduleSuccessModal").style.display = "none";
}

// Open Add Mechanic Modal
function openAddMechanic() {
    document.getElementById("addMechanicModal").style.display = "block";
}

// Close Add Mechanic Modal
function closeAddMechanicModal() {
    document.getElementById("addMechanicModal").style.display = "none";
}
function openAddMechanic() {
    document.getElementById("addMechanicModal").style.display = "block";
}
// Technician Modal
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("technicianScheduleModal").style.display = "none";
    document.getElementById("addTechnicianModal").style.display = "none";
});

function openTechnicianScheduleModal() {
    document.getElementById("technicianScheduleModal").style.display = "block";
    loadTechnicianSchedule();
}

function closeTechnicianScheduleModal() {
    document.getElementById("technicianScheduleModal").style.display = "none";
}

function openAddTechnician() {
    document.getElementById("addTechnicianModal").style.display = "block";
}

function closeAddTechnicianModal() {
    document.getElementById("addTechnicianModal").style.display = "none";
}

function cancelAddTechnician() {
    closeAddTechnicianModal();
}

function loadTechnicianSchedule() {
    fetch('fetch_technician_schedule.php')
        .then(response => response.json())
        .then(data => {
            const scheduleBody = document.getElementById("technicianScheduleBody");
            scheduleBody.innerHTML = "";

            data.forEach(row => {
                const tr = document.createElement("tr");

                // Technician Name
                const nameCell = document.createElement("td");
                nameCell.textContent = row.name;
                tr.appendChild(nameCell);

                // Actions
                const actionCell = document.createElement("td");
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.classList.add("delete-technician-btn");
                deleteButton.onclick = () => deleteTechnician(row.id);
                actionCell.appendChild(deleteButton);
                tr.appendChild(actionCell);

                scheduleBody.appendChild(tr);
            });
        })
        .catch(error => console.error("Error loading technician list:", error));
}
function saveNewTechnician() {
    const technicianName = document.getElementById("technicianName").value;

    if (!technicianName) {
        alert("Please enter a technician name.");
        return;
    }

    fetch('add_technician.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: technicianName })
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert("Technician added successfully!");
                closeAddTechnicianModal();
                loadTechnicianSchedule();
            } else {
                alert("Failed to add technician.");
            }
        })
        .catch(error => console.error("Error:", error));
}
function deleteTechnician(technicianId) {
    if (!confirm("Are you sure you want to delete this technician?")) return;

    fetch('delete_technician.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: technicianId })
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert("Technician deleted successfully!");
                loadTechnicianSchedule();
            } else {
                alert("Failed to delete technician.");
            }
        })
        .catch(error => console.error("Error deleting technician:", error));
}


// Function to close the Add Mechanic modal
function closeAddMechanicModal() {
    // Clear the input fields and uncheck all checkboxes
    document.getElementById("mechanicName").value = "";
    document.querySelectorAll("#addMechanicModalContent input[type='checkbox']").forEach(checkbox => {
        checkbox.checked = false;
    });
    // Hide the modal
    document.getElementById("addMechanicModal").style.display = "none";
}

// Event listener for the Cancel button to close the modal
function cancelAddMechanic() {
    closeAddMechanicModal();
}
// Function to show the success modal
function showSuccessModal() {
    document.getElementById("successModal").style.display = "block";
}

// Function to close the success modal
function closeSuccessModal() {
    document.getElementById("successModal").style.display = "none";
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById("addMechanicModal");
    if (event.target === modal) {
        closeAddMechanicModal();
    }
}

function saveNewMechanic() {
    const mechanicName = document.getElementById("mechanicName").value;
    const selectedDays = Array.from(document.querySelectorAll("#addMechanicModalContent input[name='day']:checked")).map(checkbox => checkbox.value);

    if (!mechanicName) {
        alert("Please enter the mechanic's name.");
        return;
    }

    if (selectedDays.length === 0) {
        alert("Please select at least one day.");
        return;
    }

    const mechanicData = {
        name: mechanicName,
        days: selectedDays
    };

    // Send data to PHP to save to the database
    fetch('add_mechanic.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mechanicData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            closeAddMechanicModal(); // Close the Add Mechanic modal
            showSuccessModal(); // Show the success modal
            loadMechanicSchedule(); // Refresh the schedule table
        } else {
            alert("Error adding mechanic: " + data.message);
        }
    })
    .catch(error => {
        console.error("Error saving mechanic:", error);
    });
}
 

// Load Mechanic Schedule Data
function loadMechanicSchedule() {
    fetch('fetch_mechanic_schedule.php')
    .then(response => response.json())
    .then(data => {
        console.log("Fetched Mechanic Schedule Data:", data); // Log the fetched data

        const scheduleBody = document.getElementById("mechanicScheduleBody");
        scheduleBody.innerHTML = ''; // Clear existing rows

        data.forEach(row => {
            const tr = document.createElement("tr");

            // Mechanic Name Column
            const nameCell = document.createElement("td");
            nameCell.textContent = row.mechanic_name;
            tr.appendChild(nameCell);

            // Day Columns
            ["mon", "tue", "wed", "thu", "fri", "sat", "sun"].forEach(day => {
                const dayCell = document.createElement("td");
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = row[day] === 1; // Set based on availability
                checkbox.disabled = true; // Disable checkbox for view-only mode
                dayCell.appendChild(checkbox);
                tr.appendChild(dayCell);
            });

            scheduleBody.appendChild(tr);
        });
    })
    .catch(error => console.error("Error loading mechanic schedule:", error));
}


function togglePasswordVisibility(id) {
    const input = document.getElementById(id);
    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}

// Close modals if user clicks outside
window.onclick = function(event) {
    if (event.target.classList.contains("modal")) {
        closeChangePasswordModal();
        closeMechanicScheduleModal();
    }
}

// Success Popup for Password Change
function showSuccessPopup() {
    document.getElementById("successPopup").style.display = "block";
}

function closeSuccessPopup() {
    document.getElementById("successPopup").style.display = "none";
}

// Error Popup for Password Mismatch
function showPasswordMismatchPopup() {
    document.getElementById("passwordMismatchPopup").style.display = "block";
}

function closePasswordMismatchPopup() {
    document.getElementById("passwordMismatchPopup").style.display = "none";
}

// Error Popup for Incorrect Current Password
function showIncorrectPasswordPopup() {
    document.getElementById("incorrectPasswordPopup").style.display = "block";
}

function closeIncorrectPasswordPopup() {
    document.getElementById("incorrectPasswordPopup").style.display = "none";
}

// Submit Change Password Function
function submitPasswordChange() {
    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Basic validation
    if (newPassword !== confirmPassword) {
        showPasswordMismatchPopup(); // Show password mismatch popup
        return;
    }

    // Additional validation for password requirements (example)
    if (newPassword.length < 8 || !/[A-Z]/.test(newPassword) || !/[0-9]/.test(newPassword) || /\s/.test(newPassword) || newPassword.includes("|")) {
        alert("Password does not meet the requirements.");
        return;
    }

    // Send AJAX request to change the password
    fetch('update_password.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            currentPassword: currentPassword,
            newPassword: newPassword
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            showSuccessPopup(); // Show success popup
            closeChangePasswordModal(); // Close the change password modal
        } else if (data.message === "Current password is incorrect") {
            showIncorrectPasswordPopup(); // Show incorrect current password popup
        } else {
            alert(data.message);
        }
        clearPasswordFields(); // Clear fields after attempt
    })
    .catch(error => {
        console.error("Error:", error);
    });
}
// Mechanic Schedule Modal Functions
function openMechanicScheduleModal() {
    toggleDropdown(); // Close dropdown
    document.getElementById("mechanicScheduleModal").style.display = "block";
    loadMechanicSchedule(); // Load mechanic schedule data when the modal opens
}

function closeMechanicScheduleModal() {
    document.getElementById("mechanicScheduleModal").style.display = "none";
}

function toggleDropdown() {
    const dropdownContent = document.getElementById('myDropdown');
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn') && !event.target.closest('.dropdown')) {
        const dropdowns = document.getElementsByClassName('dropdown-content');
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.style.display === 'block') {
                openDropdown.style.display = 'none';
            }
        }
    }
};

// Fetch and Update Dashboard Data
document.addEventListener('DOMContentLoaded', function() {
    fetch('info_dashboard.php')
    .then(response => response.json())
    .then(data => {
        document.querySelector('.card.pending h3').textContent = data.pending_appointments;
        document.querySelector('.card.upcoming h3').textContent = data.upcoming_today;
        document.querySelector('.card.inventory h3').innerHTML = '₱&nbsp;' + new Intl.NumberFormat().format(data.total_inventory_value);

        const updatesList = document.getElementById('updates-list');
        updatesList.innerHTML = ''; // Clear existing updates

        data.recent_updates.forEach(update => {
            const updateItem = document.createElement('div');
            updateItem.classList.add('update-item');

            const updateIcon = document.createElement('div');
            updateIcon.classList.add('update-icon');
            updateItem.appendChild(updateIcon);

            const nameElement = document.createElement('p');
            nameElement.textContent = update.name;
            updateItem.appendChild(nameElement);

            const actionElement = document.createElement('span');
            actionElement.textContent = update.action;
            updateItem.appendChild(actionElement);

            const timeElement = document.createElement('small');
            timeElement.textContent = update.time;
            updateItem.appendChild(timeElement);

            updatesList.appendChild(updateItem);
        });

        const stockList = document.querySelector('.stock-section .updates');
        stockList.innerHTML = ''; // Clear existing stock items

        if (data.low_stock_items.length > 0) {
            data.low_stock_items.forEach(item => {
                const stockItem = document.createElement('div');
                stockItem.innerHTML = item; // Directly add the HTML from PHP
                stockList.appendChild(stockItem);
            });
        } else {
            const noStockItem = document.createElement('div');
            noStockItem.classList.add('update-item');
            noStockItem.innerHTML = `<p>No low stock items</p>`;
            stockList.appendChild(noStockItem);
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});

// Print Function
function printPage() {
    window.print();
}

// Clear Change Password Fields
function clearPasswordFields() {
    document.getElementById("currentPassword").value = "";
    document.getElementById("newPassword").value = "";
    document.getElementById("confirmPassword").value = "";
}

// Modal Functions
function openChangePasswordModal() {
    toggleDropdown(); // Close dropdown
    document.getElementById("changePasswordModal").style.display = "block";
}

function closeChangePasswordModal() {
    document.getElementById("changePasswordModal").style.display = "none";
    clearPasswordFields(); // Clear fields when closing the modal
}

// Mechanic Schedule Modal Functions
function openMechanicScheduleModal() {
    toggleDropdown(); // Close dropdown
    document.getElementById("mechanicScheduleModal").style.display = "block";
    loadMechanicSchedule(); // Load mechanic schedule data when the modal opens
}

function closeMechanicScheduleModal() {
    document.getElementById("mechanicScheduleModal").style.display = "none";
}

// Load Mechanic Schedule Data
function loadMechanicSchedule() {
    fetch('fetch_mechanic_schedule.php')
    .then(response => response.json())
    .then(data => {
        const scheduleBody = document.getElementById("mechanicScheduleBody");
        scheduleBody.innerHTML = ''; // Clear existing rows

        data.forEach(row => {
            const tr = document.createElement("tr");
            tr.setAttribute("data-mechanic-id", row.mechanic_id); // Set mechanic_id dynamically

            // Mechanic ID Column
            const idCell = document.createElement("td");
            idCell.textContent = row.mechanic_id;
            tr.appendChild(idCell);

            // Mechanic Name Column with Remove Button
            const nameCell = document.createElement("td");
            const mechanicContainer = document.createElement("div");
            mechanicContainer.classList.add("mechanic-container"); // Add a container for Flexbox

            const mechanicName = document.createElement("span");
            mechanicName.textContent = row.mechanic_name;
            mechanicContainer.appendChild(mechanicName);

            const removeButton = document.createElement("button");
            removeButton.textContent = "✖";
            removeButton.classList.add("remove-button", "hidden"); // Add hidden class
            removeButton.onclick = () => deleteMechanic(row.mechanic_id);
            mechanicContainer.appendChild(removeButton);

            nameCell.appendChild(mechanicContainer);
            tr.appendChild(nameCell);

            // Day Columns
            ["mon", "tue", "wed", "thu", "fri", "sat", "sun"].forEach(day => {
                const dayCell = document.createElement("td");
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.name = day;
                checkbox.checked = row[day] === 1;
                checkbox.disabled = true;
                dayCell.appendChild(checkbox);
                tr.appendChild(dayCell);
            });

            scheduleBody.appendChild(tr);
        });
    })
    .catch(error => console.error("Error loading mechanic schedule:", error));
}






function togglePasswordVisibility(id) {
    const input = document.getElementById(id);
    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}

// Close modals if user clicks outside
window.onclick = function(event) {
    if (event.target.classList.contains("modal")) {
        closeChangePasswordModal();
        closeMechanicScheduleModal();
    }
}

// Success Popup for Password Change
function showSuccessPopup() {
    document.getElementById("successPopup").style.display = "block";
}

function closeSuccessPopup() {
    document.getElementById("successPopup").style.display = "none";
}

// Error Popup for Password Mismatch
function showPasswordMismatchPopup() {
    document.getElementById("passwordMismatchPopup").style.display = "block";
}

function closePasswordMismatchPopup() {
    document.getElementById("passwordMismatchPopup").style.display = "none";
}

// Error Popup for Incorrect Current Password
function showIncorrectPasswordPopup() {
    document.getElementById("incorrectPasswordPopup").style.display = "block";
}

function closeIncorrectPasswordPopup() {
    document.getElementById("incorrectPasswordPopup").style.display = "none";
}

// Submit Change Password Function
function submitPasswordChange() {
    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Basic validation
    if (newPassword !== confirmPassword) {
        showPasswordMismatchPopup(); // Show password mismatch popup
        return;
    }

    // Additional validation for password requirements (example)
    if (newPassword.length < 8 || !/[A-Z]/.test(newPassword) || !/[0-9]/.test(newPassword) || /\s/.test(newPassword) || newPassword.includes("|")) {
        alert("Password does not meet the requirements.");
        return;
    }

    // Send AJAX request to change the password
    fetch('update_password.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            currentPassword: currentPassword,
            newPassword: newPassword
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            showSuccessPopup(); // Show success popup
            closeChangePasswordModal(); // Close the change password modal
        } else if (data.message === "Current password is incorrect") {
            showIncorrectPasswordPopup(); // Show incorrect current password popup
        } else {
            alert(data.message);
        }
        clearPasswordFields(); // Clear fields after attempt
    })
    .catch(error => {
        console.error("Error:", error);
    });
}
// Mechanic Schedule Modal Functions
function openMechanicScheduleModal() {
    toggleDropdown(); // Close dropdown
    document.getElementById("mechanicScheduleModal").style.display = "block";
    loadMechanicSchedule(); // Load mechanic schedule data when the modal opens
}

function closeMechanicScheduleModal() {
    document.getElementById("mechanicScheduleModal").style.display = "none";
}

// New functions for enabling editing, saving, and canceling changes
let isEditing = false;

function openEditSchedule() {
    isEditing = true;
    document.getElementById("saveButton").disabled = false;
    document.getElementById("cancelButton").disabled = false;

    // Enable all checkboxes for editing
    const checkboxes = document.querySelectorAll("#mechanicScheduleBody input[type='checkbox']");
    checkboxes.forEach(checkbox => {
        checkbox.disabled = false;
    });

    // Show Remove buttons
    const removeButtons = document.querySelectorAll(".remove-button");
    removeButtons.forEach(button => button.classList.remove("hidden"));
}


function cancelEditing() {
    isEditing = false;
    document.getElementById("saveButton").disabled = true;
    document.getElementById("cancelButton").disabled = true;

    // Disable all checkboxes
    const checkboxes = document.querySelectorAll("#mechanicScheduleBody input[type='checkbox']");
    checkboxes.forEach(checkbox => {
        checkbox.disabled = true;
    });

    // Hide Remove buttons
    const removeButtons = document.querySelectorAll(".remove-button");
    removeButtons.forEach(button => button.classList.add("hidden"));

    // Reload the mechanic schedule to revert changes
    loadMechanicSchedule();
}

function saveMechanicSchedule() {
    const scheduleData = [];
    const rows = document.querySelectorAll("#mechanicScheduleBody tr");

    rows.forEach(row => {
        const mechanicId = row.getAttribute("data-mechanic-id");

        if (mechanicId) {
            const days = {
                mechanic_id: mechanicId,
                mon: row.querySelector("input[name='mon']").checked ? 1 : 0,
                tue: row.querySelector("input[name='tue']").checked ? 1 : 0,
                wed: row.querySelector("input[name='wed']").checked ? 1 : 0,
                thu: row.querySelector("input[name='thu']").checked ? 1 : 0,
                fri: row.querySelector("input[name='fri']").checked ? 1 : 0,
                sat: row.querySelector("input[name='sat']").checked ? 1 : 0,
                sun: row.querySelector("input[name='sun']").checked ? 1 : 0
            };

            scheduleData.push(days);
        } else {
            console.error("Missing mechanic_id for a row.");
        }
    });

    // Send the updated data to the server
    fetch('update_mechanic_schedule.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ schedule: scheduleData })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            showScheduleSuccessModal(); // Show the success modal
            loadMechanicSchedule(); // Reload the schedule to reflect changes

            // Disable all checkboxes after saving
            document.querySelectorAll("#mechanicScheduleBody input[type='checkbox']").forEach(checkbox => {
                checkbox.disabled = true;
            });
        } else {
            console.error("Error updating schedule:", data.message);
        }
    })
    .catch(error => {
        console.error("Error saving data:", error);
    });
}





// Initialize Save, Edit, and Cancel Buttons after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.getElementById("saveButton");
    const cancelButton = document.getElementById("cancelButton");

    if (saveButton && cancelButton) {
        saveButton.onclick = saveMechanicSchedule;
        cancelButton.onclick = cancelEditing;
    } else {
        console.error("Save and Cancel buttons are missing in the DOM.");
    }
});
let mechanicToDelete = null; // Store mechanic ID for deletion

function deleteMechanic(mechanicId) {
    mechanicToDelete = mechanicId;
    document.getElementById("deleteMechanicConfirmModal").style.display = "block"; // Show custom confirm modal
}

function confirmDeleteMechanic() {
    if (!mechanicToDelete) return;

    fetch('delete_mechanic.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mechanic_id: mechanicToDelete })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            closeDeleteMechanicConfirmModal(); // Close the confirmation modal
            showDeleteMechanicSuccessModal(); // Show the success modal
            loadMechanicSchedule(); // Refresh the schedule after deletion
        } else {
            console.error("Error deleting mechanic:", data.message);    
        }
    })
    .catch(error => {
        console.error("Error deleting mechanic:", error);
    });
}

function closeDeleteMechanicConfirmModal() {
    document.getElementById("deleteMechanicConfirmModal").style.display = "none";
    mechanicToDelete = null; // Reset mechanic ID
}

function showDeleteMechanicSuccessModal() {
    document.getElementById("deleteMechanicSuccessModal").style.display = "block";
}

function closeDeleteMechanicSuccessModal() {
    document.getElementById("deleteMechanicSuccessModal").style.display = "none";
}
