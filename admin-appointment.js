// Mock fetch function to simulate a database, with "status" property added
const fetchAppointments = async () => {
    try {
        const response = await fetch('fetch_appointments.php'); // Pointing to the PHP script
        const appointments = await response.json();  // Get the JSON response
        return appointments;  // Return the appointment data
    } catch (error) {
        console.error('Error fetching appointments:', error);
        return [];
    }
};
// Function to move an appointment to the "upcoming" tab (approve the appointment)
const moveAppointmentToTab = async (appointmentId) => {
    try {
        const response = await fetch('update_appointment_status.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                id: appointmentId, 
                status: 'upcoming'
            })
        });

        if (response.ok) {
            console.log('Appointment status updated successfully');
            // Refresh pending and upcoming appointments
            loadPendingAppointments();
            loadCancelledAppointments();
            renderCalendar();
        } else {
            console.error('Failed to update appointment status');
        }
    } catch (error) {
        console.error('Error updating appointment status:', error);
    }
};
const cancelAppointmentToTab = async (appointmentId) => {
    try {
        const response = await fetch('update_appointment_status.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: appointmentId,
                status: 'cancelled'
            })
        });

        if (response.ok) {
            console.log('Appointment status updated successfully');
            // Refresh pending and upcoming appointments
            loadPendingAppointments();
            loadAppointments();
            renderCalendar();
        } else {
            console.error('Failed to update appointment status');
        }
    } catch (error) {
        console.error('Error updating appointment status:', error);
    }
};
const pastAppointmentToTab = async (appointmentId) => {
    try {
        const response = await fetch('update_appointment_status.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: appointmentId,
                status: 'past'
            })
        });

        if (response.ok) {
            console.log('Appointment status updated successfully');
            // Refresh pending and upcoming appointments
            loadAppointments();
            renderCalendar();
        } else {
            console.error('Failed to update appointment status');
        }
    } catch (error) {
        console.error('Error updating appointment status:', error);
    }
};
// Add the event listener for the approve button
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('approve-btn')) {
        const appointmentId = event.target.getAttribute('data-id');
        moveAppointmentToTab(appointmentId);
    }
});

// Initialize today's date and current month/year
let today = new Date();
let currentMonth = today.getMonth(); // Get current month (0 = January, 11 = December)
let currentYear = today.getFullYear(); // Get current year

// Array for months
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Render the calendar with the current month and year
const renderCalendar = () => {
    const calendar = document.getElementById('calendar');
    const monthName = document.getElementById('month-name');
    monthName.innerText = `${months[currentMonth]} ${currentYear}`; // Show current month and year

    calendar.innerHTML = ''; // Clear the calendar

    const today = new Date(); // Get today's date
    const todayDay = today.getDate(); // Get today's day
    const todayMonth = today.getMonth(); // Get today's month
    const todayYear = today.getFullYear(); // Get today's year

    // Get the number of days in the current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // Day the month starts on (0 = Sunday, 6 = Saturday)

    // Fill empty cells for days before the 1st of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDiv = document.createElement('div');
        calendar.appendChild(emptyDiv);
    }

    // Populate the calendar with days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('calendar-day');
        dayDiv.innerText = day;

        const currentDay = new Date(currentYear, currentMonth, day);

        // Disable Sundays
        if (currentDay.getDay() === 0) {
            dayDiv.classList.add('disabled');
            dayDiv.style.pointerEvents = 'none';
            dayDiv.style.color = '#ccc';
        }

        // Highlight today by default
        if (day === todayDay && currentMonth === todayMonth && currentYear === todayYear) {
            dayDiv.classList.add('selected');  // Mark today
            loadAppointments(`${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);
        } else if (currentYear < todayYear || 
                   (currentYear === todayYear && currentMonth < todayMonth) || 
                   (currentYear === todayYear && currentMonth === todayMonth && day < todayDay)) {
            // Disable past dates
            dayDiv.classList.add('past-day'); // Optionally, you can add a class for styling
            dayDiv.style.pointerEvents = 'none'; // Prevent clicks
            dayDiv.style.opacity = '0.5'; // Optional: visually indicate it's disabled
        }

        // Add click event to select a day
        dayDiv.addEventListener('click', function () {
            if (this.classList.contains('past-day')) {
                return; // Do not proceed if it's a past day
            }
            document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
            this.classList.add('selected');
            loadAppointments(`${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);
        });

        calendar.appendChild(dayDiv); // Add the day to the calendar grid
    }
};

// Ensure today's month and year are displayed on page load
window.onload = renderCalendar;

// Month navigation
const nextMonth = () => {
    currentMonth = (currentMonth + 1) % 12;
    if (currentMonth === 0) currentYear++;
    renderCalendar();
};

const prevMonth = () => {
    currentMonth = (currentMonth - 1 + 12) % 12;
    if (currentMonth === 11) currentYear--;
    renderCalendar();
};

// Assuming you want to open a modal or trigger an action when "Edit" is clicked
document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', function() {
        const appointmentId = this.getAttribute('data-id');  // Assuming you have appointment IDs

        // Change color when clicked
    this.style.backgroundColor = 'blue';
    this.style.color = 'white';  // Optional: change text color for contrast
    
    console.log(`Edit button clicked for appointment ID: ${appointmentId}`);
        // Example action: log the appointment ID or open a modal
        console.log(`Edit button clicked for appointment ID: ${appointmentId}`);

        // If you have a modal popup, call the function to open the modal
        // openEditPopup(appointmentId);
    });
});
// Load appointments for a specific date
const loadAppointments = async (selectedDate) => {
    const appointments = await fetchAppointments();  // Fetch all appointments
    const bookingList = document.getElementById('booking-list');  // Container for the upcoming appointments
    bookingList.innerHTML = '';  // Clear previous appointments

    // Filter appointments for "upcoming" status and selected date
    const filteredAppointments = appointments.filter(appointment => 
        appointment.date === selectedDate && appointment.status === 'upcoming'
    );

    // Log for debugging
    console.log("Upcoming Appointments:", filteredAppointments);

    if (filteredAppointments.length === 0) {
        // If no appointments, show a message
        bookingList.innerHTML = '<p class="no-appointments-message">No Upcoming Appointments For This Date.</p>';
    } else {
        // Sort appointments by time
        filteredAppointments.sort((a, b) => new Date(`1970-01-01T${a.time}`) - new Date(`1970-01-01T${b.time}`));

        // Group appointments by time
        const groupedAppointments = filteredAppointments.reduce((acc, appointment) => {
            const time = appointment.time;
            if (!acc[time]) {
                acc[time] = [];
            }
            acc[time].push(appointment);
            return acc;
        }, {});

        // Loop through grouped appointments and render each time slot header and corresponding appointments
        for (const [timeSlot, appointments] of Object.entries(groupedAppointments)) {
            // Create a header for the time slot
            const timeSlotHeader = document.createElement('h2');
            timeSlotHeader.classList.add('time-slot-header'); // Add the class to the header
            timeSlotHeader.textContent = timeSlot;  // Set the time slot as the header
            bookingList.appendChild(timeSlotHeader);  // Append the header to the booking list

            // Loop through appointments for this time slot and create cards
            appointments.forEach(appointment => {
                const bookingCard = document.createElement('div');
                bookingCard.classList.add('appointment-card');

                // Create the card without "Reschedule" and "Finish" buttons
                bookingCard.innerHTML = `   
                    <div class="appointment-details">
                        <h3 class="client-name">${appointment.name}</h3>
                        <div class="contact-vehicle">
                            <p class="contact"><i class="icon-contact"></i> ${appointment.contact}</p> <!-- Display contact number -->
                            <p class="vehicle"><i class="icon-vehicle"></i> ${appointment.vehicle}</p>
                        </div>
                        <div class="service-mechanic">
                            <p class="mechanic"><i class="icon-mechanic"></i> ${appointment.mechanic}</p> <!-- Display mechanic -->
                            <p class="service"><i class="icon-service"></i> ${appointment.service}</p>
                        </div>
                        <div class="time-platenumber">
                        <p class="time"><i class="icon-time"></i> ${appointment.time}</p>
                        <p class="platenumber"><i class="icon-platenumber"></i> ${appointment.platenumber}</p>
                        </div>
                    </div>
                    <div class="appointment-actions">
                        <button class="edit-btn" data-id="${appointment.id}">Edit <i class="icon-dropdown"></i></button>
                    </div>
                `;
                // Attach event listener for "Edit" button
                bookingCard.querySelector('.edit-btn').addEventListener('click', (event) => {
                    console.log("Edit button clicked for Upcoming appointment ID:", appointment.id);
                    openEditPopup(appointment.id, 'upcoming', event.target);
                });

                // Append the card to the booking list container
                bookingList.appendChild(bookingCard);
            });
        }
    }
};



// Function to load pending appointments
const loadPendingAppointments = async () => {
    const appointments = await fetchAppointments();  
    const pendingList = document.getElementById('pending-list');  
    pendingList.innerHTML = '';  // Clear previous content

    // Filter appointments by pending status
    const appointmentList = appointments.filter(appointment => appointment.status === 'pending');

    if (appointmentList.length === 0) {
        pendingList.innerHTML = '<p>No Pending Appointments.</p>';
    } else {
        // Group appointments by month
        const groupedAppointments = {};
        appointmentList.forEach(appointment => {
            const appointmentMonth = new Date(appointment.date).toLocaleString('default', { month: 'long', year: 'numeric' });
            if (!groupedAppointments[appointmentMonth]) {
                groupedAppointments[appointmentMonth] = []; // Create an array for the month if it doesn't exist
            }
            groupedAppointments[appointmentMonth].push(appointment); // Add the appointment to the month
        });

        // Sort the months
        const sortedMonths = Object.keys(groupedAppointments).sort((a, b) => {
            // Compare the months based on the month and year
            const dateA = new Date(a);
            const dateB = new Date(b);
            return dateA - dateB; // Ascending order
        });

        // Render appointments grouped by month
        sortedMonths.forEach(month => {
            // Add month header
            const monthHeader = document.createElement('h3');
            monthHeader.textContent = month; // Set month header text
            monthHeader.classList.add('pending-month-header'); // Add CSS class
            pendingList.appendChild(monthHeader); // Append header to the pending list

            // Sort appointments by date for the current month
            const appointmentsForMonth = groupedAppointments[month].sort((a, b) => new Date(a.date) - new Date(b.date));

            // Loop through each sorted appointment for that month
            appointmentsForMonth.forEach(appointment => {
                const bookingCard = document.createElement('div');
                bookingCard.classList.add('appointment-card');

                bookingCard.innerHTML = `
                    <div class="appointment-date">
                        <span class="day">${new Date(appointment.date).toLocaleString('en-us', { weekday: 'short' })}</span>
                        <span class="date">${new Date(appointment.date).getDate()}</span>
                    </div>
                    <div class="appointment-details">
                        <h3 class="client-name">${appointment.name}</h3>
                        <div class="contact-vehicle">
                            <p class="contact"><i class="icon-contact"></i> ${appointment.contact}</p> <!-- Display contact number -->
                            <p class="vehicle"><i class="icon-vehicle"></i> ${appointment.vehicle}</p>
                        </div>
                        <div class="service-mechanic">
                            <p class="mechanic"><i class="icon-mechanic"></i> ${appointment.mechanic}</p> <!-- Display mechanic -->
                            <p class="service"><i class="icon-service"></i> ${appointment.service}</p>
                        </div>
                        <div class="time-platenumber">
                        <p class="time"><i class="icon-time"></i> ${appointment.time}</p>
                        <p class="platenumber"><i class="icon-platenumber"></i> ${appointment.platenumber}</p>
                        </div>
                    </div>
                    <div class="appointment-actions">
                        <button class="edit-btn" data-id="${appointment.id}">Edit <i class="icon-dropdown"></i></button>
                    </div>
                `;

                // Attach event listener for the Edit button for Pending appointments
                bookingCard.querySelector('.edit-btn').addEventListener('click', (event) => {
                    console.log("Edit button clicked for Pending appointment ID:", appointment.id);  // Debug log
                    openEditPopup(appointment.id, 'pending', event.target);  // Open popup for Pending appointment
                });

                pendingList.appendChild(bookingCard);
            });
        });
    }
};
 



// Similar functions for past and cancelled tabs
let currentPage = 1;
const itemsPerPage = 10;

const loadPastAppointments = async () => {
    const appointments = await fetchAppointments();
    const pastList = document.getElementById('past-list');
    pastList.innerHTML = ''; // Clear previous content

    // Filter appointments by past status
    const appointmentList = appointments.filter(appointment => appointment.status === 'past');

    if (appointmentList.length === 0) {
        pastList.innerHTML = '<p>No past appointments.</p>';
    } else {
        // Sort the appointment list by date in descending order (latest first)
        appointmentList.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Calculate total pages
        const totalPages = Math.ceil(appointmentList.length / itemsPerPage);

        // Get appointments for the current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedAppointments = appointmentList.slice(startIndex, endIndex);

        // Group appointments by month for the current page
        const groupedAppointments = {};
        paginatedAppointments.forEach(appointment => {
            const appointmentMonth = new Date(appointment.date).toLocaleString('default', { month: 'long', year: 'numeric' });
            if (!groupedAppointments[appointmentMonth]) {
                groupedAppointments[appointmentMonth] = [];
            }
            groupedAppointments[appointmentMonth].push(appointment);
        });

        // Sort the months
        const sortedMonths = Object.keys(groupedAppointments).sort((a, b) => {
            const dateA = new Date(a);
            const dateB = new Date(b);
            return dateB - dateA;
        });

        // Render appointments grouped by month
        sortedMonths.forEach(month => {
            const monthHeader = document.createElement('h3');
            monthHeader.textContent = month;
            monthHeader.classList.add('past-month-header');
            pastList.appendChild(monthHeader);

            const appointmentsForMonth = groupedAppointments[month].sort((a, b) => new Date(b.date) - new Date(a.date));
            appointmentsForMonth.forEach(appointment => {
                const bookingCard = document.createElement('div');
                bookingCard.classList.add('appointment-card');

                bookingCard.innerHTML = `
                    <div class="appointment-date">
                        <span class="day">${new Date(appointment.date).toLocaleString('en-us', { weekday: 'short' })}</span>
                        <span class="date">${new Date(appointment.date).getDate()}</span>
                    </div>
                    <div class="appointment-details">
                        <h3 class="client-name">${appointment.name}</h3>
                        <div class="contact-vehicle">
                            <p class="contact"><i class="icon-contact"></i> ${appointment.contact}</p>
                            <p class="vehicle"><i class="icon-vehicle"></i> ${appointment.vehicle}</p>
                        </div>
                        <div class="service-mechanic">
                            <p class="mechanic"><i class="icon-mechanic"></i> ${appointment.mechanic}</p>
                            <p class="service"><i class="icon-service"></i> ${appointment.service}</p>
                        </div>
                        <div class="time-platenumber">
                            <p class="time"><i class="icon-time"></i> ${appointment.time}</p>
                            <p class="platenumber"><i class="icon-platenumber"></i> ${appointment.platenumber}</p>
                        </div>
                    </div>
                    <div class="appointment-actions" style="display: none;">
                        <button class="edit-btn">
                            Edit <i class="icon-dropdown"></i>
                        </button>
                    </div>
                `;

                bookingCard.querySelector('.edit-btn').addEventListener('click', () => {
                    openEditPopup(appointment.id, appointment.status);
                });

                pastList.appendChild(bookingCard);
            });
        });

        // Render pagination controls
        renderPaginationControls(totalPages);
    }
};

const renderPaginationControls = (totalPages) => {
    const paginationContainer = document.getElementById('pagination-controls');
    paginationContainer.innerHTML = ''; // Clear previous controls

    const maxVisiblePages = 5;
    const startPage = Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        currentPage--;
        loadPastAppointments();
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
    });
    paginationContainer.appendChild(prevButton);

    // Display a maximum of 5 page numbers
    for (let i = startPage; i <= endPage; i++) {
        const pageNumber = document.createElement('span');
        pageNumber.textContent = i;
        pageNumber.classList.add('page-number');
        if (i === currentPage) {
            pageNumber.classList.add('active');
        }
        pageNumber.addEventListener('click', () => {
            currentPage = i;
            loadPastAppointments();
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
        });
        paginationContainer.appendChild(pageNumber);
    }

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
        currentPage++;
        loadPastAppointments();
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
    });
    paginationContainer.appendChild(nextButton);
};



// Initial load
loadPastAppointments();

let currentCancelledPage = 1;
const cancelledItemsPerPage = 10;

const loadCancelledAppointments = async () => {
    const appointments = await fetchAppointments();
    const cancelledList = document.getElementById('cancelled-list');
    cancelledList.innerHTML = ''; // Clear previous content

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight

    const appointmentList = appointments.filter(appointment => {
        const appointmentDate = new Date(appointment.date);
        appointmentDate.setHours(0, 0, 0, 0);

        return appointment.status === 'cancelled' || 
              (appointment.status === 'upcoming' && appointmentDate < today);
    });

    // Sort the appointments by date from latest to oldest
    appointmentList.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (appointmentList.length === 0) {
        cancelledList.innerHTML = '<p>No cancelled or overdue appointments.</p>';
    } else {
        // Calculate pagination details
        const totalCancelledPages = Math.ceil(appointmentList.length / cancelledItemsPerPage);
        const startIndex = (currentCancelledPage - 1) * cancelledItemsPerPage;
        const endIndex = startIndex + cancelledItemsPerPage;
        const paginatedAppointments = appointmentList.slice(startIndex, endIndex);

        // Group appointments by month
        const groupedAppointments = {};
        paginatedAppointments.forEach(appointment => {
            const appointmentMonth = new Date(appointment.date).toLocaleString('default', { month: 'long', year: 'numeric' });
            if (!groupedAppointments[appointmentMonth]) {
                groupedAppointments[appointmentMonth] = [];
            }
            groupedAppointments[appointmentMonth].push(appointment);
        });

        // Sort the months
        const sortedMonths = Object.keys(groupedAppointments).sort((a, b) => {
            const dateA = new Date(a);
            const dateB = new Date(b);
            return dateB - dateA;
        });

        // Render appointments grouped by month
        sortedMonths.forEach(month => {
            const monthHeader = document.createElement('h3');
            monthHeader.textContent = month;
            monthHeader.classList.add('cancelled-month-header');
            cancelledList.appendChild(monthHeader);

            const appointmentsForMonth = groupedAppointments[month].sort((a, b) => new Date(b.date) - new Date(a.date));

            appointmentsForMonth.forEach(appointment => {
                const bookingCard = document.createElement('div');
                bookingCard.classList.add('appointment-card');

                bookingCard.innerHTML = `
                    <div class="appointment-date">
                        <span class="day">${new Date(appointment.date).toLocaleString('en-us', { weekday: 'short' })}</span>
                        <span class="date">${new Date(appointment.date).getDate()}</span>
                    </div>
                    <div class="appointment-details">
                        <h3 class="client-name">${appointment.name}</h3>
                        <div class="contact-vehicle">
                            <p class="contact"><i class="icon-contact"></i> ${appointment.contact}</p>
                            <p class="vehicle"><i class="icon-vehicle"></i> ${appointment.vehicle}</p>
                        </div>
                        <div class="service-mechanic">
                            <p class="mechanic"><i class="icon-mechanic"></i> ${appointment.mechanic}</p>
                            <p class="service"><i class="icon-service"></i> ${appointment.service}</p>
                        </div>
                        <div class="time-platenumber">
                            <p class="time"><i class="icon-time"></i> ${appointment.time}</p>
                            <p class="platenumber"><i class="icon-platenumber"></i> ${appointment.platenumber}</p>
                        </div>
                    </div>
                    <div class="appointment-actions">
                        <button class="edit-btn" data-id="${appointment.id}">Edit <i class="icon-dropdown"></i></button>
                    </div>
                `;

                bookingCard.querySelector('.edit-btn').addEventListener('click', (event) => {
                    openEditPopup(appointment.id, appointment.status, event.target);
                });

                cancelledList.appendChild(bookingCard);
            });
        });

        // Render pagination controls
        renderCancelledPaginationControls(totalCancelledPages);
    }
};


const renderCancelledPaginationControls = (totalPages) => {
    const paginationContainer = document.getElementById('cancelled-pagination-controls');
    paginationContainer.innerHTML = ''; // Clear previous controls

    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.disabled = currentCancelledPage === 1;
    prevButton.addEventListener('click', () => {
        currentCancelledPage--;
        loadCancelledAppointments();
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
    });
    paginationContainer.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
        const pageNumber = document.createElement('span');
        pageNumber.textContent = i;
        pageNumber.classList.add('page-number');
        if (i === currentCancelledPage) {
            pageNumber.classList.add('active');
        }
        pageNumber.addEventListener('click', () => {
            currentCancelledPage = i;
            loadCancelledAppointments();
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
        });
        paginationContainer.appendChild(pageNumber);
    }

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.disabled = currentCancelledPage === totalPages;
    nextButton.addEventListener('click', () => {
        currentCancelledPage++;
        loadCancelledAppointments();
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
    });
    paginationContainer.appendChild(nextButton); 
};

// Initial load and add pagination container in HTML
loadCancelledAppointments();


document.querySelector('.tab[data-tab="pending"]').addEventListener('click', function() {
    loadPendingAppointments();  // Load pending appointments when Pending tab is clicked
});

// Tab switching for Upcoming tab
document.querySelector('.tab[data-tab="upcoming"]').addEventListener('click', function() {
    loadAppointments();  // Load upcoming appointments when Upcoming tab is clicked
});
// Open the edit popup and display relevant buttons based on the appointment status
// Function to open the edit modal
let activeButton = null; // Track the currently active button
let popup = document.getElementById('edit-popup');  // Access popup element

// Function to open the edit modal
const openEditPopup = (appointmentId, status, buttonElement) => {
    if (popup.classList.contains('active')) {
        closeEditPopup();  // Close any active popup
    }

    activeButton = buttonElement; 
    activeButton.style.backgroundColor = '#282959';
    activeButton.style.color = '#E8E8E8';

    popup.setAttribute('data-id', appointmentId);
    console.log(`Opening popup for appointment ID: ${appointmentId}`);
    popup.classList.add('active');

    const buttonRect = buttonElement.getBoundingClientRect();
    popup.style.top = `${buttonRect.bottom + window.scrollY}px`;
    popup.style.left = `${buttonRect.left}px`;

    const tabContent = document.querySelector('.tab-content.active');
    tabContent.appendChild(popup);

    const popupContent = document.querySelector('.popup-content ul');
    popupContent.innerHTML = '';  // Reset popup content

    // Populate popup content based on status
    if (status === 'pending') {
        popupContent.innerHTML = `
            <li><button id="approve-btn" class="icon-approve">Approve Appointment</button></li>
            <li><button id="decline-btn" class="icon-decline">Refuse Appointment</button></li>
            <li><button id="sms-history-btn" class="icon-sms-history">SMS History</button></li>
        `;
    
        document.getElementById('approve-btn').addEventListener('click', () => {
            moveAppointmentToTab(appointmentId, 'upcoming');
            closeEditPopup();  // Close after approving

            // Call function to send approval SMS
            sendApprovalSMS(appointmentId);
        });
    
        document.getElementById('decline-btn').addEventListener('click', () => {
            // Cancel the appointment
            cancelAppointmentToTab(appointmentId, 'cancelled');
            closeEditPopup(); // Close after declining
        
            // Call the function to send SMS when declined
            sendDeclineSMS(appointmentId);
        });
        
    
        document.getElementById('sms-history-btn').addEventListener('click', () => {
            openSmsHistoryPopup(appointmentId);  // Function to open the SMS history popup
            closeEditPopup();
        });
    } else if (status === 'upcoming') {
        popupContent.innerHTML = `
            <li><button id="reschedule-btn" class="icon-reschedule">Reschedule Booking</button></li>
            <li><button id="finish-btn" class="icon-finish">Finish Booking</button></li>
            <li><button id="cancel-btn" class="icon-cancel">Cancel Appointment</button></li>
            <li><button id="sms-history-btn" class="icon-sms-history">SMS History</button></li>
        `;

        document.getElementById('reschedule-btn').addEventListener('click', () => {
            const appointmentId = popup.getAttribute('data-id');  // Make sure this ID is fetched properly
            console.log('Reschedule button clicked for appointment ID:', appointmentId);
        
            // Ensure the correct appointment ID is set in the popup
            popup.setAttribute('data-id', appointmentId);
        
            closeEditPopup(); // Close the edit popup
        
            const reschedulePopup = document.getElementById('reschedule-popup');
            reschedulePopup.style.display = 'flex'; // Show the popup
        
            // Render the reschedule calendar
            const currentDate = new Date();  // Use the current date to start the calendar
            renderRescheduleCalendar(currentDate, appointmentId);  // Pass the appointmentId here
        });
        
        
        // Handle closing of the popup
        document.getElementById('cancel-reschedule').addEventListener('click', () => {
            const reschedulePopup = document.getElementById('reschedule-popup');
            reschedulePopup.style.display = 'none'; // Hide the popup
        
            // Reset selected values
            document.getElementById('appointment-date').value = '';
            document.getElementById('appointment-time').value = '';
            document.getElementById('selected-mechanic').value = '';
        
            // Clear previous selections in the calendar
            document.querySelectorAll('.calendar-date').forEach(date => date.classList.remove('selected'));
            
            // Clear time slots and mechanics
            document.getElementById('time-slots').innerHTML = '';
            document.getElementById('available-mechanics').innerHTML = '';
        });

        document.getElementById('finish-btn').addEventListener('click', () => {
            pastAppointmentToTab(appointmentId, 'past');
            closeEditPopup();  // Close after finishing
        });

        document.getElementById('cancel-btn').addEventListener('click', () => {
            cancelAppointmentToTab(appointmentId, 'cancelled');
            closeEditPopup();  // Close after cancelling

            // Call the function to send SMS when declined
             sendDeclineSMS(appointmentId);
        });
        document.getElementById('sms-history-btn').addEventListener('click', () => {
            openSmsHistoryPopup(appointmentId);  // Function to open the SMS history popup
            closeEditPopup();
        });
    } else if (status === 'cancelled') {
        popupContent.innerHTML = `
            <li><button id="reschedule-btn" class="icon-reschedule">Reschedule Booking</button></li>
            <li><button id="sms-history-btn" class="icon-sms-history">SMS History</button></li>
        `;

        document.getElementById('reschedule-btn').addEventListener('click', () => {
            const appointmentId = popup.getAttribute('data-id');
            console.log('Reschedule button clicked for appointment ID:', appointmentId);
            
            closeEditPopup();  // Close the current popup
    
            const reschedulePopup = document.getElementById('reschedule-popup');
            reschedulePopup.style.display = 'flex';  // Show the reschedule popup
            
            // Render the reschedule calendar
            const currentDate = new Date();
            renderRescheduleCalendar(currentDate, appointmentId);  // Pass the appointmentId to the calendar
        });

        document.getElementById('sms-history-btn').addEventListener('click', () => {
            openSmsHistoryPopup(appointmentId);  // Function to open the SMS history popup
            closeEditPopup();
        });

        // Handle closing of the popup
        document.getElementById('cancel-reschedule').addEventListener('click', () => {
            const reschedulePopup = document.getElementById('reschedule-popup');
            reschedulePopup.style.display = 'none'; // Hide the popup
        
            // Reset selected values
            document.getElementById('appointment-date').value = '';
            document.getElementById('appointment-time').value = '';
            document.getElementById('selected-mechanic').value = '';
        
            // Clear previous selections in the calendar
            document.querySelectorAll('.calendar-date').forEach(date => date.classList.remove('selected'));
            
            // Clear time slots and mechanics
            document.getElementById('time-slots').innerHTML = '';
            document.getElementById('available-mechanics').innerHTML = '';
        });
    }
}; 
// Function to open the SMS history popup
function openSmsHistoryPopup(appointmentId) {
    // Create the overlay
    const smsOverlay = document.createElement('div');
    smsOverlay.classList.add('sms-overlay');
    document.body.appendChild(smsOverlay);

    // Create the popup
    const smsPopup = document.createElement('div');
    smsPopup.classList.add('sms-popup');
    smsPopup.innerHTML = `
        <div class="sms-popup-content">
            <h2>SMS History</h2>
            <div id="appointment-details">Loading details...</div>
            <div id="sms-logs">Loading SMS history for appointment ID: ${appointmentId}...</div>
            <div class="sms-buttons">
                <button class="sms-close-btn" onclick="closeSmsPopup()">CLOSE</button>
                <button class="sms-resend-btn" onclick="resendMessage(${appointmentId})">RESEND</button>
            </div>
        </div>
    `;
    document.body.appendChild(smsPopup);

    // Add event listener to the overlay to close the popup when clicked outside
    smsOverlay.addEventListener('click', closeSmsPopup);

    // Utility function to capitalize the first letter of a string
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    // Fetch and display SMS history logic (remove 'type' from the query)
    fetch(`get_sms_history.php?appointmentId=${appointmentId}`)
        .then(response => response.json())
        .then(data => {
            const appointmentDetailsDiv = document.getElementById('appointment-details');
            const smsLogsDiv = document.getElementById('sms-logs');

            if (data.appointmentDetails) {
                let { first_name, last_name } = data.appointmentDetails;
                first_name = capitalizeFirstLetter(first_name);
                last_name = capitalizeFirstLetter(last_name);
                const contactNumber = data.appointmentDetails && data.appointmentDetails.contact_number ? data.appointmentDetails.contact_number : 'N/A';

                appointmentDetailsDiv.innerHTML = `
                    <div class="appointment-info">
                        <p class="appointment-name"><strong>${last_name}, ${first_name}</strong></p>
                        <p class="appointment-contact">${contactNumber}</p>
                    </div>
                `;
            } else {
                appointmentDetailsDiv.innerHTML = '<p>No appointment details found.</p>';
            }

            if (data.smsLogs.length > 0) {
                smsLogsDiv.innerHTML = `
                    <div class="sms-history-box">
                        ${data.smsLogs.map(log => {
                            const sentDate = log.sent_at ? log.sent_at.split(' ')[0] : 'N/A'; // Extract the date
                            const sentTime = log.sent_at ? log.sent_at.split(' ')[1] : 'N/A'; // Extract the time
                            const borderClass = log.status === 'failed' ? 'sms-log-failed' : 'sms-log-success';
            
                            return `
                                <div class="sms-log ${borderClass}">
                                    <div class="sms-sent-date">${sentDate}</div>
                                    <div class="sms-container">
                                        <div class="sms-message">
                                            ${log.message}
                                        </div>
                                        <div class="sms-sent-time-status">${sentTime} - ${log.status}</div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `;
            } else {
                smsLogsDiv.innerHTML = '<p>No SMS history found for this appointment.</p>';
            }                
            
        })
        .catch(error => {
            console.error('Error fetching SMS history:', error);
            document.getElementById('sms-logs').innerHTML = '<p>Error loading SMS history. Please try again later.</p>';
        });
}


// Close function for the popup
function closeSmsPopup() {
    const smsPopup = document.querySelector('.sms-popup');
    const smsOverlay = document.querySelector('.sms-overlay');
    if (smsPopup && smsOverlay) {
        document.body.removeChild(smsPopup);
        document.body.removeChild(smsOverlay);
    }
}


// Function to handle the resend button click using appointmentId
function resendMessage(appointmentId) {
    fetch(`resend_sms_booking.php?appointmentId=${appointmentId}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Message resent successfully.');
            } else {
                alert('Failed to resend message: ' + (data.error || 'Unknown error.'));
            }
        })
        .catch(error => {
            console.error('Error resending message:', error);
            alert('Error resending message. Please try again later.');
        });
}
function sendDeclineSMS(appointmentId) {
    // Send SMS when the appointment is declined
    fetch('send_decline_sms.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `appointmentId=${appointmentId}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('SMS sent and logged successfully.');
        } else {
            alert('Failed to send SMS: ' + (data.error || 'Unknown error.'));
        }
    })
    .catch(error => {
        console.error('Error sending SMS:', error);
        alert('Error sending SMS. Please try again later.');
    });
}
function sendApprovalSMS(appointmentId) {
    fetch('send_approval_sms.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `appointmentId=${appointmentId}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Approval SMS sent successfully.');
        } else {
            alert('Failed to send approval SMS: ' + (data.error || 'Unknown error.'));
        }
    })
    .catch(error => {
        console.error('Error sending approval SMS:', error);
        alert('Error sending approval SMS. Please try again later.');
    });
}








// Function to close the popup
const closeEditPopup = () => {

    if (popup.classList.contains('active')) {
        popup.classList.remove('active');
        if (activeButton) {
            activeButton.style.backgroundColor = '#f0f0f0';
            activeButton.style.color = '#666';
        }
        popup.setAttribute('data-id', '');
    }
};

// Close popup when clicking outside or switching tabs/dates
document.addEventListener('click', (event) => {
    if (popup.classList.contains('active') && !popup.contains(event.target) && !event.target.classList.contains('edit-btn')) {
        closeEditPopup();
    }
});

// Close popup when switching tabs
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        closeEditPopup();  // Automatically close popup when switching tabs
    });
});

// Also close popup when switching dates
document.querySelectorAll('.calendar-day').forEach(day => {
    day.addEventListener('click', () => {
        closeEditPopup();  // Automatically close popup when switching dates
    });
});


// Function to update appointment status
const updateAppointmentStatus = (appointmentId, newStatus) => {
    const appointment = appointments.find(app => app.id === appointmentId);
    appointment.status = newStatus; // Update the status in the array
};
// Function to show or hide the calendar based on the active tab
const toggleCalendarVisibility = (tabContentId) => {
    const calendarContainer1 = document.querySelector('.calendar-container1');  // Main calendar container
    const reschedulePopup = document.getElementById('reschedule-popup');      // Reschedule popup
    const calendarContainer2 = document.querySelector('.calendar-container2');   // Reschedule calendar container

    // Show the calendar only in the "upcoming" tab
    if (tabContentId === 'upcoming') {
        calendarContainer1.style.display = 'block';  // Show calendar in the upcoming tab
        calendarContainer1.style.position = 'static';  // Reset position to normal
        calendarContainer1.style.left = '0';  // Reset the position to ensure it's visible
        calendarContainer2.style.display = 'block';  // Hide the reschedule calendar
        reschedulePopup.style.display = 'none';     // Hide reschedule popup by default
    } else if (tabContentId === 'cancelled') {
        // Hide the main calendar in the cancelled tab
        calendarContainer1.style.display = 'block';
        calendarContainer1.style.position = 'absolute';
        calendarContainer1.style.left = '-9999px';  // Move off-screen
        calendarContainer2.style.display = 'block';  // Show the reschedule calendar
        
        // Ensure the reschedule popup is hidden initially; only show when button is clicked
        reschedulePopup.style.display = 'none';
    } else {
        // Hide calendar for all other tabs
        calendarContainer1.style.display = 'none';
        reschedulePopup.style.display = 'none';     // Hide reschedule popup by default
    }
};





// Handle tab switching to ensure the calendar reappears
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('next-month').addEventListener('click', nextMonth);
    document.getElementById('prev-month').addEventListener('click', prevMonth);

    
 
  // Modify the event listener for tab switching
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const tabContentId = this.getAttribute('data-tab');

        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        // Show the selected tab content
        document.getElementById(tabContentId).classList.add('active');

        // Remove 'active' class from all tabs and add it to the clicked one
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        // Show or hide the calendar
        toggleCalendarVisibility(tabContentId);  // Control calendar visibility

        // Clear the selected date when leaving the upcoming tab
        if (tabContentId !== 'upcoming') {
            document.querySelectorAll('.calendar-day').forEach(day => day.classList.remove('selected'));
        }

        // Load appointments based on the selected tab
        if (tabContentId === 'pending') {
            loadPendingAppointments();   // Load pending appointments
        } else if (tabContentId === 'upcoming') {
            renderCalendar();  // Re-render the calendar when switching back to upcoming
        } else if (tabContentId === 'past') {
            loadPastAppointments();      // Load past appointments
        } else if (tabContentId === 'cancelled') {
            loadCancelledAppointments(); // Load cancelled appointments
        }   
    });
});

    // Trigger the initial tab load
    document.querySelector('.tab[data-tab="upcoming"]').click();
});
function renderRescheduleCalendar(date, id) {
    console.log('renderRescheduleCalendar called with id:', id);
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    const calendarMonth = document.getElementById('calendar-month');
    const calendarDates = document.getElementById('calendar-dates');
    calendarMonth.textContent = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    calendarDates.innerHTML = '';  // Clear previous dates

    const today = new Date();

    // Add empty divs for alignment
    for (let i = 0; i < firstDayIndex; i++) {
        const emptyDiv = document.createElement('div');
        calendarDates.appendChild(emptyDiv);
    }

    // Render the days in the month
    for (let i = 1; i <= lastDay; i++) {
        const dateDiv = document.createElement('div');
        const currentDay = new Date(year, month, i);
        const formattedDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
        dateDiv.textContent = i;
        dateDiv.dataset.date = formattedDate;
        dateDiv.classList.add('calendar-date');

        // Disable past dates
        if (currentDay < today.setHours(0, 0, 0, 0)) {
            dateDiv.classList.add('disabled');
            dateDiv.style.pointerEvents = 'none';
            dateDiv.style.color = '#ccc';
        } 
        // Disable Sundays
        else if (currentDay.getDay() === 0) {  // 0 represents Sunday
            dateDiv.classList.add('disabled');
            dateDiv.style.pointerEvents = 'none';
            dateDiv.style.color = '#ccc';
        } 
        else {
            // Pass the id along with the date click
            dateDiv.addEventListener('click', function () {
                handleDateClick(formattedDate, id);  // Pass id along with the date click
            });
        }

        calendarDates.appendChild(dateDiv);
    }

    // Pass the appointmentId directly to the confirm-reschedule button
    const confirmRescheduleButton = document.getElementById('confirm-reschedule');
    confirmRescheduleButton.dataset.appointmentId = id;  // Set the appointmentId in the button's dataset

    // Fetch bookings and update calendar with fully booked dates
    fetch(`fetch_booking.php?month=${year}-${(month + 1).toString().padStart(2, '0')}`)
        .then(response => response.json())
        .then(data => {
            const fullyBookedDates = data.fullyBookedDates || [];
            
            fullyBookedDates.forEach(fullyBookedDate => {
                const fullyBookedDateElement = document.querySelector(`[data-date="${fullyBookedDate}"]`);
                const bookedDate = new Date(fullyBookedDate);

                if (bookedDate >= today && fullyBookedDateElement) {
                    fullyBookedDateElement.style.backgroundColor = 'red';
                    fullyBookedDateElement.style.pointerEvents = 'none';  // Disable interaction
                }
            });
        })
        .catch(error => console.error('Error fetching fully booked dates:', error));
}

function generateTimeSlots(date, id) {
    console.log('generateTimeSlots called with:', { date, id });  // Log the date and id

    fetch(`fetch_booking.php?date=${date}`)
        .then(response => response.json())
        .then(data => {
            const slotCounts = data.slotCounts || {};
            const timeSlotsContainer = document.getElementById('time-slots');
            timeSlotsContainer.innerHTML = '';  // Clear previous time slots

            const timeSlots = [10, 11, 13, 14, 15];  // Updated time slots: 10:00, 11:00, 1:00, 2:00, 3:00

            timeSlots.forEach(hour => {
                const timeSlot = `${hour.toString().padStart(2, '0')}:00:00`;  // Format time slot
                const slotDiv = document.createElement('div');
                slotDiv.classList.add('time-slot');
                slotDiv.textContent = `${hour.toString().padStart(2, '0')}:00`;

                // Check if the time slot is fully booked
                if (slotCounts[timeSlot] >= 3) {
                    slotDiv.classList.add('fully-booked');
                    const fullyBookedSpan = document.createElement('span');
                    fullyBookedSpan.textContent = " (Fully Booked)";
                    fullyBookedSpan.style.fontSize = "12px";
                    fullyBookedSpan.style.color = "#999";
                    slotDiv.appendChild(fullyBookedSpan);
                    slotDiv.style.pointerEvents = 'none';  // Disable interaction on fully booked slots
                } else {
                    slotDiv.addEventListener('click', function () {
                        // Remove 'selected' class from all other time slots
                        document.querySelectorAll('.time-slot').forEach(slot => slot.classList.remove('selected'));

                        // Highlight the selected time slot
                        slotDiv.classList.add('selected');

                        // Store the selected time
                        document.getElementById('appointment-time').value = timeSlot;

                        console.log('Time slot selected:', timeSlot, 'for appointment ID:', id);  // Log the selected time and id

                        // Show available mechanics for the selected date and time
                        showAvailableMechanics(date, timeSlot, id);
                    });
                }

                timeSlotsContainer.appendChild(slotDiv);
            });
        })
        .catch(error => console.error('Error fetching booking counts:', error));
}

function showAvailableMechanics(date, time, id) {
    console.log('showAvailableMechanics called with:', { date, time, id });  // Log the date, time, and id

    fetch(`fetch_mechanics.php?date=${date}&time=${time}`)
        .then(response => response.json())
        .then(data => {
            const mechanicsContainer = document.getElementById('available-mechanics');
            mechanicsContainer.innerHTML = '';  // Clear previous mechanics

            const mechanics = data.mechanics || [];

            if (mechanics.length > 0) {
                mechanics.forEach(mechanic => {
                    const mechanicDiv = document.createElement('div');
                    mechanicDiv.classList.add('available-mechanic');
                    mechanicDiv.textContent = mechanic;

                    if (data.bookedMechanics.includes(mechanic)) {
                        // If the mechanic is booked, disable selection
                        mechanicDiv.classList.add('disabled');
                        mechanicDiv.style.pointerEvents = 'none';
                        mechanicDiv.style.opacity = '0.5';
                    } else {
                        mechanicDiv.addEventListener('click', function () {
                            // Remove 'selected' class from other mechanics
                            document.querySelectorAll('.available-mechanic').forEach(m => m.classList.remove('selected'));
                            
                            // Highlight selected mechanic
                            mechanicDiv.classList.add('selected');

                            // Store the selected mechanic
                            document.getElementById('selected-mechanic').value = mechanic;

                            // Log the selected mechanic and id
                            console.log(`Mechanic ${mechanic} selected for appointment ID: ${id}`);
                        });
                    }

                    mechanicsContainer.appendChild(mechanicDiv);
                });
            } else {
                mechanicsContainer.innerHTML = '<p>No mechanics available for this time slot.</p>';
            }
        })
        .catch(error => console.error('Error fetching mechanics:', error));
}




function handleDateClick(selectedDate, id) {
    console.log('handleDateClick called with:', {selectedDate, id});  // Log the selected date and id

    if (!id) {
        console.error('ID is missing! Make sure it is passed correctly.');
        return;
    }

    document.getElementById('appointment-date').value = selectedDate;
    // Remove 'selected' class from all other dates
    const allDates = document.querySelectorAll('.calendar-date');
    allDates.forEach(date => date.classList.remove('selected'));

    // Add 'selected' class to the clicked date
    document.querySelector(`[data-date="${selectedDate}"]`).classList.add('selected');

    // Clear mechanic selection when date changes
    document.getElementById('selected-mechanic').value = '';  // Clear the mechanic field

    // Clear mechanic UI
    const mechanicsContainer = document.getElementById('available-mechanics');
    mechanicsContainer.innerHTML = ''; // Clear previously displayed mechanics

    // Generate time slots for the selected date
    generateTimeSlots(selectedDate, id);  // Use 'id' here instead of appointment_id
}



function showAvailableMechanicsForDate(date, id) {
    console.log('showAvailableMechanicsForDate called with:', { date, id });  // Log the date and id
    const mechanicsContainer = document.getElementById('available-mechanics');
    mechanicsContainer.innerHTML = '';  // Clear previous mechanics

    // Fetch available mechanics from the backend based on the selected date
    fetch(`fetch_mechanics_by_day.php?date=${date}`)
        .then(response => response.json())
        .then(data => {
            const mechanics = data.mechanics || [];

            if (mechanics.length > 0) {
                mechanics.forEach(mechanic => {
                    const mechanicDiv = document.createElement('div');
                    mechanicDiv.className = 'available-mechanic';
                    mechanicDiv.textContent = mechanic.name;

                    mechanicDiv.dataset.mechanicName = mechanic.name;  // Store mechanic name for later filtering
                    mechanicDiv.addEventListener('click', function () {
                        // Remove 'selected' class from other mechanics
                        document.querySelectorAll('.available-mechanic').forEach(m => m.classList.remove('selected'));

                        // Highlight the selected mechanic
                        mechanicDiv.classList.add('selected');

                        // Store the selected mechanic
                        document.getElementById('selected-mechanic').value = mechanic.name;

                        // Log id with selected mechanic (optional)
                        console.log(`Mechanic ${mechanic.name} selected for appointment ID: ${id}`);
                    });

                    mechanicsContainer.appendChild(mechanicDiv);
                });
                mechanicsContainer.classList.add('active'); // Add active class if mechanics are displayed
            } else {
                mechanicsContainer.innerHTML = '<p style="font-size: 2em; color: #666;">No mechanics available for this date.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching mechanics:', error);
            mechanicsContainer.innerHTML = '<p style="font-size: 2em; color: #666;">Unable to fetch mechanics.</p>';
        });
}


// Event listener for the confirm reschedule button
document.getElementById('confirm-reschedule').addEventListener('click', async () => {
    // Fetch the appointment ID from the button's dataset
    const appointmentId = document.getElementById('confirm-reschedule').dataset.appointmentId;
    console.log('Fetched appointment ID from button dataset:', appointmentId);

    const newDate = document.getElementById('appointment-date').value;
    const newTime = document.getElementById('appointment-time').value;
    const newMechanic = document.getElementById('selected-mechanic').value;

    // Log the new appointment details
    console.log('New Date:', newDate, 'New Time:', newTime, 'New Mechanic:', newMechanic);

    // Ensure all fields are filled, including appointment ID
    if (!newDate || !newTime || !newMechanic || !appointmentId) {
        alert('Please select a date, time, mechanic, and ensure the appointment ID is valid.');
        return;
    }

    try {
        const response = await fetch('reschedule_appointment.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                id: appointmentId,  // Ensure the appointment ID is sent correctly
                date: newDate,
                time: newTime,
                mechanic: newMechanic
            })
        });

        const result = await response.json();
        console.log('Server response:', result); // Log the server response

        if (response.ok) {
            alert('Appointment rescheduled successfully.');
            
            // Call loadAppointments to refresh the upcoming appointments content
            loadAppointments(newDate);  // Refresh the appointment list for the new date

            closeReschedulePopup();  // Close the reschedule popup
            
            // Optional: Automatically switch to the upcoming tab to show the updated appointments
            document.querySelector('.tab[data-tab="upcoming"]').click();
        } else {
            alert('Failed to reschedule appointment. Please try again.');
        }
    } catch (error) {
        console.error('Error rescheduling appointment:', error);
    }
});

// Function to close the reschedule popup
const closeReschedulePopup = () => {
    const reschedulePopup = document.getElementById('reschedule-popup');
    reschedulePopup.style.display = 'none'; // Hide the popup

    // Reset selected values
    document.getElementById('appointment-date').value = '';
    document.getElementById('appointment-time').value = '';
    document.getElementById('selected-mechanic').value = '';

    // Clear previous selections in the calendar
    document.querySelectorAll('.calendar-date').forEach(date => date.classList.remove('selected'));
    
    // Clear time slots and mechanics
    document.getElementById('time-slots').innerHTML = '';
    document.getElementById('available-mechanics').innerHTML = '';
};



let currentDate = new Date();  // Track the current date to allow month navigation

document.querySelector('.chevron-left').addEventListener('click', function () {
    currentDate.setMonth(currentDate.getMonth() - 1);  // Move to the previous month
    renderRescheduleCalendar(currentDate);  // Re-render the calendar for the new month
});

document.querySelector('.chevron-right').addEventListener('click', function () {
    currentDate.setMonth(currentDate.getMonth() + 1);  // Move to the next month
    renderRescheduleCalendar(currentDate);  // Re-render the calendar for the new month
});


// Initialize the page when loaded
const initPage = () => {
    renderCalendar();
};


window.onload = initPage;