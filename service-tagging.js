const fetchAppointments = async () => {
    try {
        const response = await fetch('get_appointments_with_progress.php'); // Fetch all appointments from the new PHP file
        const data = await response.json(); // Parse response to JSON
        return data; // Return appointment data
    } catch (error) {
        console.error('Error fetching appointments:', error);
        return []; // Return an empty array if error occurs
    }
};
const toggleProgressReportButton = (jobOrder) => {
    const progressReportBtn = document.querySelector(`.progress-report-btn[data-id="${jobOrder.id}"]`);

    if (jobOrder.progress_report_enabled) {
        progressReportBtn.disabled = false;  // Enable the button
    } else {
        progressReportBtn.disabled = true;   // Keep it disabled
    }
};

// Function to filter appointments with "complete" status and render them in the ticketing module
let currentTicketPage = 1;
const ticketsPerPage = 10;

const renderTickets = async () => {
    const appointments = await fetchAppointments(); // Fetch all appointments
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const completeAppointments = appointments.filter(appointment => {
        const appointmentDate = new Date(appointment.date);
        appointmentDate.setHours(0, 0, 0, 0);
        return appointment.status === 'past';
    });

    // Sort completeAppointments by date
    completeAppointments.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Calculate pagination details
    const totalTicketPages = Math.ceil(completeAppointments.length / ticketsPerPage);
    const startIndex = (currentTicketPage - 1) * ticketsPerPage;
    const endIndex = startIndex + ticketsPerPage;
    const paginatedAppointments = completeAppointments.slice(startIndex, endIndex);

    const ticketingList = document.getElementById('ticketing-list');
    ticketingList.innerHTML = ''; // Clear previous content

    let currentMonth = null;

    paginatedAppointments.forEach(appointment => {
        const appointmentDate = new Date(appointment.date);
        const month = appointmentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

        if (currentMonth !== month) {
            currentMonth = month;
            const monthHeader = document.createElement('h2');
            monthHeader.classList.add('month-header');
            monthHeader.textContent = currentMonth;
            ticketingList.appendChild(monthHeader);
        }

        const day = appointmentDate.toLocaleDateString('en-US', { weekday: 'short' });
        const date = appointmentDate.getDate();

        const appointmentCard = document.createElement('div');
        appointmentCard.classList.add('appointment-card');

        appointmentCard.innerHTML = `
            <div class="appointment-date">
                <span class="day">${day}</span>
                <span class="date">${date}</span>
            </div>
            <div class="appointment-details">
                <h3 class="client-name">${appointment.name}</h3>
                <div class="contact-vehicle">
                    <p class="contact"><i class="fas fa-phone"></i> ${appointment.contact}</p>
                    <p class="vehicle"><i class="fas fa-car"></i> ${appointment.vehicle}</p>
                </div>
                <div class="service-mechanic">
                    <p class="mechanic"><i class="fas fa-user"></i> ${appointment.mechanic}</p>
                    <p class="service"><i class="fas fa-tools"></i> ${appointment.service}</p>
                </div>
                <p class="time"><i class="fas fa-clock"></i> ${appointment.time}</p>
            </div>
            <div class="appointment-actions">
                <button class="progress-report-btn" data-id="${appointment.id}" ${appointment.progress_report_enabled ? '' : 'disabled'}>Progress Report</button>
                <button class="edit-btn" data-id="${appointment.id}">Edit</button>
            </div>
        `;

        ticketingList.appendChild(appointmentCard);
    });

    const progressReportButtons = document.querySelectorAll('.progress-report-btn');
    progressReportButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const appointmentId = event.target.getAttribute('data-id');
            toggleProgressReportPopup(appointmentId, event.target);
        });
    });

    const editButtons = document.querySelectorAll('#ticketing-list .edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const appointmentId = event.target.getAttribute('data-id');
            toggleEditPopup(appointmentId, event.target);
        });
    });

    // Render pagination controls
    renderTicketPaginationControls(totalTicketPages);
};

const renderTicketPaginationControls = (totalPages) => {
    const paginationContainer = document.getElementById('ticketing-pagination-controls');
    paginationContainer.innerHTML = ''; // Clear previous controls

    const maxVisiblePages = 5;
    const startPage = Math.floor((currentTicketPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    // Previous button
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.disabled = currentTicketPage === 1;
    prevButton.addEventListener('click', () => {
        currentTicketPage--;
        renderTickets();
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
    });
    paginationContainer.appendChild(prevButton);

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
        const pageNumber = document.createElement('span');
        pageNumber.textContent = i;
        pageNumber.classList.add('page-number');
        if (i === currentTicketPage) {
            pageNumber.classList.add('active');
        }
        pageNumber.addEventListener('click', () => {
            currentTicketPage = i;
            renderTickets();
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
        });
        paginationContainer.appendChild(pageNumber);
    }

    // Next button
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.disabled = currentTicketPage === totalPages;
    nextButton.addEventListener('click', () => {
        currentTicketPage++;
        renderTickets();
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
    });
    paginationContainer.appendChild(nextButton);
};

// Initial load
renderTickets();




const fetchAppointmentById = async (ticketId) => {
    try {
        const response = await fetch(`get_appointment_by_id.php?id=${ticketId}`);
        const data = await response.json();
        return data; // Return the specific appointment data
    } catch (error) {
        console.error('Error fetching appointment by ID:', error);
        return null;
    }
};

// Function to generate a checklist for a specific appointment
const generateChecklist = (appointment) => {
    return `
        <!-- Business Information Section Above the Checklist -->
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

        
        <fieldset class="checklist-fieldset">
            <!-- First Name Field -->
            <div class="checklist-field">
                <label>First Name</label>
                <div class="input-like">
                    <i class="icon icon-name"></i>
                    <span>${appointment.first_name}</span>
                </div>
            </div>
            
            <!-- Last Name Field -->
            <div class="checklist-field">
                <label>Last Name</label>
                <div class="input-like">
                    <i class="icon icon-name"></i>
                    <span>${appointment.last_name}</span>
                </div>
            </div>
            
            <!-- Service Field -->
            <div class="checklist-field">
                <label>Service</label>
                <div class="input-like">
                    <i class="fas fa-tools"></i>
                    <span>${appointment.services}</span>
                </div>
            </div>
            
            <!-- Vehicle Field -->
            <div class="checklist-field">
                <label>Vehicle</label>
                <div class="input-like">
                    <i class="fas fa-car"></i>
                    <span>${appointment.car_brand} ${appointment.car_model} ${appointment.car_year} (${appointment.plate_number})</span>
                </div>
            </div>
            
            <!-- Mechanic Field -->
            <div class="checklist-field">
                <label>Mechanic</label>
                <div class="input-like">
                    <i class="fas fa-user"></i>
                    <input type="text" id="mechanicName" name="mechanicName" value="${appointment.mechanic}">
                </div>
            </div>

            <!-- Date Field -->
            <div class="checklist-field">
                <label>Date</label>
                <div class="input-like">
                    <i class="icon icon-date"></i>
                    <span>${appointment.appointment_date}</span>
                </div>
            </div>
            <div class="checklist-field">
                <label>Date of Last Oil Change</label>
                <div class="input-like">
                    <input type="text" id="lastOilChange" name="lastOilChange">
                </div>
            </div>

            <div class="checklist-field">
                <label>Date of Last Oil Filter Change</label>
                <div class="input-like">
                    <input type="text" id="lastOilFilterChange" name="lastOilFilterChange">
                </div>
            </div>

            <div class="checklist-field">
                <label>Date of Last Air Filter Change</label>
                <div class="input-like">
                    <input type="text" id="lastAirFilterChange" name="lastAirFilterChange">
                </div>
            </div>

            <div class="checklist-field">
                <label>Date of Last Cabin Filter Change</label>
                <div class="input-like">
                    <input type="text" id="lastCabinFilterChange" name="lastCabinFilterChange">
                </div>
            </div>

            <div class="checklist-field">
                <label>Date of Last Fuel Filter Change</label>
                <div class="input-like">
                    <input type="text" id="lastFuelFilterChange" name="lastFuelFilterChange">
                </div>
            </div>
        </fieldset>

        <!-- Inspection Checklist Section -->
        <div class="inspection-checklist">
            <h3>VEHICLE CONDITION</h3>
            <div class="checklist-grid">
                <div class="checklist-category">
                    <h4>UNDERHOOD</h4>
                    <ul>
                        <li><input type="checkbox"> 1. Battery</li>
                        <li><input type="checkbox"> 2. Radiator Cap</li>
                        <li><input type="checkbox"> 3. Coolant Fluid</li>
                        <li><input type="checkbox"> 4. Oil Cap</li>
                        <li><input type="checkbox"> 5. Oil Dipstick</li>
                        <li><input type="checkbox"> 6. Engine Level</li>
                        <li><input type="checkbox"> 7. ATF Level</li>
                        <li><input type="checkbox"> 8. Clutch Fluid</li>
                        <li><input type="checkbox"> 9. Steering Fluid</li>
                        <li><input type="checkbox"> 10. Belts & Hoses</li>
                        <li><input type="checkbox"> 11. Windshield Washer Fluid</li>
                        <li><input type="checkbox"> 12. Windshield Fluid</li>
                        <li><input type="checkbox"> 13. Brake Fluid</li>
                    </ul>
                </div>

                <div class="checklist-category">
                    <h4>INTERIOR</h4>
                    <ul>
                        <li><input type="checkbox"> 14. Ignition Switch</li>
                        <li><input type="checkbox"> 15. Master Clutch/Warning Lamps</li>
                        <li><input type="checkbox"> 16. Trunk Compartment</li>
                        <li><input type="checkbox"> 17. Aircondition/Knobs</li>
                        <li><input type="checkbox"> 18. Cigarette Lighter</li>
                        <li><input type="checkbox"> 19. Ashtray</li>
                        <li><input type="checkbox"> 20. Horn/Button</li>
                        <li><input type="checkbox"> 21. Radio/Monitor/CD/DVD</li>
                        <li><input type="checkbox"> 22. Speakers</li>
                        <li><input type="checkbox"> 23. Rear View Mirror</li>
                        <li><input type="checkbox"> 24. Sun Visor</li>
                        <li><input type="checkbox"> 25. Wiper Switch Blades</li>
                        <li><input type="checkbox"> 26. Gear Level</li>
                    </ul>
                </div>

                <div class="checklist-category">
                    <h4 style="opacity: 0;">INTERIOR</h4>
                    <ul>
                        <li><input type="checkbox"> 27. Seat Cover</li>
                        <li><input type="checkbox"> 28. Floor Mats</li>
                        <li><input type="checkbox"> 29. Parking Break</li>
                        <li><input type="checkbox"> 30. Glove Compartment</li>
                        <li><input type="checkbox"> 31. Power Windows Sitches</li>
                        <li><input type="checkbox"> 32. Door Locks</li>
                        <li><input type="checkbox"> 33. Door Lamps/Door Lights</li>
                        <li><input type="checkbox"> 34. Dash Board</li>
                        <li><input type="checkbox"> 35. Light Switch</li>
                        <li><input type="checkbox"> 36. Fuel Level</li>
                        <li><input type="checkbox"> 37. Others</li>
                    </ul>
                </div>

                <div class="checklist-category2">
                    <h4>EXTERIOR</h4>
                    <ul>
                        <li><input type="checkbox"> 38. Signal/Hazard Light</li>
                        <li><input type="checkbox"> 39. Back-up Light</li>
                        <li><input type="checkbox"> 40. Head/Park Lights</li>
                        <li><input type="checkbox"> 41. Fog Lights</li>
                        <li><input type="checkbox"> 42. Brake Lights</li>
                    </ul>
                </div>
                <div class="checklist-category2">
                    <h4 style="opacity: 0;">EXTERIOR</h4>
                    <ul>
                        <li><input type="checkbox"> 43. Spare Tire/Trim</li>
                        <li><input type="checkbox"> 44. Hub Caps</li>
                        <li><input type="checkbox"> 45. Tire Value Cap</li>
                        <li><input type="checkbox"> 46. Registration Plate</li>
                        <li><input type="checkbox"> 47. Antenna</li>
                    </ul>
                </div>
                <div class="checklist-category2">
                    <h4>TOOLS</h4>
                    <ul>
                        <li><input type="checkbox"> 48. Tire Wrench</li>
                        <li><input type="checkbox"> 49. Jack</li>
                        <li><input type="checkbox"> 50. Wrenches</li>
                        <li><input type="checkbox"> 51. Filers</li>
                        <li><input type="checkbox"> 52. Screw Drivers</li>
                    </ul>
                </div>

                <div class="checklist-category2">
                    <h4 style="opacity: 0;">TOOLS</h4>
                    <ul>
                        <li><input type="checkbox"> 53. Early Warning Device</li>
                        <li><input type="checkbox"> 54. Door Keys</li>
                        <li><input type="checkbox"> 55. Key Chain</li>
                        <li><input type="checkbox"> 56. Gas Tank Cap</li>
                        <li><input type="checkbox"> 57. Others</li>

                    </ul>
                </div>
            </div>
        </div>
        <div class="remarks-section">
            <h4>OTHER REMARKS</h4>
            <div class="input-like">
                <input type="text" id="remarks-input" style="width: 80%;">
            </div>
        </div> 

        <div class="car-image-section">
            <button id="markXButton">Mark X</button>
            <img src="car_checklist.png" alt="Car Diagram" class="car-diagram">
        </div>

        <!-- Signature Section -->
        <div class="signature-section">
            <div>
                <h4>Checked by:<h4>
                <p>____________________</p>
                <p>Name & Signature</p>
                <p>Date: _______________ Time: _____________</p>
            </div>
            <div>
                <h4>Conformed by:<h4>
                <p>______________________________</p>
                <p>Customer's Name & Signature</p>
                <p>Date: _______________ Time: _____________</p>
            </div>
        </div>
    `;
};

// Function to display the checklist popup
const showChecklistPopup = (checklist) => {
    const popup = document.getElementById('checklist-popup');
    const checklistContent = document.getElementById('checklist-content');
    
    // Set the content of the checklist
    checklistContent.innerHTML = `
        <div class="scrollable-content">
            ${checklist}
        </div>
    `;
    
    // Show the popup
    popup.classList.add('active');

    const markXButton = document.getElementById('markXButton');
    const carDiagram = document.querySelector('.car-diagram');

    if (markXButton && carDiagram) {
        carDiagram.parentElement.style.position = 'relative';

        markXButton.addEventListener('click', () => {
            const xMark = document.createElement('div');
            xMark.textContent = 'X';
            xMark.classList.add('x-mark');
            xMark.style.left = '50px';
            xMark.style.top = '50px';

            carDiagram.parentElement.appendChild(xMark);

            let isDragging = false;

            xMark.addEventListener('mousedown', (e) => {
                e.preventDefault();
                isDragging = true;
                const initialX = e.clientX - xMark.offsetLeft;
                const initialY = e.clientY - xMark.offsetTop;

                const onMouseMove = (moveEvent) => {
                    if (isDragging) {
                        xMark.style.left = `${moveEvent.clientX - initialX}px`;
                        xMark.style.top = `${moveEvent.clientY - initialY}px`;
                    }
                };

                const onMouseUp = () => {
                    isDragging = false;
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                };

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            });
        });
    }

    // Check if the button container already exists
    let buttonContainer = document.querySelector('.button-container');
    if (!buttonContainer) {
        // Create a new container if it doesn’t exist
        buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';

        // Create and add the Close button to the button container
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '<i class="fas fa-times"></i> Close';
        closeButton.id = 'close-checklist-btn';
        closeButton.classList.add('close-btn');
        buttonContainer.appendChild(closeButton);

        // Append the button container to the checklist content
        checklistContent.appendChild(buttonContainer);

        // Add event listener to the Close button
        closeButton.addEventListener('click', () => {
            popup.classList.remove('active'); // Hide the popup
            const printButton = document.getElementById('print-checklist-btn');
            if (printButton) printButton.remove(); // Remove the Print button on close
        });
    }

    // Remove any existing Print button before creating a new one
    const existingPrintButton = document.getElementById('print-checklist-btn');
    if (existingPrintButton) {
        existingPrintButton.remove();
    }

    // Create and configure the Print button
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-print"></i> Print';
    printButton.id = 'print-checklist-btn';
    buttonContainer.appendChild(printButton);

    // Add event listener to the Print button
    printButton.addEventListener('click', () => {
        printChecklist();
    });
};


const printChecklist = () => {
    const checklistPopup = document.getElementById('checklist-popup');
    const inputs = checklistPopup.querySelectorAll('input[type="text"]');
    const checkboxes = checklistPopup.querySelectorAll('input[type="checkbox"]');
    
    // Loop through the inputs and replace them with their values
    inputs.forEach(input => {
        const value = input.value;  // Get input value
        const span = document.createElement('span');
        span.textContent = value !== "" ? value : '';  // If value is empty, leave it empty
        span.style.display = 'inline-block';
        span.style.width = input.style.width;  // Use the width defined in the input's style
        span.style.height = '1em';  // Simulate two rows of text
        span.style.whiteSpace = 'normal';  // Allow text to wrap into multiple lines
        span.style.lineHeight = '1.0';  // Adjust line height for better readability
        span.style.verticalAlign = 'top';  // Align the text to the top 
        input.parentNode.replaceChild(span, input); // Match the width of the input field // Replace input with span containing the value
    });

    // Loop through the checkboxes and replace them with a checked/unchecked text
    checkboxes.forEach(checkbox => {
        const status = checkbox.checked ? '✔' : 'O';  // Mark as checked or unchecked
        const span = document.createElement('span');
        span.textContent = status;
        checkbox.parentNode.replaceChild(span, checkbox);  // Replace checkbox with its status
    });
    const WindowPrint = window.open('', '', 'width=900,height=650');
    
    WindowPrint.document.write(`
        <html>
            <head>
                <title>Print Checklist</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                    }
                    #print-checklist-btn {
                         display: none;
                    }
                    @page {
                        margin: 20px;
                    }

                    .scrollable-content {
                        max-height: none;
                        overflow: visible;
                    }

                    .popup-checklist-content {
                        width: 100%;
                        max-width: 100%;
                    }

                    h3, h4 {
                        margin: 0;
                        padding: 0;
                    }

                    /* Hide elements not required in the print */
                    #close-checklist-btn {
                        display: none;
                    }
                    
                    /* Container for business information */
                    .business-info {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin-bottom: 5px;
                    }

                    /* Align logo and business text side by side */
                    .business-details {
                        display: flex;
                        align-items: center; /* Vertically center the logo and text */
                        justify-content: center; /* Center horizontally */
                    }

                    /* Logo Styling */
                    .business-logo {
                        width: 120px; /* Adjust the width as needed */
                        height: auto;
                        margin-right: 20px; /* Add space between the logo and text */
                    }

                    /* Business Text Styling */
                    .business-text {
                        text-align: left; /* Align the text to the left */
                    }

                    .business-name {
                        margin: 0;
                        font-size: 20px;
                        font-weight: bold;
                    }

                    .business-address,
                    .business-contact {
                        margin: 0;
                        font-size: 14px;
                        line-height: 1.5;
                    }

                    .business-separator {
                        margin-top: 0px;
                        border: 0;
                        border-top: 1px solid #ccc;
                        width: 100%;
                    }
                    .inspection-checklist h3{
                        font-size: 12px;
                        margin-left: 10px;
                        margin-bottom: 10px;
                    }
                    #checklist-content ul {
                    padding-left: 20px;
                    }

                    #checklist-content ul li {
                        margin-bottom: 10px;
                    }
                    .checklist-fieldset {
                        border: none;
                        padding: 15px;
                        margin-top: -10px;
                    }

                    .checklist-legend {
                        grid-column: span 2; /* Make the legend span both columns */
                        font-weight: bold;
                        padding-left: 10px;
                        padding-right: 10px;
                    }

                    /* Grid layout for the first 6 fields */
                    .checklist-fieldset {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr); /* Create two columns */
                        gap: 15px; /* Add space between grid items */

                    }

                    .checklist-field:nth-child(n+12) {
                        grid-column: span 2; /* Any fields added after the 6th one will take the full width */
                    }

                    .checklist-field {
                        display: flex;
                        flex-direction: column;
                    }

                    .checklist-field label {
                        font-weight: bold;
                        margin-bottom: 5px;
                        font-family: 'Proxima Nova', sans-serif;
                        font-size: 12px;
                        color: #282959;
                        margin-top: -5px;
                    }

                    .input-like {
                        display: flex;
                        align-items: center;
                        border: 1px solid #ccc;
                        padding: 8px 12px;
                        border-radius: 4px;
                        background-color: #f9f9f9;
                    }
                    .input-like input[type="text"] {
                        width: 100%;
                        border: none;
                        outline: none;
                        font-size: 14px;
                        color: #333;
                        background-color: transparent;
                    }
                    
                    .input-like p {
                        font-size: 10px;
                    }
                    .input-like i {
                        margin-right: 8px;
                        color: gray; /* Set icon color to gray */
                    }

                    .input-like span {
                        font-size: 12px;
                        color: #333;                          
                        display: inline-block;
                        width: 100%;

                    }
                    .checklist-grid {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;
                    }

                    .checklist-category {
                        width: 33%; /* Adjust based on desired column size */
                    }

                    .checklist-category h4 {
                        font-size: 10px;
                        margin-bottom: 10px;
                        margin-left: 20px;
                    }

                    .checklist-category ul {
                        list-style: none;
                        padding-left: 0;
                    }

                    .checklist-category ul li {
                        margin-bottom: 2px; /* Reduce space between items */
                        padding: 0; /* Remove extra padding */
                        font-size: 12px; /* Keep the font size consistent */
                        line-height: 0.2; /* Adjust line height to make text tighter */
                    }

                    .checklist-category input[type="checkbox"] {
                        margin-right: 5px; /* Reduce the space between the checkbox and the text */
                        margin-bottom: 0; /* Ensure there's no extra space below the checkbox */
                        line-height: 0.1; /* Adjust line height for tighter spacing */
                    }
                    .checklist-category2 {
                        width: 25%; /* Adjust based on desired column size */
                    }

                    .checklist-category2 h4 {
                        font-size: 10px;
                        margin-bottom: 10px;
                        margin-left: 20px;
                    }

                    .checklist-category2 ul {
                        list-style: none;
                        padding-left: 0;
                    }

                    .checklist-category2 ul li {
                        margin-bottom: 2px; /* Reduce space between items */
                        padding: 0; /* Remove extra padding */
                        font-size: 12px; /* Keep the font size consistent */
                        line-height: 0.2; /* Adjust line height to make text tighter */
                    }

                    .checklist-category2 input[type="checkbox"] {
                        margin-right: 5px; /* Reduce the space between the checkbox and the text */
                        margin-bottom: 0; /* Ensure there's no extra space below the checkbox */
                        line-height: 0.1; /* Adjust line height for tighter spacing */
                    }
                    .remarks-section h4 {
                        font-size: 12px;
                        margin-bottom: 10px;
                        margin-left: 10px;
                    }

                    .remarks-section textarea {
                        border: 1px solid #ccc;
                        padding: 10px;
                        font-size: 10px;
                        width: 100%;
                    }
                    .car-image-section {
                        text-align: center;
                        margin-top: 10px;
                    }

                    /* Car Diagram Image Styling */
                    .car-diagram {
                        width: 30%;
                        max-width: 600px;
                        height: auto;
                    }
                    .x-mark {
                        color: red; /* Ensure color is preserved */
                        font-size: 10px;
                        font-weight: bold;
                        position: absolute;
                        transform: translate(-179px, -42px); /* Adjust these values as needed */
                    }
                    #markXButton{
                        display: none;
                    }
                    .signature-section {
                        display: flex;
                        justify-content: space-between;
                        margin-top: 10px;
                        border-top: 1px solid black;
                        padding-top: 5px; /* Optional: add some padding at the top */
                    }
                    .signature-section h4 {
                        font-size: 12px;
                    }
                    /* Each signature block (left and right side) */
                    .signature-section div {
                        width: 48%; /* Ensures the two signature blocks take up equal width */
                    }

                    /* Styling for the labels (e.g., "Checked by:", "Conformed by:") */
                    .signature-section p:first-child {
                        font-weight: bold;
                    }

                    /* Styling for the underline lines */
                    .signature-section p:nth-child(2) {
                        font-weight: bold;
                        text-align: left;
                        margin-bottom: 5px;
                    }

                    /* Styling for the signature and date labels */
                    .signature-section p:nth-child(3),
                    .signature-section p:nth-child(4) {
                        margin-bottom: 5px;
                    }
                    /* Any other styles necessary for print */
                </style>
            </head>
            <body>
                 ${checklistPopup.innerHTML}   
            </body>
        </html>
    `);
    
    WindowPrint.document.close();
    WindowPrint.focus();
    WindowPrint.print();
    WindowPrint.close();
};
const fetchAppointmentList = async () => {
    try {
        const response = await fetch('get_appointment_list.php'); // Fetch the list of appointments from the new PHP file
        const data = await response.json(); // Parse response to JSON
        return data; // Return appointment list data
    } catch (error) {
        console.error('Error fetching appointment list:', error);
        return []; // Return an empty array if error occurs
    }
};

const fetchParts = async (searchTerm) => {
    try {
        const response = await fetch(`get_inventory.php?term=${searchTerm}`);
        const parts = await response.json();
        return parts;
    } catch (error) {
        console.error('Error fetching parts:', error);
        return [];
    }
};

// Function to render filtered parts in the dropdown
const toggleJobOrderPopup = async (ticketId, buttonElement) => {
    const popup = document.getElementById('create-job-order-popup');
    const overlay = document.getElementById('overlay');

    closeJobOrderPopup(); // Close any existing popups

    try {
        // Fetch the specific appointment data by ticket ID using fetchAppointmentById
        const appointment = await fetchAppointmentById(ticketId);
        console.log("Fetched appointment data:", appointment);

        if (appointment.error) {
            console.error(appointment.error);
            return;
        }

        // Set the content dynamically to match the design with fetched data
        popup.innerHTML = `
            <div class="job-order-popup-content">
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
                <form id="jobOrderForm">
                    <!-- Date of Service and Time in one row -->
                    <div class="form-row">
                        <div class="half-width">
                            <label for="dateOfService">Date of Service:</label>
                            <input type="text" id="dateOfService" name="dateOfService" value="${appointment.appointment_date}" disabled>
                        </div>
                        <div class="half-width">
                            <label for="timeOfService">Appointment Time:</label>
                            <input type="time" id="timeOfService" name="timeOfService" value="${appointment.appointment_time}" disabled>
                        </div>
                    </div>
                    <!-- First Name and Last Name in one row -->
                    <div class="form-row">
                        <div class="half-width">
                            <label for="firstName">First Name:</label>
                            <input type="text" id="firstName" name="firstName" value="${appointment.first_name}" disabled>
                        </div>
                        <div class="half-width">
                            <label for="lastName">Last Name:</label>
                            <input type="text" id="lastName" name="lastName" value="${appointment.last_name}" disabled>
                        </div>
                    </div>

                    <!-- Plate No. and Car Brand in one row -->
                    <div class="form-row">
                        <div class="half-width">
                            <label for="plateNumber">Plate No.:</label>
                            <input type="text" id="plateNumber" name="plateNumber" value="${appointment.plate_number}" disabled>
                        </div>
                        <div class="half-width">
                            <label for="carBrand">Car Brand:</label>
                            <input type="text" id="carBrand" name="carBrand" value="${appointment.car_brand}" disabled>
                        </div>
                    </div>

                    <!-- Car Model and Year Model in one row -->
                    <div class="form-row">
                        <div class="half-width">
                            <label for="carModel">Car Model:</label>
                            <input type="text" id="carModel" name="carModel" value="${appointment.car_model}" disabled>
                        </div>
                        <div class="half-width">
                            <label for="yearModel">Year Model:</label>
                            <input type="text" id="yearModel" name="yearModel" value="${appointment.car_year}" disabled>
                        </div>
                    </div>

                    <!-- Selected Services -->
                    <label for="selectedServices">Selected Services:</label>
                    <input type="text" id="selectedServices" name="selectedServices" value="${appointment.services}" required>

                    <!-- Parts Used -->
                    <label for="partsUsed">Parts Used:</label>
                    <div class="parts-input-container">
                        <input type="text" id="partsSearch" placeholder="Search part">
                        <input type="number" id="partQuantity" placeholder="Quantity" min="1">
                        <button id="addPartsButton">Add</button>
                    </div>
                    <div class="parts-used-options"></div>
                    <div class="stock-delivery-container">
                        <!-- Available Stock -->
                        <input type="text" id="availableStock" placeholder="Available Stock" readonly>

                        <!-- Days to Deliver (hidden by default) -->
                        <input type="number" id="daysToDeliver" name="daysToDeliver" placeholder="Days to Deliver" min="0" style="display: none;" readonly>
                    </div>
                    <div class="parts-added-container" id="partsAddedContainer"></div>

                    <!-- Mechanic and Date of Completion in one row -->
                    <div class="form-row">
                        <div class="half-width">
                            <label for="mechanic">Mechanic:</label>
                            <input type="text" id="mechanic" name="mechanic" value="${appointment.mechanic}" disabled>
                        </div>
                        <div class="half-width">
                            <label for="dateOfCompletion">Estimate Date of Completion:</label>
                            <input type="date" id="dateOfCompletion" name="dateOfCompletion" required readonly>
                        </div>
                    </div>

                    <!-- Remarks -->
                    <label for="remarks">Remarks:</label>
                    <textarea id="remarks" name="remarks"></textarea>

                    <!-- Buttons -->
                    <div class="popup-buttons">
                        <button type="button" id="close-job-order-popup-btn" class="close-btn">Close</button>
                        <button type="submit" class="done-btn">Save</button>
                    </div>
                </form>
            </div>
        `;

        // Center and display the popup
        popup.classList.add('active');
        overlay.classList.add('active');

        document.getElementById('partsSearch').addEventListener('focus', renderParts);
        document.getElementById('partsSearch').addEventListener('input', renderParts);
        

        // Remove any existing event listeners to prevent duplication
        const addPartsButton = document.getElementById('addPartsButton');
        addPartsButton.replaceWith(addPartsButton.cloneNode(true)); // This removes all listeners

        let selectedParts = [];

        // Calculate the total estimate completion time
        const calculateTotalEstimateCompletion = () => {
            let totalDays = 0;
            let totalHours = 0;

            // Loop through selected parts to calculate total days and hours
            selectedParts.forEach(part => {
                totalDays += part.estimateDays;
                totalHours += part.estimateHours;
            });

            // Normalize hours into days if they exceed 24
            totalDays += Math.floor(totalHours / 24);
            totalHours = totalHours % 24; // Remaining hours

            return { totalDays, totalHours };
        };

        // Add a part to the estimate
        const addPartToEstimate = async (partName) => {
            try {
                const response = await fetch(`get_estimate_completion.php?part_name=${encodeURIComponent(partName)}`);
                const data = await response.json();

                if (data.success) {
                    const { estimate_completion_days, estimate_completion_hours } = data;

                    // Validate the fetched data
                    const estimateDays = parseInt(estimate_completion_days, 10);
                    const estimateHours = parseInt(estimate_completion_hours, 10);

                    if (isNaN(estimateDays) || isNaN(estimateHours)) {
                        console.error(`Invalid estimate data received: ${data}`);
                        return;
                    }

                    // Add the part to the selectedParts array
                    selectedParts.push({
                        partName,
                        estimateDays,
                        estimateHours,
                    });

                    // Recalculate total estimate completion
                    const { totalDays, totalHours } = calculateTotalEstimateCompletion();

                    // Calculate the estimated completion date
                    const currentDate = new Date();
                    currentDate.setDate(currentDate.getDate() + totalDays);
                    currentDate.setHours(currentDate.getHours() + totalHours);

                    // Validate the currentDate and normalize hours
                    if (!isNaN(currentDate.getTime())) {
                        if (currentDate.getHours() >= 24) {
                            const extraDays = Math.floor(currentDate.getHours() / 24);
                            currentDate.setDate(currentDate.getDate() + extraDays);
                            currentDate.setHours(currentDate.getHours() % 24);
                        }

                        // Format the date as YYYY-MM-DD
                        const formattedDate = currentDate.toISOString().split('T')[0];

                        // Update the Estimate Date of Completion field
                        document.getElementById('dateOfCompletion').value = formattedDate;
                    } else {
                        console.error('Invalid currentDate after calculations:', currentDate);
                    }
                } else {
                    console.error('Failed to fetch estimate completion data:', data.error);
                }
            } catch (error) {
                console.error('Error fetching estimate completion data:', error);
            }
        };

        // Remove a part from the estimate
        const removePartFromEstimate = (partName) => {
            // Remove the part from the selectedParts array
            selectedParts = selectedParts.filter(part => part.partName !== partName);

            // Recalculate total estimate completion
            const { totalDays, totalHours } = calculateTotalEstimateCompletion();

            // Calculate the new estimated completion date
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + totalDays);
            currentDate.setHours(currentDate.getHours() + totalHours);

            // Validate the currentDate and normalize hours
            if (!isNaN(currentDate.getTime())) {
                if (currentDate.getHours() >= 24) {
                    const extraDays = Math.floor(currentDate.getHours() / 24);
                    currentDate.setDate(currentDate.getDate() + extraDays);
                    currentDate.setHours(currentDate.getHours() % 24);
                }

                // Format the date as YYYY-MM-DD
                const formattedDate = currentDate.toISOString().split('T')[0];

                // Update the Estimate Date of Completion field
                document.getElementById('dateOfCompletion').value = formattedDate;
            } else {
                console.error('Invalid currentDate after calculations:', currentDate);
            }
        };


        // Add the new event listener only once
        document.getElementById('addPartsButton').addEventListener('click', async (event) => {
            event.preventDefault();  // Prevent form submission
        
            const partName = document.getElementById('partsSearch').value.trim();  // Get selected part name
            if (partName) {
                await addPartToEstimate(partName);
            }
            const partQuantityInput = document.getElementById('partQuantity');  // Get the quantity input field
            const partQuantity = parseInt(partQuantityInput.value);  // Get quantity entered by the user
        
            if (isNaN(partQuantity) || partQuantity <= 0) {
                alert('Please enter a valid quantity greater than zero.');
                return;
            }
        
            // Find the selected part from validParts (the parts fetched from the search)
            const selectedPart = validParts.find(part => part.name.toLowerCase() === partName.toLowerCase());
            const adjustedStock = selectedPart ? selectedPart.stock - selectedPart.inProgress : 0;
        
            console.log(`Part selected: ${partName}, Quantity: ${partQuantity}, Days to Deliver: ${selectedPart?.days_to_deliver}`);
        
            // Validate Days to Deliver for out-of-stock parts
            if (adjustedStock <= 0 && !selectedPart) {
                alert('Please select a valid part and enter a valid quantity.');
                return;
            }
        
            // Automatically set the days_to_deliver for out-of-stock parts
            const daysToDeliverField = document.getElementById('daysToDeliver');
            const daysToDeliver = adjustedStock <= 0 ? selectedPart.days_to_deliver : 0;
        
            if (adjustedStock <= 0 && daysToDeliver === 0) {
                alert('Days to Deliver is required for out-of-stock items.');
                return;
            }
        
            // Validate quantity for in-stock parts
            if (adjustedStock > 0 && (partQuantity <= 0 || partQuantity > adjustedStock)) {
                alert(`Please enter a valid quantity up to the available stock (${adjustedStock}).`);
                return;
            }
        
            // Proceed to add the part
            const partsAddedContainer = document.getElementById('partsAddedContainer');
            let existingPart = Array.from(partsAddedContainer.children).find(item => item.dataset.partName === partName);
        
            if (existingPart) {
                console.log(`Updating quantity for existing part: ${partName}`);
                const existingQuantity = parseInt(existingPart.querySelector('.part-quantity').textContent);
                const newQuantity = existingQuantity + partQuantity;
        
                // Update the quantity in the list if within stock limits
                if (adjustedStock === 0 || newQuantity <= selectedPart.stock) {
                    existingPart.querySelector('.part-quantity').textContent = newQuantity;
                } else {
                    alert(`Cannot add more than available stock. Max available: ${selectedPart.stock}`);
                }
            } else {
                console.log(`Adding new part: ${partName}`);
        
                // Create a new part entry if it doesn't already exist
                const partItem = document.createElement('div');
                partItem.classList.add('part-item');
                partItem.dataset.partName = partName;
        
                const partText = document.createElement('span');
                partText.textContent = `${partName} - Quantity: `;
        
                const partQuantitySpan = document.createElement('span');
                partQuantitySpan.classList.add('part-quantity');
                partQuantitySpan.textContent = partQuantity;
        
                const partDaysToDeliver = document.createElement('span');
                partDaysToDeliver.classList.add('part-days-to-deliver');
                partDaysToDeliver.textContent = daysToDeliver ? `Days to Deliver: ${daysToDeliver}` : '';
        
                const removeButton = document.createElement('button');
                removeButton.classList.add('remove-btn');
                removeButton.textContent = 'x';
        
                removeButton.addEventListener('click', () => {
                    partItem.remove();
                });
        
                // Apply red styling if Days to Deliver is set
                if (daysToDeliver > 0) {
                    partItem.style.backgroundColor = "#f5c6cb";
                    partItem.style.border = "1px solid red";
                    partItem.style.padding = "10px";
                }
        
                // Append the part details to the part item
                partItem.appendChild(partText);
                partItem.appendChild(partQuantitySpan);
                partItem.appendChild(partDaysToDeliver);
                partItem.appendChild(removeButton);
                partsAddedContainer.appendChild(partItem);
            }
        
            // Clear input fields after adding the part
            document.getElementById('partsSearch').value = '';
            document.getElementById('partQuantity').value = '';
            document.getElementById('availableStock').value = '';
            daysToDeliverField.value = '';
            daysToDeliverField.style.display = 'none';
            daysToDeliverField.removeAttribute('required');
        });        
        document.getElementById('partsAddedContainer').addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-btn')) {
                const partName = event.target.parentElement.dataset.partName;
                removePartFromEstimate(partName);
                event.target.parentElement.remove();
            }
        });
        // Form submission logic
        // Form submission logic
        document.getElementById('jobOrderForm').addEventListener('submit', async function (event) {
            event.preventDefault();
        
            const mechanicField = document.getElementById('mechanic');
            console.log("Mechanic input value:", mechanicField ? mechanicField.value : "Mechanic field not found");
        
            if (mechanicField) {
                // Get the current timestamp
                const now = new Date();
                const timestamp = now.getFullYear() + '-' +
                    String(now.getMonth() + 1).padStart(2, '0') + '-' +
                    String(now.getDate()).padStart(2, '0') + ' ' +
                    String(now.getHours()).padStart(2, '0') + ':' +
                    String(now.getMinutes()).padStart(2, '0') + ':' +
                    String(now.getSeconds()).padStart(2, '0');
        
                const formData = {
                    appointmentId: appointment.id,
                    firstName: document.getElementById('firstName').value = appointment.first_name,
                    lastName: document.getElementById('lastName').value = appointment.last_name,
                    plateNumber: document.getElementById('plateNumber').value = appointment.plate_number,
                    carBrand: document.getElementById('carBrand').value = appointment.car_brand,
                    carModel: document.getElementById('carModel').value = appointment.car_model,
                    yearModel: document.getElementById('yearModel').value = appointment.car_year,
                    mechanic: document.getElementById('mechanic').value = appointment.mechanic,
                    appointmentDate: document.getElementById('dateOfService').value,
                    service: document.getElementById('selectedServices').value,
                    partsUsed: [],
                    progress: "In Progress",
                    estimateCompletion: document.getElementById('dateOfCompletion').value,
                    remarks: document.getElementById('remarks').value || "N/A",
                    submissionTime: timestamp // Add the timestamp field
                };
        
                const partsElements = document.querySelectorAll('#partsAddedContainer .part-item');
                if (partsElements.length === 0) {
                    alert('Please add at least one part before submitting.');
                    return;
                }
        
                console.log("Form data before submission:", formData);
        
                // Add parts to the formData
                partsElements.forEach(partElement => {
                    const partName = partElement.dataset.partName;
                    const partQuantity = partElement.querySelector('.part-quantity').textContent;
                    const daysToDeliverText = partElement.querySelector('.part-days-to-deliver')?.textContent;
                    const daysToDeliver = daysToDeliverText ? parseInt(daysToDeliverText.replace('Days to Deliver: ', '')) : 0;
                    const availability = daysToDeliver === 0 ? 'Available' : 'Unavailable';
        
                    formData.partsUsed.push({
                        appointmentId: formData.appointmentId,
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        plateNumber: formData.plateNumber,
                        partName,
                        partQuantity,
                        availability,
                        partProgress: "In Progress",
                        daysToDeliver
                    });
                });
        
                try {
                    const response = await fetch('save_job_order.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData),
                    });
        
                    const result = await response.json();
                    if (result.success) {
                        alert('Job order saved successfully!');
                        window.location.reload();
                    } else {
                        alert(`Failed to save job order: ${result.error}`);
                    }
                } catch (error) {
                    console.error('Error saving job order:', error);
                    alert('Error saving job order. Please try again.');
                }
            } else {
                alert("Mechanic field is missing or not accessible.");
            }
        });        

    } catch (error) {
        console.error('Error fetching appointment:', error);
    }

    document.getElementById('close-job-order-popup-btn').addEventListener('click', closeJobOrderPopup);
};

let validParts = []; // Global array to store valid parts from the database

// Update the renderParts function to store valid parts and display available stock
// Function to render filtered parts in the dropdown
// Function to render filtered parts in the dropdown
const renderParts = async () => {
    const searchInput = document.getElementById('partsSearch').value.trim(); // Get search input
    const partsDropdown = document.querySelector('.parts-used-options');
    partsDropdown.innerHTML = '';  // Clear previous parts

    let parts;
    if (searchInput === '') {
        // If no input, fetch all parts
        parts = await fetchParts('');
    } else {
        // Fetch filtered parts based on the input
        parts = await fetchParts(searchInput);
    }

    validParts = parts;  // Populate validParts with the fetched parts

    // Debugging: Log the parts fetched to see their stock
    console.log('Parts fetched:', parts);

    if (parts.length > 0) {
        parts.forEach(part => {
            const partElement = document.createElement('div');
            partElement.classList.add('part');

            // Calculate adjusted stock
            const adjustedStock = part.stock - part.inProgress; // Subtract "in progress" quantity
            const daysToDeliver = part.days_to_deliver; // Fetch days_to_deliver from the part object

            // Debugging: Log stock and delivery details for each part
            console.log(`Checking part: ${part.name}, Stock: ${part.stock}, In Progress: ${part.inProgress}, Adjusted Stock: ${adjustedStock}, Days to Deliver: ${daysToDeliver}`);

            // Check if adjusted stock is less than or equal to 0
            if (adjustedStock <= 0) {
                console.log(`Part "${part.name}" is out of stock, displaying Days to Deliver`);
                partElement.style.backgroundColor = '#f5c6cb';  // Light red background for unavailable parts
                partElement.textContent = `${part.name} (Out of Stock, Days to Deliver: ${daysToDeliver})`;
            } else {
                partElement.textContent = `${part.name} (Available: ${adjustedStock}, Days to Deliver: ${daysToDeliver})`;  // Display available stock and delivery info
            }

            // Add an onClick event to handle when the part is selected
            partElement.onclick = () => {
                document.getElementById('partsSearch').value = part.name;  // Set part name in search field
                document.getElementById('availableStock').value = `Available: ${adjustedStock}`;  // Display available stock
                
                const partQuantityInput = document.getElementById('partQuantity');  // Quantity input field
                const daysToDeliverField = document.getElementById('daysToDeliver');  // Days to Deliver field

                // Set the Days to Deliver value directly from the part object
                daysToDeliverField.value = daysToDeliver;

                // Debugging: Log when the part is clicked and adjusted stock is used
                console.log(`Clicked part: ${part.name}, Adjusted Stock: ${adjustedStock}, Days to Deliver: ${daysToDeliver}`);

                // If adjusted stock is less than or equal to 0, show the "Days to Deliver" field
                if (adjustedStock <= 0) {
                    console.log('Adjusted stock is 0 or less, displaying Days to Deliver and allowing any quantity');
                    daysToDeliverField.style.display = 'block';  // Show the field
                    daysToDeliverField.setAttribute('required', 'true');  // Make it required
                    partQuantityInput.removeAttribute('max');  // Remove the max limit on quantity
                } else {
                    console.log('Adjusted stock is available, hiding Days to Deliver and setting max quantity to adjusted stock');
                    daysToDeliverField.style.display = 'none';  // Hide the field if part is in stock
                    daysToDeliverField.removeAttribute('required');  // Remove the required attribute
                    partQuantityInput.setAttribute('max', adjustedStock);  // Set max quantity to adjusted stock
                }

                partsDropdown.innerHTML = '';  // Hide dropdown
            };

            partsDropdown.appendChild(partElement);
        });
    } else {
        const noResult = document.createElement('div');
        noResult.textContent = 'No parts found';
        partsDropdown.appendChild(noResult);
    }

    // Initially hide "Days to Deliver" field
    const daysToDeliverField = document.getElementById('daysToDeliver');
    daysToDeliverField.style.display = 'none';  // Hide the field by default
    daysToDeliverField.removeAttribute('required');  // Ensure it is not required initially
};







document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function (event) {
        if (event.target && event.target.id === 'searchPartsButton') {
            renderParts();
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function (event) {
        const optionsBtn = event.target.closest('.options-btn');
        const dropdown = event.target.closest('.dropdown');

        // If clicked on options button, toggle the dropdown visibility
        if (optionsBtn) {
            const dropdownMenu = optionsBtn.nextElementSibling; // Assuming the dropdown is next to the button
            dropdownMenu.classList.toggle('hidden'); // Toggle dropdown visibility

            // Close any other open dropdowns
            document.querySelectorAll('.dropdown:not(.hidden)').forEach(activeDropdown => {
                if (activeDropdown !== dropdownMenu) {
                    activeDropdown.classList.add('hidden');
                }
            });
        } 
        // If clicked outside the dropdown or options button, close all dropdowns
        else if (!dropdown) {
            document.querySelectorAll('.dropdown:not(.hidden)').forEach(activeDropdown => {
                activeDropdown.classList.add('hidden');
            });
        }
    });
});



const closeJobOrderPopup = () => {
    const popup = document.getElementById('create-job-order-popup');
    const overlay = document.getElementById('overlay');
    if (popup) {
        popup.classList.remove('active');
        overlay.classList.remove('active'); // Hide the overlay when the popup is closed
    }
};
// Example usage: Fetch appointment list and display them
fetchAppointmentList().then(appointments => {
    console.log(appointments); // Display the appointment list data
    // Further code to render appointment list in UI
});

const fetchProgressReportById = async (ticketId) => {
    try {
        const response = await fetch(`get_progress_report.php?ticketId=${ticketId}`); // Replace with your actual backend URL
        const data = await response.json();
        return data; // Return the fetched progress report data
    } catch (error) {
        console.error('Error fetching progress report:', error);
        return null; // Return null in case of an error
    }
};

function refreshAddPartPopup() {
    resetPartFields(); // Reset input fields
    clearPartsList(); // Clear parts list
}


// Function to render the progress report popup
const toggleProgressReportPopup = async (appointmentId, buttonElement) => {
    const popup = document.getElementById('progress-report-popup');
    const overlay = document.getElementById('overlay');
    const inProgressList = document.getElementById('in-progress-list');
    const completedList = document.getElementById('completed-list');

    // ** Clear the lists to prevent duplicate entries **
    inProgressList.innerHTML = '';
    completedList.innerHTML = '';

    // Close any existing popup
    closeProgressReportPopup();

    refreshAddPartPopup(); 

    // Fetch progress report data by appointment ID
    const progressReportData = await fetchProgressReportById(appointmentId);

    if (progressReportData) {
        // Update the header details with ID and service
        popup.setAttribute('data-appointment-id', progressReportData.appointment_id);
        popup.setAttribute('data-job-order-id', progressReportData.job_order_id);

        const smallIdElement = document.querySelector('.progress-header .small-id');
        const serviceElement = document.querySelector('.progress-header h3');

        // Set the content for the small ID and service
        smallIdElement.innerText = `ID #${progressReportData.job_order_id}`;
        serviceElement.innerText = progressReportData.service;

        // Display other details (date, mechanic, customer name, etc.)
        document.querySelector('.progress-header p:nth-child(3)').innerText = `Date: ${progressReportData.appointment_date}`;
        document.querySelector('.progress-header p:nth-child(4)').innerText = `Mechanic: ${progressReportData.mechanic}`;
        document.querySelector('.progress-header p:nth-child(5)').innerText = `Customer Name: ${progressReportData.first_name} ${progressReportData.last_name}`;
        document.querySelector('.progress-header p:nth-child(6)').innerText = `Estimated Completion Date: ${progressReportData.estimate_completion}`;

        // Generate the progress report link using the token from progressReportData
        const token = progressReportData.token;
        generateProgressLink(token);  // Call the updated link generation function

        // Check if parts_used is defined and is an array
        let allCompletedOrCancelled = true;
        if (Array.isArray(progressReportData.parts_used)) {
            console.log(`Fetching appointment_id: ${progressReportData.appointment_id}, job_order_id: ${progressReportData.job_order_id}`);  
        
            // Clear existing lists
            inProgressList.innerHTML = '';
            completedList.innerHTML = '';
        
            progressReportData.parts_used.forEach(part => {
                let deliveryStatus = ''; // Variable to store the delivery status
        
                // Only calculate delivery date if days_to_deliver is defined and greater than zero, and part is unavailable
                if (part.availability === 'Unavailable' && part.days_to_deliver && part.days_to_deliver > 0) {
                    const creationTime = new Date(progressReportData.creation_time); // Use creation_time from the database
                    const deliveryDate = new Date(creationTime); // Start with creation_time
                    deliveryDate.setDate(creationTime.getDate() + part.days_to_deliver); // Add days to deliver
                
                    // Determine the delivery status
                    if (new Date() > deliveryDate) {
                        deliveryStatus = 'Pending';
                    } else {
                        deliveryStatus = deliveryDate.toLocaleDateString('en-US');
                    }
                }                
        
                // Render unavailable parts with the delivery status
                if (part.availability === 'Unavailable') {
                    // Check if the part is already in the in-progress list
                    const existingPart = inProgressList.querySelector(`[data-part-name="${part.part_name}"]`);
                    if (existingPart) {
                        // Update the quantity by adding the new part quantity
                        const existingQuantity = parseInt(existingPart.getAttribute('data-part-quantity')) || 0;
                        const newQuantity = existingQuantity + part.part_quantity;
                        existingPart.setAttribute('data-part-quantity', newQuantity);
                        existingPart.querySelector('span').innerText = `${part.part_name} (${newQuantity}) ${deliveryStatus ? `- Estimated Delivery: ${deliveryStatus}` : ''}`;
                    } else {
                        // Add the new part if it does not exist
                        inProgressList.innerHTML += `
                            <li class="in-progress-item unavailable-part" 
                                data-appointment-id="${progressReportData.appointment_id}" 
                                data-part-name="${part.part_name}"
                                data-part-quantity="${part.part_quantity}">
                                <span>${part.part_name} (${part.part_quantity}) ${deliveryStatus ? `- Estimated Delivery: ${deliveryStatus}` : ''}</span>
                                <button class="options-btn"><i class="fas fa-ellipsis-h"></i></button>
                                <div class="dropdown hidden">
                                    <button class="available-option">Available</button>
                                    <button class="cancel-option">Cancelled</button>
                                </div>
                            </li>`;
                    }
                    allCompletedOrCancelled = false;
                } else if (part.availability === 'Available' && part.progress === 'In Progress') {
                    // Check if the part is already in the in-progress list
                    const existingPart = inProgressList.querySelector(`[data-part-name="${part.part_name}"]`);
                    if (existingPart) {
                        // Update the quantity by adding the new part quantity
                        const existingQuantity = parseInt(existingPart.getAttribute('data-part-quantity')) || 0;
                        const newQuantity = existingQuantity + part.part_quantity;
                        existingPart.setAttribute('data-part-quantity', newQuantity);
                        existingPart.querySelector('span').innerText = `${part.part_name} (${newQuantity})`;
                    } else {
                        // Add the new part if it does not exist
                        inProgressList.innerHTML += `
                            <li class="in-progress-item" 
                                data-appointment-id="${progressReportData.appointment_id}" 
                                data-part-name="${part.part_name}"
                                data-part-quantity="${part.part_quantity}">
                                <span>${part.part_name} (${part.part_quantity})</span>
                                <button class="options-btn"><i class="fas fa-ellipsis-h"></i></button>
                                <div class="dropdown hidden">
                                    <button class="done-option">Complete</button>
                                    <button class="cancel-option">Cancelled</button>
                                </div>
                            </li>`;
                    }
                    allCompletedOrCancelled = false; 
                } else if (part.progress === 'complete' || part.progress === 'cancelled') {
                    // Avoid duplicates: Check if the part is already in the completed list
                    const existingPart = completedList.querySelector(`[data-part-name="${part.part_name}"]`);
                    if (existingPart) {
                        const existingQuantity = parseInt(existingPart.getAttribute('data-part-quantity')) || 0;
                        const newQuantity = existingQuantity + part.part_quantity;
                        existingPart.setAttribute('data-part-quantity', newQuantity);
                        existingPart.innerHTML = `${part.part_name} (${newQuantity}) ${part.progress === 'cancelled' ? '- Cancelled' : ''}`;
                    } else {
                        const cancelledClass = part.progress === 'cancelled' ? 'cancelled-part' : '';
                        const cancelledText = part.progress === 'cancelled' ? '- Cancelled' : '';
                        const partElement = document.createElement('li');
        
                        partElement.className = `completed-part ${cancelledClass}`;
                        partElement.setAttribute('data-part-name', part.part_name);
                        partElement.setAttribute('data-part-quantity', part.part_quantity);
                        partElement.innerHTML = `${part.part_name} (${part.part_quantity}) ${cancelledText}`;
        
                        completedList.appendChild(partElement);
                    }
                }
            });
        } else {
            console.error('parts_used is not an array or is undefined');
        }

         // ** Add Complete Service Button **
         const existingCompleteButton = document.getElementById('complete-service-btn');
        if (existingCompleteButton) {
            existingCompleteButton.remove();
        }

        const completeServiceButton = document.createElement('button');
        completeServiceButton.id = 'complete-service-btn';
        completeServiceButton.className = 'complete-btn';
        completeServiceButton.textContent = 'Complete Service';

        // Disable the button if not all parts are completed or cancelled
        if (allCompletedOrCancelled) {
            completeServiceButton.disabled = false;
        } else {
            completeServiceButton.disabled = true;
        }

        // Append the button to the popup, right before the close button
        popup.appendChild(completeServiceButton);

        // Event listener for marking the service as complete
        completeServiceButton.addEventListener('click', () => {
            markServiceComplete(progressReportData.appointment_id);
        });

    } else {
        inProgressList.innerHTML = `<li>No tasks in progress</li>`;
        completedList.innerHTML = `<li>No completed tasks</li>`;
    }

    // Show the popup
    popup.classList.add('active');
    overlay.classList.add('active');

    // Add event listener to handle the click on the options button
    // Function to handle the click event for in-progress items
    // Flag to track if an operation is already in progress
    let isProcessing = false;  // Flag to track if an operation is already in progress

    // Remove any existing click listener on inProgressList to prevent stacking
    inProgressList.removeEventListener('click', inProgressList.clickListener);

    // Define and assign the event listener function
    inProgressList.clickListener = (event) => {
        const listItem = event.target.closest('.in-progress-item');
        const partName = listItem.dataset.partName;
        const appointmentId = listItem.dataset.appointmentId;
        const dropdown = listItem.querySelector('.dropdown'); // Select the dropdown
        const doneButton = event.target.closest('.done-option'); // Get the "Done" button

        // Toggle dropdown visibility
        if (event.target.closest('.options-btn')) {
            dropdown.classList.toggle('active'); // Show or hide the dropdown
        }

        // Handle "Available" option for unavailable parts
        if (event.target.classList.contains('available-option')) {
            console.log("Done button clicked for:", partName);
            updatePartAvailability(appointmentId, partName, 'Available');
            dropdown.classList.remove('active');
            dropdown.style.display = 'none'; // Explicitly hide the dropdown
        }

        // Handle "Done" option for available parts
        if (event.target.classList.contains('done-option')) {
            if (isProcessing) return; // Prevents multiple deductions
        
            // Set the processing flag and disable the button
            isProcessing = true;
            if (doneButton) {
                doneButton.disabled = true;
            }
        
            // Show the technician/mechanic selection popup before proceeding
            showTechnicianPopup(appointmentId, partName).then(() => {
                // Deduct stock ONLY after the popup is submitted
                markPartAsDone(appointmentId, partName).then((response) => {
                    dropdown.classList.remove('active');
                    dropdown.style.display = 'none'; // Explicitly hide the dropdown
        
                    // Capture additional data for the progress report
                    const jobOrderId = popup.getAttribute('data-job-order-id');
                    const firstName = document.querySelector('.progress-header p:nth-child(5)').innerText.split(": ")[1].split(" ")[0]; // Correctly split the first name
                    const lastName = document.querySelector('.progress-header p:nth-child(5)').innerText.split(": ")[1].split(" ")[1]; // Correctly split the last name
                    const quantity = listItem.dataset.partQuantity;
        
                    // Updated completionTime to use the local time format
                    const now = new Date();
                    const completionTime = now.getFullYear() + '-' +
                        String(now.getMonth() + 1).padStart(2, '0') + '-' +
                        String(now.getDate()).padStart(2, '0') + ' ' +
                        String(now.getHours()).padStart(2, '0') + ':' +
                        String(now.getMinutes()).padStart(2, '0') + ':' +
                        String(now.getSeconds()).padStart(2, '0');
        
                    const completionData = {
                        job_order_id: jobOrderId,
                        first_name: firstName,
                        last_name: lastName,
                        part_name: partName,
                        quantity: quantity,
                        completion_time: completionTime, // Using the updated completion time
                    };
        
                    console.log("Completion Data:", completionData);
        
                    // Push the completion data to saveCompletionData function
                    saveCompletionData(completionData);
        
                    // Reset the processing flag and re-enable the button
                    isProcessing = false;
                    if (doneButton) {
                        doneButton.disabled = false;
                    }
                    toggleProgressReportPopup(appointmentId);
                }).catch(() => {
                    // Reset if an error occurs
                    isProcessing = false;
                    if (doneButton) {
                        doneButton.disabled = false;
                    }
                });
            }).catch(() => {
                // Reset if an error occurs or the popup is canceled
                isProcessing = false;
                if (doneButton) {
                    doneButton.disabled = false;
                }
            });
        }
        
    
        // Handle "Cancel" option
        if (event.target.classList.contains('cancel-option')) {
            updatePartProgressCancelled(appointmentId, partName).then(() => {
                dropdown.classList.remove('active');
                dropdown.style.display = 'none';
            });
        }
    };
    
    const showTechnicianPopup = (appointmentId, partName) => {
        return new Promise((resolve, reject) => {
            const popup = document.getElementById('mechanic-technician-popup');
            const technicianSelect = document.getElementById('mechanic-technician-select-dropdown');
            const submitBtn = document.getElementById('mechanic-technician-submit-btn');
            const cancelBtn = document.getElementById('mechanic-technician-cancel-btn');
    
            // Show the popup
            popup.classList.remove('hidden-popup');
    
            // Clear previous dropdown options
            technicianSelect.innerHTML = '<option value="" disabled selected>Select a mechanic or technician</option>';
    
            // Fetch mechanic and technicians
            fetch(`get_mechanics_technicians.php?appointment_id=${appointmentId}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("Response Data from PHP:", data); // Debugging response
    
                    if (data.success) {
                        // Add mechanic as the first option
                        if (data.mechanic) {
                            const mechanicOption = document.createElement('option');
                            mechanicOption.value = data.mechanic; // Mechanic name
                            mechanicOption.textContent = `Mechanic: ${data.mechanic}`;
                            technicianSelect.appendChild(mechanicOption);
                        }
    
                        // Add technicians
                        if (Array.isArray(data.technicians)) {
                            data.technicians.forEach((technician) => {
                                const option = document.createElement('option');
                                option.value = technician.id; // Technician ID
                                option.textContent = technician.name;
                                technicianSelect.appendChild(option);
                            });
                        } else {
                            console.warn("Technicians data is not an array:", data.technicians);
                        }
    
                        // Debugging the populated dropdown
                        console.log("Dropdown Options After Population:", technicianSelect.innerHTML);
                    } else {
                        console.error('Failed to fetch mechanics or technicians:', data.error);
                        alert("No mechanics or technicians available.");
                        reject();
                    }
                })
                .catch((error) => {
                    console.error('Error fetching mechanics and technicians:', error);
                    alert("An error occurred while fetching mechanics and technicians.");
                    reject();
                });
    
            // Submit button logic
            submitBtn.onclick = () => {
                const selectedTechnician = technicianSelect.value;
                console.log("Selected Technician/Mechanic:", selectedTechnician); // Debugging
    
                if (!selectedTechnician) {
                    alert('Please select a mechanic or technician.');
                    return;
                }
    
                // Proceed with the fetch request
                fetch('update_job_order_parts_completed.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `appointment_id=${appointmentId}&part_name=${encodeURIComponent(partName)}&completed_by=${encodeURIComponent(selectedTechnician)}`,
                })
                    .then((response) => response.json())
                    .then((result) => {
                        console.log("Update Response:", result); // Debugging response
                        if (result.success) {
                            alert('Mechanic/Technician updated successfully!');
                            closePopup();
                            resolve();
                        } else {
                            alert('Failed to update mechanic/technician: ' + result.error);
                            reject();
                        }
                    })
                    .catch((error) => {
                        console.error('Error updating completed_by:', error);
                        alert("An error occurred while updating the selected mechanic/technician.");
                        reject();
                    });
            };
    
            // Cancel button logic
            cancelBtn.onclick = () => {
                closePopup();
                reject();
            };
    
            // Close the popup
            const closePopup = () => {
                popup.classList.add('hidden-popup');
            };
        });
    };
    
    
    
    document.addEventListener('DOMContentLoaded', function () {
        // Ensure the popup is hidden on page load
        const popup = document.getElementById('mechanic-technician-popup');
        const overlay = document.getElementById('mechanic-technician-overlay');
    
        popup.classList.add('hidden');
        overlay.classList.add('hidden');
    });
    // Function to save completion data (replace with your actual save logic)
    const saveCompletionData = async (data) => {
        try {
            const response = await fetch('save_inventory_deduction.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
    
            const result = await response.json();
            if (!result.success) {
                alert(`Failed to save completion data: ${result.error}`);
            }
        } catch (error) {
            console.error('Error saving completion data:', error);
        }
    };
    
    // Add the new listener
    inProgressList.addEventListener('click', inProgressList.clickListener);

    





    // Hide dropdown if clicking outside
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.options-btn') && !event.target.closest('.dropdown')) {
            const dropdowns = document.querySelectorAll('.dropdown');
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });

    // Add event listener to close the popup
    document.getElementById('close-progress-report-btn').addEventListener('click', closeProgressReportPopup);
};

const markServiceComplete = async (appointmentId) => {
    console.log(`Marking appointment as complete with ID: ${appointmentId}`); // Log the appointment_id

    try {
        const response = await fetch('mark_service_complete.php', {  
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `appointment_id=${appointmentId}&status=complete`
        });
        const resultText = await response.text(); // Get raw response as text
        console.log(resultText); // Log the response for debugging
        const result = JSON.parse(resultText); // Try parsing it as JSON
        
        if (result.success) {
            alert('Service marked as complete!');
            closeProgressReportPopup();
            renderTickets();
        } else {
            alert('Failed to mark service as complete: ' + result.error);  // Log any errors returned from the PHP
        }
    } catch (error) {
        console.error('Error marking service complete:', error);
        alert('An error occurred.');
    }
};



const updatePartProgressCancelled = async (appointmentId, partName) => {
    try {
        const response = await fetch('update_job_order_parts_cancelled.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `appointment_id=${appointmentId}&part_name=${encodeURIComponent(partName)}`
        });

        const result = await response.json();
        if (result.success) {
            console.log(`${partName} progress updated to cancelled`);
            // Refresh or update UI as needed
            toggleProgressReportPopup(appointmentId);
        } else {
            console.error('Error updating part progress in the database:', result.error);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
};




// Function to update part availability
const updatePartAvailability = async (appointmentId, partName, availability) => {
    try {
        const response = await fetch('update_part_availability.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `appointment_id=${appointmentId}&part_name=${encodeURIComponent(partName)}&availability=${availability}`
        });

        const result = await response.json();
        if (result.success) {
            alert(`${partName} is now marked as Available.`);
            toggleProgressReportPopup(appointmentId); // Reload the popup to reflect the change
        } else {
            alert('Error updating part availability.');
        }
    } catch (error) {
        console.error('Error updating part availability:', error);
    }
};


// Function to mark a part as done
const markPartAsDone = async (appointmentId, partName) => {
    try {
        // Step 1: Update the job order part's progress to "complete"
        const response = await fetch('update_job_order_parts.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `appointment_id=${appointmentId}&part_name=${encodeURIComponent(partName)}`
        });

        const result = await response.json();

        if (result.success) {
            const partQuantity = result.part_quantity; // Extract quantity from the response
            const estimateDays = parseInt(result.estimate_completion_days || 0, 10);
            const estimateHours = parseInt(result.estimate_completion_hours || 0, 10);

            console.log('Part Name:', partName);
            console.log('Part Quantity:', partQuantity);

            // Step 2: Deduct inventory stock
            if (partName && partQuantity > 0) {
                const deductResponse = await fetch('deduct_inventory_stock.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `part_name=${encodeURIComponent(partName)}&quantity=${partQuantity}`
                });

                const deductResult = await deductResponse.json();
                console.log('Deduct Inventory Response:', deductResult);

                if (deductResult.success) {
                    // Log the stock deduction in inventory_stock_changes
                    logStockChange(partName, 'deduct', partQuantity, deductResult.new_total_stock);

                    // Step 3: Check the stock availability after deduction
                    const checkStockResponse = await fetch('update_job_order_availability.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: `part_name=${encodeURIComponent(partName)}`
                    });

                    const checkStockResult = await checkStockResponse.json();
                    console.log('Check Stock Response:', checkStockResult);

                    // Step 4: Move the part to the completed list in the UI
                    const listItem = document.querySelector(`.in-progress-item[data-part-name="${partName}"]`);
                    if (listItem) {
                        const optionsButton = listItem.querySelector('.options-btn');
                        if (optionsButton) {
                            optionsButton.remove();
                        }
                        const completedList = document.getElementById('completed-list');
                        completedList.appendChild(listItem);
                    } else {
                        console.warn(`No listItem found for partName: ${partName}`);
                    }

                    // Step 5: Recalculate and update the estimated completion date
                    if (estimateDays > 0 || estimateHours > 0) {
                        const currentEstimateDateElem = document.querySelector('.progress-header p:nth-child(6)').innerText.split(": ")[1];
                        const currentEstimateDate = new Date(currentEstimateDateElem);

                        // Subtract the fetched days
                        currentEstimateDate.setDate(currentEstimateDate.getDate() - estimateDays);

                        // Subtract the fetched hours
                        currentEstimateDate.setHours(currentEstimateDate.getHours() - estimateHours);

                        // Normalize the date to handle negative hours
                        if (currentEstimateDate.getHours() < 0) {
                            const extraDays = Math.floor(currentEstimateDate.getHours() / 24); // Calculate how many days to subtract
                            currentEstimateDate.setDate(currentEstimateDate.getDate() + extraDays); // Adjust the date
                            currentEstimateDate.setHours(currentEstimateDate.getHours() % 24); // Set remaining hours
                        }

                        // Format the updated date
                        const updatedFormattedDate = currentEstimateDate.getFullYear() + '-' +
                            String(currentEstimateDate.getMonth() + 1).padStart(2, '0') + '-' +
                            String(currentEstimateDate.getDate()).padStart(2, '0');

                        // Update the estimated completion date in the UI
                        document.querySelector('.progress-header p:nth-child(6)').innerText = `Estimated Completion Date: ${updatedFormattedDate}`;

                        // Send the updated estimated completion date to the server
                        const updateEstimateResponse = await fetch('update_estimate_completion.php', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                appointmentId: appointmentId,
                                updatedCompletionDate: updatedFormattedDate
                            })
                        });

                        const updateEstimateResult = await updateEstimateResponse.json();
                        console.log('Update Estimate Completion Response:', updateEstimateResult);

                        if (!updateEstimateResult.success) {
                            console.error('Failed to update estimate completion date:', updateEstimateResult.error);
                        } else {
                            console.log('Estimated completion date updated successfully.');
                        }
                    }
                } else {
                    console.error('Error deducting inventory stock:', deductResult.message);
                }
            } else {
                console.error('Invalid part name or quantity:', partName, partQuantity);
            }
        } else {
            console.error('Error updating part progress in the database:', result.error);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
};


// Function to log stock changes to inventory_stock_changes table
function logStockChange(partName, changeType, quantity, totalStock) {
    console.log(`Logging stock change: ${partName}, ${changeType}, ${quantity}, ${totalStock}`);

    fetch('log_stock_change.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            part_name: partName,
            change_type: changeType,
            quantity: quantity,
            total_stock: totalStock
        })
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            console.log('Stock change logged successfully.');
        } else {
            console.error('Failed to log stock change:', result.error);
        }
    })
    .catch(error => console.error('Network error while logging stock change:', error));
}

// Generate and display the progress report link
// Function to generate and display the progress report link and handle single copy click
// Define the copy click handler function outside to avoid reference errors
const handleCopyClick = () => {
    const progressLink = document.getElementById('progressLink').value;
    navigator.clipboard.writeText(progressLink)
        .then(() => {
            alert("Progress report link copied to clipboard!");
        })
        .catch(err => {
            console.error("Failed to copy link: ", err);
        });
};

// Function to generate and display the progress report link and handle single copy click
const generateProgressLink = (token) => {
    const baseUrl = window.location.origin;  // Automatically gets your domain or IP address
    const progressLink = `${baseUrl}/${token}`;  // Generates clean links like /abc123

    // Display the link in the input field
    const linkInput = document.getElementById('progressLink');
    linkInput.value = progressLink;

    // Get the copy button element
    const copyLinkBtn = document.getElementById('copyLinkBtn');

    // Remove any previous click event listener to prevent stacking
    copyLinkBtn.removeEventListener('click', handleCopyClick);

    // Add the click event listener only once
    copyLinkBtn.addEventListener('click', handleCopyClick);
};






// Function to close the popup
const closeProgressReportPopup = () => {
    const popup = document.getElementById('progress-report-popup');
    const overlay = document.getElementById('overlay');
    popup.classList.remove('active');
    overlay.classList.remove('active');
};


//Function to toggle the popup for editing in the ticketing section
const toggleEditPopup = async (ticketId, buttonElement) => {
    const appointmentId = ticketId;
    const popup = document.getElementById('edit-popup'); // Reuse the same popup
  
    // Close any existing popup
    closeEditPopup();
  
    // Fetch specific appointment data using ticketId
    const appointment = await fetchAppointmentById(ticketId);
    

    if (!appointment || appointment.error) {
        console.error('No data found for the selected ticket.');
        return;
    }

    // Set the popup content dynamically with the fetched appointment data
    popup.innerHTML = `
        <div class="popup-content">
            <h3>Edit Ticket #${ticketId}</h3>
            <button id="generate-checklist-btn">
                <i class="fas fa-clipboard-list"></i> Generate Checklist
            </button>
            <button id="create-job-order-btn">
                <i class="fas fa-briefcase"></i> Create Job Order
            </button>
            <button id="upload-checklist-btn" data-id="${appointment.id}">
                <i class="fas fa-upload"></i> Upload Checklist
            </button>
            <button id="sms-history-btn" data-id="${appointmentId}">
                <i class="fa-solid fa-envelope"></i>SMS History
            </button>
            <button id="cancel-appointment-btn" class="cancel-btn">
                <i class="fas fa-times-circle"></i> Cancel <br> Ticket 
            </button>
            <button id="close-popup-btn" class="exit-btn">
                <i class="fas fa-times"></i> Close
            </button>
        </div>
    `;

    // Position and show the popup
    const buttonRect = buttonElement.getBoundingClientRect();
    popup.style.top = `${buttonRect.bottom + window.scrollY}px`;
    popup.style.left = `${buttonRect.left}px`;
    popup.classList.add('active');
    popup.setAttribute('data-ticket-id', ticketId);

    // Add event listener to the "Generate Checklist" button
    document.getElementById('generate-checklist-btn').addEventListener('click', () => {
        const checklist = generateChecklist(appointment);
        showChecklistPopup(checklist); // Display the checklist in the unique popup
        closeEditPopup(); 
    });
    document.getElementById('create-job-order-btn').addEventListener('click', () => {
        toggleJobOrderPopup(ticketId, buttonElement);
        closeEditPopup(); 
    });

    document.getElementById('upload-checklist-btn').addEventListener('click', () => {
        showUploadChecklistPopup(appointment); // Pass appointment data to the upload popup
    });


    document.getElementById('close-upload-popup-btn').addEventListener('click', () => {
        document.getElementById('upload-checklist-popup').classList.remove('active');
        // Hide the popup
        const popup = document.getElementById('upload-checklist-popup');
        popup.classList.add('hidden');
    
        // Hide the overlay if it exists
        const overlay = document.getElementById('upload-checklist-overlay');
        overlay.classList.remove('active');
    
        // Reset the checklist input
        const checklistInput = document.getElementById('checklistFile');
        checklistInput.value = ''; // Clear the checklist input
    
        // Reset all car condition file inputs
        // Remove all car condition file inputs
        const carConditionUploads = document.getElementById('car-condition-uploads');
        carConditionUploads.innerHTML = ''; // Clear all added file inputs

        // Optionally, add back the initial file input if needed
        const initialInput = document.createElement('input');
        initialInput.type = 'file';
        initialInput.className = 'car-condition-file';
        initialInput.accept = '.pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg'; // Ensure it accepts the right file types
        initialInput.required = true; // Make it required
        carConditionUploads.appendChild(initialInput); // Add the initial input back
    });
    

    document.getElementById('cancel-appointment-btn').addEventListener('click', () => {
        cancelAppointment(ticketId);
        closeEditPopup(); 
    });

    document.getElementById('sms-history-btn').addEventListener('click', () => {
        openSmsHistoryPopup(appointmentId); // Open SMS history popup
        closeEditPopup(); 
    });
    

    // Close popup on clicking the close button
    document.getElementById('close-popup-btn').addEventListener('click', closeEditPopup);

    // Close the popup if clicked outside
    document.addEventListener('click', function closePopupOutside(event) {
        if (!popup.contains(event.target) && event.target !== buttonElement) {
            closeEditPopup();
            document.removeEventListener('click', closePopupOutside);
        }
    });
};
// --------------------------------- UPLOAD CHECKLIST CODES BEGIN ------------------------------------------------ //
// Function to show the upload checklist popup with appointment details
const showUploadChecklistPopup = (appointment) => {
    console.log(appointment);
    const popup = document.getElementById('upload-checklist-popup');
    const appointmentDetails = document.getElementById('appointment-details');
    const overlay = document.getElementById('upload-checklist-overlay'); // Get the overlay

    // Set the appointment details in the popup in the desired format
    appointmentDetails.innerHTML = `
        <p>Appointment #${appointment.id}</p>
        <p>${appointment.first_name} ${appointment.last_name}</p>
        <p>${appointment.car_brand} ${appointment.car_model} ${appointment.car_year} (${appointment.plate_number})</p>
    `;

    const uploadLink = `localhost/upload_files.php?token=${encodeURIComponent(appointment.token)}`;
    
    // Display the link for uploading files
    appointmentDetails.innerHTML += `
        <h4> Upload Link: </h4> 
        <div style="display: flex; align-items: center;">
            <input type="text" id="uploadLink" value="${uploadLink}" readonly style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; font-size: 16px; flex-grow: 1; box-sizing: border-box;">
            <button onclick="copyLink()" style="margin-left: 20px; background-color: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-size: 16px; transition: background-color 0.3s ease; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); flex-shrink: 0;">
            Copy Link</button>
        </div>
    `;

    popup.classList.remove('hidden'); // Remove hidden class to show the popup
    popup.classList.add('active'); // Add active class to make the popup visible
    overlay.classList.add('active'); // Show the overlay

    // Function to add another car condition upload input
    const addCarConditionUpload = () => {
        const carConditionUploads = document.getElementById('car-condition-uploads');
        const newInput = document.createElement('input');
        newInput.type = 'file';
        newInput.className = 'car-condition-file';
        newInput.accept = '.pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg'; // Added image formats
        newInput.required = true; // Make it required
        newInput.style.marginBottom = '10px'; // Add space below the input
        carConditionUploads.appendChild(newInput); // Add the new input to the uploads section
    };

    // Add event listener for the "Add Another Upload" button
    document.getElementById('add-car-condition-btn').addEventListener('click', addCarConditionUpload);
};
const closeUploadChecklistPopup = () => {
    document.getElementById('upload-checklist-popup').classList.add('hidden');
    document.getElementById('upload-checklist-overlay').classList.remove('active');
};

// Function to copy the upload link to the clipboard
const copyLink = () => {
    const link = document.getElementById("uploadLink");
    link.select();
    link.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");
    alert("Link copied to clipboard!");
};

document.getElementById('upload-checklist-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const checklistInput = document.getElementById('checklistFile');
    const checklistFile = checklistInput.files[0];
    
    // Create a new FormData object
    const formData = new FormData();

    // Append the checklist file if it exists
    if (checklistFile) {
        formData.append('checklist', checklistFile);
    } else {
        alert('Please select a checklist file to upload.');
        return; // Stop further execution if no file is selected
    }

    // Handle actual car condition uploads
    const carConditionFiles = document.querySelectorAll('.car-condition-file');
    carConditionFiles.forEach((input) => {
        const carConditionFile = input.files[0];
        if (carConditionFile) {
            formData.append('car_condition_files[]', carConditionFile); // Use array notation for multiple files
        }
    });

    // Upload the files to the server
    try {
        const response = await fetch('upload_checklist.php', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        if (result.success) {
            alert('Checklist and car condition files uploaded successfully!');
            checklistInput.value = ''; // Clear the checklist input
            carConditionFiles.forEach(input => input.value = ''); // Clear all car condition inputs
            document.getElementById('upload-checklist-popup').classList.remove('active'); // Close the popup
        } else {
            alert('Failed to upload files: ' + result.error);
        }
    } catch (error) {
        console.error('Error uploading files:', error);
        alert('Error uploading files. Please try again.');
    }
});


// --------------------------------- UPLOAD CHECKLIST CODES ENDS ------------------------------------------------- // 

const cancelAppointment = async (appointmentId) => {
    try {
        const response = await fetch('update_appointment_status_cancelled.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `appointment_id=${appointmentId}&status=cancelled`
        });

        const result = await response.json();
        if (result.success) {
            alert('Appointment marked as cancelled.');
            closeEditPopup();
            renderTickets(); // Refresh the ticket list
        } else {
            alert('Failed to cancel the appointment.');
        }
    } catch (error) {
        console.error('Error cancelling the appointment:', error);
    }
};

// Function to close the edit-popup
const closeEditPopup = () => {
  const popup = document.getElementById('edit-popup');
  if (popup) {
      popup.classList.remove('active');
  }
};

function resetPartFields() {
    const partNameInput = document.getElementById('partName');
    const partQuantityInput = document.getElementById('partQuantity');
    const availableStockInput = document.getElementById('availableStocks');
    const daysToDeliverInput = document.getElementById('daysToDeliver');

    partNameInput.value = '';
    partQuantityInput.value = '';
    availableStockInput.value = '';
    daysToDeliverInput.value = '';
    daysToDeliverInput.style.display = 'none'; // Hide daysToDeliver by default
    daysToDeliverInput.removeAttribute('required'); // Remove required if it was set
}

// Function to clear the parts list
function clearPartsList() {
    const partsContainer = document.getElementById('partsAddedContainer');
    partsContainer.innerHTML = '';
}

// Function to add part to the list
function addPartToList(part, quantity, daysToDeliver) {
    const partsContainer = document.getElementById('partsAddedContainer');
    const partElement = document.createElement('div');
    partElement.classList.add('part-item');

    // Add data attributes for easy access later
    partElement.dataset.partName = part.name;
    partElement.dataset.partQuantity = quantity;
    partElement.dataset.daysToDeliver = daysToDeliver;
    partElement.dataset.estimateCompletionDays = part.estimateCompletionDays || 0; // Handle missing or undefined values
    partElement.dataset.estimateCompletionHours = part.estimateCompletionHours || 0; // Handle missing or undefined values

    // Styling based on part availability
    if (daysToDeliver > 0) {
        partElement.classList.add("unavailable");
    }

    // Update the inner HTML to include estimate completion information
    partElement.innerHTML = `
        ${part.name} - Quantity: ${quantity} - Days to Deliver: ${daysToDeliver}
        - Estimate Completion: ${part.estimateCompletionDays} days, ${part.estimateCompletionHours} hours
        <button class="remove-part" onclick="this.parentElement.remove()">X</button>
    `;
    partsContainer.appendChild(partElement);
}

// Event listener for Add button
document.getElementById("add-part-to-list").addEventListener("click", () => {
    const partNameInput = document.getElementById('partName');
    const partQuantityInput = document.getElementById('partQuantity');
    const availableStockInput = document.getElementById('availableStocks');
    const daysToDeliverInput = document.getElementById('daysToDeliver');

    const selectedPart = {
        name: partNameInput.value,
        stock: parseInt(availableStockInput.value), // Assume this already accounts for "in-progress"
        inProgress: parseInt(availableStockInput.getAttribute('data-in-progress')) || 0,
        estimateCompletionDays: parseInt(partNameInput.getAttribute('data-estimate-completion-days')) || 0,
        estimateCompletionHours: parseInt(partNameInput.getAttribute('data-estimate-completion-hours')) || 0
    };

    console.log(`Selected Part: ${selectedPart.name}`);
    console.log(`Adjusted Stock: ${selectedPart.stock}`); // Using the stock directly
    console.log(`Estimate Completion Days: ${selectedPart.estimateCompletionDays}`);
    console.log(`Estimate Completion Hours: ${selectedPart.estimateCompletionHours}`);

    const quantity = parseInt(partQuantityInput.value);
    const daysToDeliver = parseInt(daysToDeliverInput.value) || 0;

    // Allow any quantity if stock is 0 or less
    if (selectedPart.stock > 0 && (quantity > selectedPart.stock || quantity <= 0)) {
        alert(`Please enter a valid quantity up to the available stock (${selectedPart.stock}).`);
        return;
    }

    // Show "Days to Deliver" only if the stock is less than or equal to 0
    if (selectedPart.stock <= 0) {
        if (!daysToDeliver || daysToDeliver <= 0) {
            alert("Days to Deliver is required for out-of-stock items.");
            return;
        }
    }

    if (selectedPart.name && quantity) {
        // Log the details before adding to the list
        console.log(`Part Name: ${selectedPart.name}, Quantity: ${quantity}, Days to Deliver: ${daysToDeliver}, Estimate Completion Days: ${selectedPart.estimateCompletionDays}, Estimate Completion Hours: ${selectedPart.estimateCompletionHours}`);
        
        // Include estimate completion details when adding to the list
        addPartToList(selectedPart, quantity, daysToDeliver, selectedPart.estimateCompletionDays, selectedPart.estimateCompletionHours);
        resetPartFields(); // Reset fields after adding to the list
    } else {
        alert("Please ensure the part and quantity are selected.");
    }
});

// Open Add Part Popup
document.getElementById("add-part-button").addEventListener("click", async () => {
    console.log("Add Part button clicked");

    // Fetch appointment_id and job_order_id
    const popup = document.getElementById("progress-report-popup");
    const appointmentId = popup.getAttribute("data-appointment-id");
    const jobOrderId = popup.getAttribute("data-job-order-id");

    // Log the fetched IDs
    console.log(`Fetched Appointment ID: ${appointmentId}, Job Order ID: ${jobOrderId}`);

    // Show the add-part-popup and overlay
    document.getElementById("add-part-popup").classList.add("show");
    document.getElementById("overlay").classList.add("show");

    const partNameInput = document.getElementById('partName');
    const partQuantityInput = document.getElementById('partQuantity');
    const availableStockInput = document.getElementById('availableStocks');
    const daysToDeliverInput = document.getElementById('daysToDeliver');
    
    // Create dropdown container
    const suggestionsContainer = document.createElement("div");
    suggestionsContainer.classList.add("part-suggestions-list");
    partNameInput.parentElement.style.position = 'relative';
    partNameInput.parentElement.appendChild(suggestionsContainer);

    // Function to fetch and show parts suggestions
    const fetchAndDisplayParts = async () => {
        const searchTerm = partNameInput.value.trim();
        suggestionsContainer.innerHTML = ""; // Clear previous suggestions
    
        const parts = await fetchParts(searchTerm); // Fetch parts based on input
        parts.forEach(part => {
            const suggestionItem = document.createElement("div");
            suggestionItem.classList.add("part");
    
            const stockCount = parseInt(part.stock, 10);
            const inProgressCount = parseInt(part.inProgress, 10);
            const adjustedStock = stockCount - inProgressCount;
    
            console.log(`Part: ${part.name}, Stock: ${stockCount}, Estimate Days: ${part.estimate_completion_days}, Estimate Hours: ${part.estimate_completion_hours}`);
    
            // Change the text display for parts based on stock
            if (adjustedStock <= 0) {
                suggestionItem.textContent = `${part.name} (Out of Stock)`;
                suggestionItem.style.color = "#ff0000";
                suggestionItem.style.backgroundColor = "#ffe6e6";
            } else {
                suggestionItem.textContent = `${part.name} (Available: ${adjustedStock})`;
            }
    
            console.log(`Part fetched: ${part.name}, Original Stock: ${part.stock}`);
    
            // On selecting a part, fetch daysToDeliver and estimate completion details from the database and populate fields
            suggestionItem.addEventListener("click", async () => {
                console.log(`Before setting input, Stock: ${part.stock}`);
                partNameInput.value = part.name;
                availableStockInput.value = part.stock - part.inProgress;
                availableStockInput.setAttribute('data-in-progress', part.inProgress);
                partQuantityInput.max = part.stock - part.inProgress;
    
                // Populate estimate completion details
                console.log(`Selected Part: ${part.name}, Estimate Days: ${part.estimate_completion_days}, Estimate Hours: ${part.estimate_completion_hours}`);
                partNameInput.setAttribute("data-estimate-completion-days", part.estimate_completion_days || 0);
                partNameInput.setAttribute("data-estimate-completion-hours", part.estimate_completion_hours || 0);
    
                // Show/hide daysToDeliver based on stock availability
                if (part.stock - part.inProgress > 0) {
                    daysToDeliverInput.style.display = 'none';
                    daysToDeliverInput.value = 0;
                    daysToDeliverInput.removeAttribute('required');
                } else {
                    const daysToDeliver = await fetchDaysToDeliver(part.name);
                    if (daysToDeliver !== null) {
                        daysToDeliverInput.value = daysToDeliver;
                        daysToDeliverInput.style.display = 'block';
                        daysToDeliverInput.setAttribute('required', true);
                    } else {
                        daysToDeliverInput.value = 0;
                        daysToDeliverInput.style.display = 'none';
                        daysToDeliverInput.removeAttribute('required');
                    }
                }
    
                suggestionsContainer.style.display = "none"; // Hide suggestions
            });
    
            suggestionsContainer.appendChild(suggestionItem);
        });
    
        suggestionsContainer.style.display = parts.length ? "block" : "none"; // Show suggestions only if there are parts
    };
    

    partNameInput.addEventListener('input', fetchAndDisplayParts);
    partNameInput.addEventListener('focus', fetchAndDisplayParts);

    partNameInput.addEventListener('input', () => {
        if (partNameInput.value.trim() === '') {
            resetPartFields();
        }
    });

    document.addEventListener("click", (e) => {
        if (!partNameInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            suggestionsContainer.style.display = "none";
        }
    });
});


const fetchDaysToDeliver = async (partName) => {
    try {
        const response = await fetch(`/fetch_days_to_deliver.php?partName=${encodeURIComponent(partName)}`);
        if (response.ok) {
            const data = await response.json();
            return data.daysToDeliver; // Assuming the PHP script returns { daysToDeliver: number }
        }
        return null;
    } catch (error) {
        console.error("Error fetching days to deliver:", error);
        return null;
    }
};


// Close the Add Part Popup and reset fields and parts list
document.getElementById("close-add-part-popup").addEventListener("click", () => {
    document.getElementById("add-part-popup").classList.remove("show");
    document.getElementById("overlay").classList.remove("show");
    resetPartFields(); // Reset fields on close
    clearPartsList();  // Clear the list of added parts on close
});
const refreshProgressReport = async (appointmentId) => {
    try {
        const progressReportData = await fetchProgressReportById(appointmentId);
        
        if (progressReportData) {
            // Assuming you have a function to render the progress report popup
            toggleProgressReportPopup(appointmentId);
        }
    } catch (error) {
        console.error('Error refreshing the progress report:', error);
    }
};

// Save part logic if needed, also reset fields on save
document.getElementById("save-part-button").addEventListener("click", async () => {
    const partsContainer = document.getElementById("partsAddedContainer");
    const partItems = partsContainer.getElementsByClassName("part-item");

    // Fetch appointment_id and job_order_id
    const popup = document.getElementById("progress-report-popup");
    const appointmentId = popup.getAttribute("data-appointment-id");
    const jobOrderId = popup.getAttribute("data-job-order-id");

    // Validate that there are parts to save and IDs are present
    if (!appointmentId || !jobOrderId) {
        alert("Missing Appointment ID or Job Order ID. Please try again.");
        return;
    }
    if (partItems.length === 0) {
        alert("No parts added to save.");
        return;
    }

    // Iterate over each part added to the list and send it to the backend
    for (let i = 0; i < partItems.length; i++) {
        const partElement = partItems[i];
        const partName = partElement.dataset.partName;
        const partQuantity = parseInt(partElement.dataset.partQuantity);
        const daysToDeliver = parseInt(partElement.dataset.daysToDeliver) || 0;
        const estimateCompletionDays = parseInt(partElement.dataset.estimateCompletionDays) || 0;
        const estimateCompletionHours = parseInt(partElement.dataset.estimateCompletionHours) || 0;

        // Validate part data
        if (!partName || isNaN(partQuantity) || partQuantity <= 0) {
            console.warn("Invalid part data detected. Skipping this part.");
            alert("Please ensure all parts have valid details.");
            return;
        }

        console.log(`Part Name: ${partName}`);
        console.log(`Part Quantity: ${partQuantity}`);
        console.log(`Days to Deliver: ${daysToDeliver}`);
        console.log(`Estimate Completion Days: ${estimateCompletionDays}`);
        console.log(`Estimate Completion Hours: ${estimateCompletionHours}`);
        console.log(`Appointment ID: ${appointmentId}`);
        console.log(`Job Order ID: ${jobOrderId}`);

        // Prepare the data object to send to the backend
        const partData = {
            appointment_id: appointmentId,
            job_order_id: jobOrderId,
            part_name: partName,
            part_quantity: partQuantity,
            days_to_deliver: daysToDeliver,
            availability: daysToDeliver > 0 ? "Unavailable" : "Available",
            progress: "In Progress",
            estimate_completion_days: estimateCompletionDays,
            estimate_completion_hours: estimateCompletionHours,
        };

        // Send the part data to the backend
        try {
            const response = await fetch("save_job_order_part.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(partData),
            });

            const result = await response.json();
            if (result.success) {
                console.log(`Successfully saved part: ${partName}`);
            } else {
                console.error(`Failed to save part: ${partName}. Error: ${result.message}`);
                alert(`Error saving part: ${partName}. Please try again.`);
                return;
            }
        } catch (error) {
            console.error("Error saving part:", error);
            alert("An error occurred while saving the parts. Please try again.");
            return;
        }
    }

    // Close the popup and reset after all parts are processed
    alert("All parts have been processed and estimate completion updated.");
    document.getElementById("add-part-popup").classList.remove("show");
    document.getElementById("overlay").classList.remove("show");
    resetPartFields(); // Reset fields on save
    clearPartsList();

    // Call the function to refresh the progress report
    refreshProgressReport(appointmentId, jobOrderId);
});


function clearPartsList() {
    const partsContainer = document.getElementById('partsAddedContainer');
    partsContainer.innerHTML = '';
}
// -------------------------------------------------------------- SERVICE HISTORY --------------------------------------------------------------------------------- //
const fetchServiceHistory = async () => {
    try {
        const response = await fetch('get_appointment_complete.php'); // Replace with your actual API endpoint
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        // Filter appointments to only include those with "complete" status
        return data.filter(item => item.status === 'complete');
    } catch (error) {
        console.error('Failed to fetch service history:', error);
        return [];
    }
};

// Function to render service history in the UI
let currentHistoryPage = 1;
const historyItemsPerPage = 10;

const renderServiceHistory = async () => {
    const history = await fetchServiceHistory();  // Fetch service history data

    // Sort history alphabetically by name, ignoring case sensitivity
    history.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

    const serviceHistoryList = document.getElementById('service-history-list');
    const searchInput = document.getElementById('service-history-search').value.toLowerCase();
    serviceHistoryList.innerHTML = '';  // Clear previous history

    const renderedPlates = {};  // To track rendered plate numbers

    // Filter the history based on the search input
    const filteredHistory = history.filter(item => item.name.toLowerCase().includes(searchInput));

    // Pagination calculations
    const totalHistoryPages = Math.ceil(filteredHistory.length / historyItemsPerPage);
    const startIndex = (currentHistoryPage - 1) * historyItemsPerPage;
    const endIndex = startIndex + historyItemsPerPage;
    const paginatedHistory = filteredHistory.slice(startIndex, endIndex);

    paginatedHistory.forEach(item => {
        const appointmentDate = new Date(item.date);
        const day = appointmentDate.toLocaleDateString('en-US', { weekday: 'short' });
        const date = appointmentDate.getDate();

        // Check if we already rendered this plate number
        if (renderedPlates[item.platenumber]) {
            const existingCard = renderedPlates[item.platenumber];
            existingCard.querySelector(".client-name").textContent = item.name;
            existingCard.querySelector(".contact").innerHTML = `<i class="fas fa-phone"></i> ${item.contact}`;
            existingCard.querySelector(".vehicle").innerHTML = `<i class="fas fa-car"></i> ${item.vehicle}`;

            const serviceDetails = document.createElement('div');
            serviceDetails.classList.add('service-mechanic');
            
            existingCard.querySelector('.appointment-details-ticket').appendChild(serviceDetails);
        } else {
            const historyCard = document.createElement('div');
            historyCard.classList.add('appointment-card');
            historyCard.innerHTML = `
                <div class="appointment-details-ticket">
                    <h3 class="client-name">${item.name}</h3>
                    <p class="contact"><i class="fas fa-phone"></i> ${item.contact}</p>
                    <p class="vehicle"><i class="fas fa-car"></i> ${item.vehicle}</p>
                    <p class="platenumber"><i class="fa-regular fa-id-card"></i>${item.platenumber}</p>
                </div>
                <div class="appointment-actions-ticket">
                    <button class="view-btn" data-plate-number="${item.platenumber}" data-id="${item.id}">View</button>
                </div>
            `;
            
            serviceHistoryList.appendChild(historyCard);
            renderedPlates[item.platenumber] = historyCard;
        }
    });

    // Add event listeners for View buttons
    const viewButtons = document.querySelectorAll('#service-history-list .view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const plate_number = event.target.getAttribute('data-plate-number');
            toggleViewPopup(plate_number);
        });
    });

    // Render pagination controls
    renderServiceHistoryPaginationControls(totalHistoryPages);
};

const renderServiceHistoryPaginationControls = (totalPages) => {
    const paginationContainer = document.getElementById('service-history-pagination-controls');
    paginationContainer.innerHTML = ''; // Clear previous controls

    const maxVisiblePages = 5;
    const startPage = Math.floor((currentHistoryPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.disabled = currentHistoryPage === 1;
    prevButton.addEventListener('click', () => {
        currentHistoryPage--;
        renderServiceHistory();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    paginationContainer.appendChild(prevButton);

    // Display a maximum of 5 page numbers
    for (let i = startPage; i <= endPage; i++) {
        const pageNumber = document.createElement('span');
        pageNumber.textContent = i;
        pageNumber.classList.add('page-number');
        if (i === currentHistoryPage) {
            pageNumber.classList.add('active');
        }
        pageNumber.addEventListener('click', () => {
            currentHistoryPage = i;
            renderServiceHistory();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        paginationContainer.appendChild(pageNumber);
    }

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.disabled = currentHistoryPage === totalPages;
    nextButton.addEventListener('click', () => {
        currentHistoryPage++;
        renderServiceHistory();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    paginationContainer.appendChild(nextButton);
};



// Function to show the view popup
// Function to open the view popup and fetch service data
const toggleViewPopup = (plate_number) => {
    fetchServiceData(plate_number);  // Fetch service data based on plate number
    document.getElementById('view-service-popup').classList.remove('hidden');
    document.querySelector(".overlay").classList.remove("hidden");
};
function fetchAppointmentIdByJobOrderId(jobOrderId, callback) {
    fetch(`fetch_appointment_id.php?job_order_id=${jobOrderId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.appointment_id) {
                callback(data.appointment_id);
            } else {
                console.error('No appointment ID found for job order ID:', jobOrderId);
            }
        })
        .catch(error => {
            console.error("Error fetching appointment ID:", error);
        });
}

// Function to fetch service data
function fetchServiceData(plate_number) {
    fetch(`fetch_service_data.php?plate_number=${plate_number}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Populate Basic Info
            if (data.basic_info) {
                document.querySelector(".profile-info h2").innerHTML = `<i class="fas fa-user user-icon"></i> ${data.basic_info.first_name} ${data.basic_info.last_name}`;
                document.querySelector(".basic-info").innerHTML = `
                    <div class="section-header">Basic Information</div>
                    <p><span class="label-container"><i class="fas fa-car icon"></i> Car Model</span><br><span class="value">${data.basic_info.car_model}</span></p>
                    <p><span class="label-container"><i class="fas fa-industry icon"></i> Car Brand</span><br><span class="value">${data.basic_info.car_brand}</span></p>
                    <p><span class="label-container"><i class="fas fa-id-card icon"></i> Plate Number</span><br><span class="value">${data.basic_info.plate_number}</span></p>
                    <p><span class="label-container"><i class="fas fa-calendar icon"></i> Year Model</span><br><span class="value">${data.basic_info.car_year}</span></p>
                    <p><span class="label-container"><i class="fas fa-phone icon"></i> Phone Number</span><br><span class="value">${data.basic_info.contact_number}</span></p>
                `;
            }

            // Populate Appointment Schedule
            const appointmentsContainer = document.querySelector(".appointment-schedule");
            appointmentsContainer.innerHTML = '<h3>Appointment Schedule</h3>';
            if (data.appointments && data.appointments.length > 0) {
                data.appointments.forEach(appointment => {
                    appointmentsContainer.innerHTML += `
                        <div class="appointment">
                            <h4>${appointment.appointment_date}</h4>
                            <p>Service: ${appointment.service}</p>
                            <p>Mechanic: ${appointment.mechanic}</p>
                            <p>___________________________________________</p>
                        </div>
                    `;
                });
            }

            // Populate Repair History
            const repairsTableBody = document.querySelector(".history-of-repairs tbody");
            repairsTableBody.innerHTML = ''; // Clear previous entries

            if (data.repair_history && data.repair_history.length > 0) {
                data.repair_history.forEach(repair => {
                    // Create a table row for each repair record
                    const row = document.createElement("tr");

                    row.innerHTML = `
                        <td>#${repair.id}</td>
                        <td>${repair.service}</td>
                        <td>${repair.appointment_date}</td>
                        <td>${repair.appointment_time}</td>
                        <td>${repair.mechanic}</td>
                    `;

                    // Create the actions container cell with button and dropdown
                    const actionsCell = document.createElement("td");
                    actionsCell.innerHTML = `
                        <div class="actions-container">
                            <button class="actions-btn">⋮</button>
                            <div class="dropdown hidden">
                                <button class="job-order-check-btn" data-repair-id="${repair.id}">Check Job Order</button>
                                <button class="examine-checklist-btn" data-repair-id="${repair.id}">Examine Checklist</button>
                                <button class="detailed-repair-copy-btn" data-repair-id="${repair.id}">Detailed Repair Copy</button>
                                <button class="sms-history-btn" data-repair-id="${repair.id}">View SMS History</button>
                            </div>
                        </div>
                    `;

                    const smsHistoryButton = actionsCell.querySelector(".sms-history-btn");
                    smsHistoryButton.addEventListener("click", () => {
                        const jobOrderId = smsHistoryButton.getAttribute("data-repair-id");
                        fetchAppointmentIdByJobOrderId(jobOrderId, (appointmentId) => {
                            openSmsHistoryPopup(appointmentId);
                        });
                    });
                    // Detailed Repair Copy Button
                    const detailedRepairCopyButton = actionsCell.querySelector(".detailed-repair-copy-btn");
                    detailedRepairCopyButton.addEventListener("click", function () {
                        const repairId = this.getAttribute("data-repair-id"); // Use 'this' to reference the current button
                        openRepairCopyPopup(repairId); // Open the repair copy popup
                    });

                    // Append the actions cell to the row
                    row.appendChild(actionsCell);

                    // Append the row to the table body
                    repairsTableBody.appendChild(row);

                    const actionsButton = actionsCell.querySelector(".actions-btn");
                    actionsButton.addEventListener("click", () => {
                        console.log("Actions button clicked for repair ID:", repair.id);
                    });
                });
                
            }

        })
        .catch(error => {
            console.error("Error fetching service data:", error);
        });
}
function openRepairCopyPopup(repairId) {
    console.log("Opening Repair Copy popup for repair ID:", repairId);

    // Call the fetch function to load repair copy details into the popup
    fetchRepairCopyDetails(repairId);

    // Display the popup
    const repairCopyPopup = document.getElementById("repair-copy-popup");
    repairCopyPopup.classList.remove("hidden");
    repairCopyPopup.style.display = "block";

    // Close button functionality
    const closeBtn = document.getElementById("close-repair-copy-popup");
    closeBtn.addEventListener("click", () => {
        repairCopyPopup.style.display = "none";
    });

    // Print button functionality
    const printBtn = document.getElementById("print-repair-copy-btn");
    printBtn.addEventListener("click", () => {
        console.log("Printing Repair Copy...");

        // Temporarily hide buttons during printing
        closeBtn.style.display = "none";
        printBtn.style.display = "none";

        // Get the content of the repair copy popup
        const reportContent = repairCopyPopup.innerHTML;

        // Open a new window for printing
        const printWindow = window.open("", "", "width=800,height=600");

        // Write the popup content to the new window
        printWindow.document.write(`
            <html>
                <head>
                    <title>Repair Copy</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                        }
                        .print-btn, .close-btn {
                            display: none;
                        }
                    </style>
                </head>
                <body>${reportContent}</body>
            </html>
        `);
        printWindow.document.close(); // Close the document to finish loading
        printWindow.print(); // Trigger the print dialog

        // Restore buttons after printing
        closeBtn.style.display = "block";
        printBtn.style.display = "block";
    });
}



function fetchRepairCopyDetails(repair_id) {
    // Fetch repair copy details from the server
    fetch(`fetch_repair_copy_details.php?repair_id=${repair_id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Debugging: Response data (Repair Copy):", data);
            const repairCopyHeaderContainer = document.querySelector("#repair-copy-header");
            const repairCopyDetailsContainer = document.querySelector("#repair-copy-details");

            // Clear previous content before populating new data
            repairCopyHeaderContainer.innerHTML = "";
            repairCopyDetailsContainer.innerHTML = "";

            if (data.error) {
                repairCopyHeaderContainer.innerHTML = `<p>${data.error}</p>`;
                repairCopyDetailsContainer.innerHTML = "";
                return;
            }

            // Generate Header Section (appended only once)
            repairCopyHeaderContainer.innerHTML = `
                <div class="business-info" style="text-align: center; margin-bottom: 20px;">
                    <div class="business-details" style="display: flex; align-items: center; justify-content: center; gap: 20px;">
                        <img src="initial-logo.png" alt="AG-Tech Logo" class="business-logo" style="height: 80px; width: auto;">
                        <div class="business-text">
                            <h2 class="business-name" style="margin: 0; font-size: 20px; font-weight: bold;">AG TECHNICIAN SERVICES</h2>
                            <p class="business-address" style="margin: 0;">BLK 34 LOT 13 SANTOL KANAN St. corner MULAWIN</p>
                            <p class="business-address" style="margin: 0;">AMPARO VILLAGE CALOOCAN CITY</p>
                            <p class="business-contact" style="margin: 0;">AG TECH - ALEX Mobile No: 09453611707</p>
                        </div>
                    </div>
                </div>
                <div style="text-align: center; margin-bottom: 20px;">
                    <h2 style="color: red; font-weight: bold;">ADMIN DETAILED REPAIR COPY</h2>
                    <div style="display: inline-flex; gap: 20px; font-size: 18px; justify-content: center;">
                        <p><strong>Brand:</strong> ${data.car_brand || "N/A"}</p>
                        <p><strong>Model:</strong> ${data.car_model || "N/A"}</p>
                        <p><strong>Year:</strong> ${data.car_year || "N/A"}</p>
                        <p><strong>Plate Number:</strong> ${data.plate_number || "N/A"}</p>
                    </div>
                </div>`;

            // Process Job Orders and Generate Details
            data.job_orders.forEach((job) => {
                // Extract unique technicians, excluding the mechanic
                const technicians = job.order_info.technicians || [];
                const filteredTechnicians = technicians.filter(tech => tech !== job.order_info.mechanic);
                const technicianNames = filteredTechnicians.length > 0 ? filteredTechnicians.join(", ") : "N/A";

                // Append the job order container
                repairCopyDetailsContainer.innerHTML += `
                    <div style="margin-bottom: 20px; border-bottom: 1px solid #ccc; padding-bottom: 0px;">
                        <h3 style="margin-bottom: 15px;">Job Order #${job.order_info.id}</h3>
                        <div style="display: flex; gap: 10px; margin-bottom: -5px;">
                            <div style="flex: 1;">
                                <p><strong>Customer:</strong> ${job.order_info.first_name} ${job.order_info.last_name}</p>
                            </div>
                            <div style="flex: 1;">
                                <p><strong>Service:</strong> ${job.order_info.service}</p>
                            </div>
                        </div>
                        <div style="display: flex; gap: 10px; margin-bottom: -5px;">
                            <div style="flex: 1;">
                                <p><strong>Mechanic:</strong> ${job.order_info.mechanic}</p>
                            </div>
                            <div style="flex: 1;">
                                <p><strong>Appointment Date:</strong> ${job.order_info.appointment_date}</p>
                            </div>
                        </div>
                        <div>
                            <p><strong>Technicians:</strong> ${technicianNames}</p>
                        </div>
                        <table border="1" style="width: 100%; border-collapse: collapse; text-align: center; font-size: 14px; margin-top: 10px;">
                            <thead>
                                <tr>
                                    <th>Part Name</th>
                                    <th>Installed By</th>
                                    <th>Quantity</th>
                                    <th>Unit Price</th>
                                    <th>Labor Cost</th>
                                    <th>Total Price</th>
                                </tr>
                            </thead>
                            <tbody id="parts-table-body-${job.order_info.id}"></tbody>
                        </table>
                        <div style="margin-top: 10px; text-align: right; font-size: 16px;">
                            <p><strong>Total Parts Cost:</strong> ₱${job.total_parts_cost.toFixed(2)}</p>
                            <p><strong>Labor Cost:</strong> ₱${job.total_labor_cost.toFixed(2)}</p>
                            <p><strong>Grand Total:</strong> ₱${job.grand_total.toFixed(2)}</p>
                        </div>
                    </div>`;

                // Select the current job order's tbody
                const tbody = document.querySelector(`#parts-table-body-${job.order_info.id}`);

                // Add rows for each part in the job
                job.parts.forEach((part) => {
                    const unitPrice = parseFloat(part.retail_price) || 0;
                    const laborCost = parseFloat(part.labor_cost) || 0; // Fetch labor cost
                    const totalPrice = parseFloat(part.total_price) || 0;

                    tbody.innerHTML += `
                        <tr>
                            <td>${part.part_name}</td>
                            <td>${part.completed_by || "N/A"}</td>
                            <td>${part.part_quantity}</td>
                            <td>₱${unitPrice.toFixed(2)}</td>
                            <td>₱${laborCost.toFixed(2)}</td>
                            <td>₱${totalPrice.toFixed(2)}</td>
                        </tr>`;
                });
            });

            // Generate Footer Section
            repairCopyDetailsContainer.innerHTML += `
                <div style="text-align: left; margin-top: -10px; font-style: italic;">
                    Thank you for choosing AG Technician Services!
                </div>`;

            // Display the modal
            const popup = document.getElementById("repair-copy-popup");
            popup.classList.remove("hidden");
            popup.style.display = "block";
        })
        .catch(error => {
            console.error("Error fetching repair copy details:", error);
            const repairCopyHeaderContainer = document.querySelector("#repair-copy-header");
            const repairCopyDetailsContainer = document.querySelector("#repair-copy-details");
            repairCopyHeaderContainer.innerHTML = `<p>Error loading the repair copy header. Please try again later.</p>`;
            repairCopyDetailsContainer.innerHTML = `<p>Error loading the repair copy details. Please try again later.</p>`;
        });
}










function openCustomerReportPopup() {
    // Get the plate number
    const basicInfoContainer = document.querySelector(".basic-info");
    if (!basicInfoContainer) {
        alert("Basic Information section not found.");
        return;
    }

    const valueElements = basicInfoContainer.querySelectorAll(".value");
    const plate_number = valueElements[2] ? valueElements[2].textContent.trim() : "";

    if (!plate_number) {
        alert("Plate number not found. Please ensure the data is loaded correctly.");
        return;
    }

    console.log("Debugging: Plate number fetched in openCustomerReportPopup:", plate_number);

    // Set the plate number as a global variable or pass it via the button
    currentPlateNumber = plate_number;

    // Open the report popup
    document.getElementById("customerReportPopup").classList.remove("hidden");
}

function generateCustomerReport(plate_number) {
    console.log("Debugging: Plate number passed to generateCustomerReport:", plate_number);

    if (!plate_number) {
        alert("Plate number is missing. Cannot generate the report.");
        return;
    }

    const reportType = document.getElementById("customerReportTypeSelect").value;
    const reportBody = document.querySelector(".customer-generate-report-body");

    if (!reportType) {
        reportBody.innerHTML = "<p>Please select a report type to generate.</p>";
        return;
    }

    reportBody.innerHTML = "<p>Loading...</p>"; // Show loading message

    if (reportType === "Maintenance") {
        const fetchUrl = `fetch_maintenance_log.php?plate_number=${plate_number}`;
        console.log("Debugging: Fetch URL (Maintenance):", fetchUrl);

        // Fetch maintenance log data
        fetch(fetchUrl)
            .then((response) => {
                console.log("Debugging: Response status (Maintenance):", response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Debugging: Response data (Maintenance):", data);
                if (data.error) {
                    reportBody.innerHTML = `<p>${data.error}</p>`;
                    return;
                }

                let maintenanceLog = `
                    <div class="business-info" style="text-align: center; margin-bottom: 20px;">
                        <div class="business-details" style="display: flex; align-items: center; justify-content: center; gap: 20px;">
                            <img src="initial-logo.png" alt="AG-Tech Logo" class="business-logo" style="height: 80px; width: auto;">
                            <div class="business-text">
                                <h2 class="business-name" style="margin: 0; font-size: 20px; font-weight: bold;">AG TECHNICIAN SERVICES</h2>
                                <p class="business-address" style="margin: 0;">BLK 34 LOT 13 SANTOL KANAN St. corner MULAWIN</p>
                                <p class="business-address" style="margin: 0;">AMPARO VILLAGE CALOOCAN CITY</p>
                                <p class="business-contact" style="margin: 0;">AG TECH - ALEX Mobile No: 09453611707</p>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h2 style="color: red; font-weight: bold;">VEHICLE MAINTENANCE LOG</h2>
                        <div style="display: inline-flex; gap: 20px; font-size: 18px; justify-content: center;">
                            <p><strong>Brand:</strong> ${data.car_brand}</p>
                            <p><strong>Model:</strong> ${data.car_model}</p>
                            <p><strong>Year:</strong> ${data.car_year}</p>
                            <p><strong>Plate Number:</strong> ${data.plate_number}</p>
                        </div>
                        <div style="text-align: right; margin-top: 10px; font-size: 18px;">
                            <p><strong>Date Generated:</strong> ${data.generated_date}</p>
                        </div>
                    </div>
                    <table border="1" style="width: 100%; border-collapse: collapse; text-align: center; font-size: 14px;">
                        <thead style="background-color: #f5f5f5; font-weight: bold;">
                            <tr>
                                <th>Job Order ID</th>
                                <th>Appointment Date</th>
                                <th>Completed Service</th>
                                <th>Assigned Mechanic</th>
                                <th>Parts Cost</th>
                                <th>Labor Cost</th>
                                <th>Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>`;

                let totalMaterial = 0;
                let totalLabor = 0;

                data.jobs.forEach((job) => {
                    let materialCost = 0;
                    job.parts.forEach((part) => {
                        const partRetailPrice = parseFloat(part.retail_price) || 0;
                        const partQuantity = parseInt(part.quantity) || 0;
                        materialCost += partRetailPrice * partQuantity;
                    });

                    totalMaterial += materialCost;
                    totalLabor += parseFloat(job.total_labor) || 0;

                    maintenanceLog += `
                        <tr>
                            <td>${job.job_order_id}</td>
                            <td>${job.date_performed}</td>
                            <td>${job.task}</td>
                            <td>${job.performed_by}</td>
                            <td>${materialCost.toFixed(2)}</td>
                            <td>${(parseFloat(job.total_labor) || 0).toFixed(2)}</td>
                            <td>${(materialCost + (parseFloat(job.total_labor) || 0)).toFixed(2)}</td>
                        </tr>`;
                });

                maintenanceLog += `
                        </tbody>
                        <tfoot>
                            <tr style="font-weight: bold;">
                                <td colspan="4">TOTAL</td>
                                <td>${totalMaterial.toFixed(2)}</td>
                                <td>${totalLabor.toFixed(2)}</td>
                                <td>${(totalMaterial + totalLabor).toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                    <div style="text-align: left; margin-top: 5px; font-style: italic;">
                        Thank you for choosing AG Technician Services!
                    </div>`;

                reportBody.innerHTML = maintenanceLog;
            })
            .catch((error) => {
                console.error("Error fetching maintenance log:", error);
                reportBody.innerHTML = "<p>Error loading the maintenance log. Please try again later.</p>";
            });

    } else if (reportType === "Repair") {
        const fetchUrl = `fetch_repair_history.php?plate_number=${plate_number}`;
        console.log("Debugging: Fetch URL (Repair History):", fetchUrl);

        // Fetch repair history data
        fetch(fetchUrl)
            .then((response) => {
                console.log("Debugging: Response status (Repair History):", response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Debugging: Response data (Repair History):", data);
                if (data.error) {
                    reportBody.innerHTML = `<p>${data.error}</p>`;
                    return;
                }

                let repairHistory = `
                    <div class="business-info" style="text-align: center; margin-bottom: 20px;">
                        <div class="business-details" style="display: flex; align-items: center; justify-content: center; gap: 20px;">
                            <img src="initial-logo.png" alt="AG-Tech Logo" class="business-logo" style="height: 80px; width: auto;">
                            <div class="business-text">
                                <h2 class="business-name" style="margin: 0; font-size: 20px; font-weight: bold;">AG TECHNICIAN SERVICES</h2>
                                <p class="business-address" style="margin: 0;">BLK 34 LOT 13 SANTOL KANAN St. corner MULAWIN</p>
                                <p class="business-address" style="margin: 0;">AMPARO VILLAGE CALOOCAN CITY</p>
                                <p class="business-contact" style="margin: 0;">AG TECH - ALEX Mobile No: 09453611707</p>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h2 style="color: red; font-weight: bold;">REPAIR HISTORY REPORT</h2>
                        <div style="display: inline-flex; gap: 20px; font-size: 18px; justify-content: center;">
                            <p><strong>Brand:</strong> ${data.car_brand}</p>
                            <p><strong>Model:</strong> ${data.car_model}</p>
                            <p><strong>Year:</strong> ${data.car_year}</p>
                            <p><strong>Plate Number:</strong> ${data.plate_number}</p>
                        </div>
                        <div style="text-align: right; margin-top: 10px; font-size: 18px;">
                            <p><strong>Date Generated:</strong> ${data.generated_date}</p>
                        </div>
                    </div>`;

                data.job_orders.forEach((job) => {
                    repairHistory += `
                        <div style="margin-bottom: 20px; border-bottom: 1px solid #ccc; padding-bottom: 10px;">
                            <h3 style="margin-bottom: 15px;">Job Order #${job.order_info.id}</h3>
                            <div style="display: flex; gap: 10px; margin-bottom: -5px;">
                                <div style="flex: 1;">
                                    <p><strong>Customer:</strong> ${job.order_info.first_name} ${job.order_info.last_name}</p>
                                </div>
                                <div style="flex: 1;">
                                    <p><strong>Mechanic:</strong> ${job.order_info.mechanic}</p>
                                </div>
                            </div>
                            <div style="display: flex; gap: 10px; margin-bottom: -5px;">
                                <div style="flex: 1;">
                                    <p><strong>Appointment Date:</strong> ${job.order_info.appointment_date}</p>
                                </div>
                                <div style="flex: 1;">
                                    <p><strong>Service:</strong> ${job.order_info.service}</p>
                                </div>
                            </div>
                            <table border="1" style="width: 100%; border-collapse: collapse; text-align: center; font-size: 14px; margin-top: 10px;">
                                <thead>
                                    <tr>
                                        <th>Part Name</th>
                                        <th>Quantity</th>
                                        <th>Unit Price</th>
                                        <th>Total Price</th>
                                    </tr>
                                </thead>
                                <tbody>`;

                    let totalPrice = 0;
                    job.parts.forEach((part) => {
                        totalPrice += parseFloat(part.total_price) || 0;

                        repairHistory += `
                                    <tr>
                                        <td>${part.part_name}</td>
                                        <td>${part.part_quantity}</td>
                                        <td>${parseFloat(part.retail_price).toFixed(2)}</td>
                                        <td>${parseFloat(part.total_price).toFixed(2)}</td>
                                    </tr>`;
                    });

                    repairHistory += `
                                </tbody>
                            </table>
                            <div style="margin-top: 10px; text-align: right; font-size: 16px;">
                                <p><strong>Total Parts Cost:</strong> ${job.total_parts_cost.toFixed(2)}</p>
                                <p><strong>Labor Cost:</strong> ${job.total_labor_cost.toFixed(2)}</p>
                                <p><strong>Grand Total:</strong> ${job.grand_total.toFixed(2)}</p>
                            </div>
                        </div>`;
                });

                repairHistory += `
                    <div style="text-align: left; margin-top: 5px; font-style: italic;">
                        Thank you for choosing AG Technician Services!
                    </div>`;

                reportBody.innerHTML = repairHistory;
            })
            .catch((error) => {
                console.error("Error fetching repair history:", error);
                reportBody.innerHTML = "<p>Error loading the repair history. Please try again later.</p>";
            });
    } else if (reportType === "Service") {
        const fetchUrl = `fetch_service_log.php?plate_number=${plate_number}`;
        console.log("Debugging: Fetch URL (Service):", fetchUrl);
    
        // Fetch service log data
        fetch(fetchUrl)
            .then((response) => {
                console.log("Debugging: Response status (Service):", response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Debugging: Response data (Service):", data);
    
                if (data.error) {
                    reportBody.innerHTML = `<p>${data.error}</p>`;
                    return;
                }
    
                // Start generating the service log report
                let serviceLog = `
                    <div class="business-info" style="text-align: center; margin-bottom: 20px;">
                        <div class="business-details" style="display: flex; align-items: center; justify-content: center; gap: 20px;">
                            <img src="initial-logo.png" alt="AG-Tech Logo" class="business-logo" style="height: 80px; width: auto;">
                            <div class="business-text">
                                <h2 class="business-name" style="margin: 0; font-size: 20px; font-weight: bold;">AG TECHNICIAN SERVICES</h2>
                                <p class="business-address" style="margin: 0;">BLK 34 LOT 13 SANTOL KANAN St. corner MULAWIN</p>
                                <p class="business-address" style="margin: 0;">AMPARO VILLAGE CALOOCAN CITY</p>
                                <p class="business-contact" style="margin: 0;">AG TECH - ALEX Mobile No: 09453611707</p>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h2 style="color: red; font-weight: bold;">SERVICE LOG REPORT</h2>
                        <div style="display: inline-flex; gap: 20px; font-size: 18px; justify-content: center;">
                            <p><strong>Brand:</strong> ${data.car_brand || "N/A"}</p>
                            <p><strong>Model:</strong> ${data.car_model || "N/A"}</p>
                            <p><strong>Year:</strong> ${data.car_year || "N/A"}</p>
                            <p><strong>Plate Number:</strong> ${data.plate_number || "N/A"}</p>
                        </div>
                        <div style="text-align: right; margin-top: 10px; font-size: 18px;">
                            <p><strong>Date Generated:</strong> ${data.generated_date}</p>
                        </div>
                    </div>`;
    
                // Loop through job orders
                data.job_orders.forEach((job) => {
                    // Create a list of technicians, excluding the mechanic
                    const technicianNames = job.parts
                        .map(part => part.completed_by)
                        .filter(completed_by => completed_by && completed_by !== job.order_info.mechanic)
                        .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
                        .join(", ") || "N/A";
    
                    serviceLog += `
                        <div style="margin-bottom: 20px; border-bottom: 1px solid #ccc; padding-bottom: 10px;">
                            <h3 style="margin-bottom: 15px;">Job Order #${job.order_info.id}</h3>
                            <div style="display: flex; gap: 10px; margin-bottom: -5px;">
                                <div style="flex: 1;">
                                    <p><strong>Customer:</strong> ${job.order_info.first_name} ${job.order_info.last_name}</p>
                                </div>
                                <div style="flex: 1;">
                                    <p><strong>Mechanic:</strong> ${job.order_info.mechanic}</p>
                                </div>
                            </div>
                            <div style="display: flex; gap: 10px; margin-bottom: -5px;">
                                <div style="flex: 1;">
                                    <p><strong>Appointment Date:</strong> ${job.order_info.appointment_date}</p>
                                </div>
                                <div style="flex: 1;">
                                    <p><strong>Service:</strong> ${job.order_info.service}</p>
                                </div>
                            </div>
                            <div>
                                <p><strong>Technicians:</strong> ${technicianNames}</p>
                            </div>
                            <table border="1" style="width: 100%; border-collapse: collapse; text-align: center; font-size: 14px; margin-top: 10px;">
                                <thead>
                                    <tr>
                                        <th>Part Name</th>
                                        <th>Installed By</th>
                                        <th>Quantity</th>
                                        <th>Unit Price</th>
                                        <th>Labor Cost</th>
                                        <th>Total Price</th>
                                    </tr>
                                </thead>
                                <tbody>`;
    
                    // Add rows for each part in the job
                    job.parts.forEach((part) => {
                        const unitPrice = parseFloat(part.retail_price) || 0;
                        const laborCost = parseFloat(part.labor_cost) || 0;
                        const totalPrice = parseFloat(part.total_price) || 0;
    
                        serviceLog += `
                                    <tr>
                                        <td>${part.part_name}</td>
                                        <td>${part.completed_by || "N/A"}</td>
                                        <td>${part.part_quantity}</td>
                                        <td>₱${unitPrice.toFixed(2)}</td>
                                        <td>₱${laborCost.toFixed(2)}</td>
                                        <td>₱${totalPrice.toFixed(2)}</td>
                                    </tr>`;
                    });
    
                    serviceLog += `
                                </tbody>
                            </table>
                            <div style="margin-top: 10px; text-align: right; font-size: 16px;">
                                <p><strong>Total Parts Cost:</strong> ₱${job.total_parts_cost.toFixed(2)}</p>
                                <p><strong>Labor Cost:</strong> ₱${job.total_labor_cost.toFixed(2)}</p>
                                <p><strong>Grand Total:</strong> ₱${job.grand_total.toFixed(2)}</p>
                            </div>
                        </div>`;
                });
    
                // Add footer
                serviceLog += `
                    <div style="text-align: left; margin-top: 5px; font-style: italic;">
                        Thank you for choosing AG Technician Services!
                    </div>`;
    
                // Update the report body
                reportBody.innerHTML = serviceLog;
            })
            .catch((error) => {
                console.error("Error fetching service log:", error);
                reportBody.innerHTML = "<p>Error loading the service log. Please try again later.</p>";
            });
    }
    else {
        reportBody.innerHTML = "<p>Please select a valid report type to generate.</p>";
    }
}



function closeCustomerReportPopup() {
    // Hide the popup
    const popup = document.getElementById("customerReportPopup");
    popup.classList.add("hidden");

    // Reset all content inside the popup
    const reportBody = document.querySelector(".customer-generate-report-body");
    const reportTypeSelect = document.getElementById("customerReportTypeSelect");

    if (reportBody) {
        reportBody.innerHTML = ""; // Clear the report body content
    }

    if (reportTypeSelect) {
        reportTypeSelect.value = ""; // Reset the selected report type
    }
}


function printCustomerReport() {
    const reportContent = document.querySelector(".customer-generate-report-body").innerHTML;
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(`<html><body>${reportContent}</body></html>`);
    printWindow.document.close();
    printWindow.print();
}

// Function to show the popup and overlay
function showViewServicePopup() {
    document.getElementById('view-service-popup').classList.remove('hidden');
    document.getElementById('view-service-popup-overlay').classList.remove('hidden');
}

// Function to hide the popup and overlay
function hideViewServicePopup() {
    document.getElementById('view-service-popup').classList.add('hidden');
    document.getElementById('view-service-popup-overlay').classList.add('hidden');
}

// Event listener for closing the popup
document.getElementById('close-view-service-popup').addEventListener('click', hideViewServicePopup);

// Close popup function
document.getElementById('close-view-service-popup').addEventListener('click', () => {
    document.getElementById('view-service-popup').classList.add('hidden');
    document.querySelector(".overlay").classList.add("hidden");
});

// Toggle dropdown visibility on actions button click
document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', (event) => {
        // Check if the clicked element is an actions button
        if (event.target.classList.contains('actions-btn')) {
            console.log("Actions button clicked");

            // Toggle the dropdown visibility for the clicked actions button
            const dropdown = event.target.closest('.actions-container').querySelector('.dropdown');

            if (dropdown) {
                dropdown.classList.toggle('hidden');
                console.log("Dropdown visibility toggled:", dropdown.classList.contains('hidden') ? "Hidden" : "Visible");

                // Close any other open dropdowns related to actions-btn
                document.querySelectorAll('.actions-container .dropdown').forEach(d => {
                    if (d !== dropdown && !d.classList.contains('hidden')) {
                        d.classList.add('hidden');
                    }
                });
            } else {
                console.error("Dropdown not found next to actions button");
            }
        } else if (!event.target.closest('.actions-container .dropdown') && !event.target.classList.contains('actions-btn')) {
            // Close all dropdowns related to actions-btn if clicking outside
            console.log("Click outside dropdown related to actions-btn");
            document.querySelectorAll('.actions-container .dropdown').forEach(d => d.classList.add('hidden'));
        }
    });
});
document.addEventListener("click", async (event) => {
    if (event.target.classList.contains("examine-checklist-btn")) {
        const jobOrderId = event.target.getAttribute("data-repair-id");
        
        try {
            // Step 2: Fetch appointment_id using job_order_id
            const appointmentResponse = await fetch(`get_appointment_id.php?job_order_id=${jobOrderId}`);
            const appointmentData = await appointmentResponse.json();

            if (!appointmentData.success) {
                throw new Error("Failed to retrieve appointment ID.");
            }

            const appointmentId = appointmentData.appointment_id;

            // Step 3: Fetch token using appointment_id
            const tokenResponse = await fetch(`get_token.php?appointment_id=${appointmentId}`);
            const tokenData = await tokenResponse.json();

            if (!tokenData.success) {
                throw new Error("Failed to retrieve token.");
            }

            const token = tokenData.token;

            // Step 4: Fetch file paths using token
            const fileResponse = await fetch(`get_files.php?token=${token}`);
            const fileData = await fileResponse.json();

            if (!fileData.success) {
                throw new Error("Failed to retrieve files.");
            }

            // Debugging: Log each path in checklistFilePaths and carConditionFilePaths
            console.log("Checklist Files:", fileData.checklistFilePaths);
            console.log("Car Condition Files:", fileData.carConditionFilePaths);

            // Use checklistFilePaths and carConditionFilePaths directly
            const checklistFiles = fileData.checklistFilePaths || [];
            const carConditionFiles = fileData.carConditionFilePaths || [];

            // Step 5: Display the files in a popup
            showFilePopup(checklistFiles, carConditionFiles);

        } catch (error) {
            console.error("Error:", error.message);
            alert("Failed to retrieve files.");
        }
    }
});

// Function to display files in the popup
function showFilePopup(checklistFiles, carConditionFiles) {
    const popup = document.getElementById("file-popup");
    const popupContent = document.getElementById("file-popup-content");

    // Clear any previous content
    popupContent.innerHTML = `<h3>Checklist and Car Condition Files</h3>`;

    // Display checklist files
    if (checklistFiles.length > 0) {
        popupContent.innerHTML += `<h4>Checklist:</h4><div class="file-container">`;
        checklistFiles.forEach(filePath => {
            if (filePath.endsWith('.jpg') || filePath.endsWith('.png')) {
                // Display images
                popupContent.innerHTML += `<img src="${filePath}" alt="Checklist Image" class="file-image">`;
            } else if (filePath.endsWith('.pdf') || filePath.endsWith('.doc') || filePath.endsWith('.docx')) {
                // Display link for PDF or Word files
                popupContent.innerHTML += `
                    <div class="file-link">
                        <a href="${filePath}" target="_blank">
                            <i class="file-icon"></i> ${filePath.split('/').pop()}
                        </a>
                    </div>`;
            }
        });
        popupContent.innerHTML += `</div>`;
    }

    // Display car condition files
    if (carConditionFiles.length > 0) {
        popupContent.innerHTML += `<h4>Car Condition/s:</h4><div class="file-container">`;
        carConditionFiles.forEach(filePath => {
            if (filePath.endsWith('.jpg') || filePath.endsWith('.png')) {
                // Display images
                popupContent.innerHTML += `<img src="${filePath}" alt="Car Condition Image" class="file-image">`;
            } else if (filePath.endsWith('.pdf') || filePath.endsWith('.doc') || filePath.endsWith('.docx')) {
                // Display link for PDF or Word files
                popupContent.innerHTML += `
                    <div class="file-link">
                        <a href="${filePath}" target="_blank">
                            <i class="file-icon"></i> ${filePath.split('/').pop()}
                        </a>
                    </div>`;
            }
        });
        popupContent.innerHTML += `</div>`;
    }
    // Add a Print button
    const printButton = document.createElement("button");
    printButton.innerHTML = 'Print';
    printButton.id = "print-file-popup-btn";
    popupContent.appendChild(printButton);

    // Event listener for print button
    printButton.addEventListener("click", () => {
        printFilePopup(checklistFiles, carConditionFiles);
    });

    popup.classList.add("active");
}

function printFilePopup(checklistFiles, carConditionFiles) {
    const printWindow = window.open("", "", "width=900,height=650");
    printWindow.document.write(`
        <html>
            <head>
                <title>Print Checklist and Car Condition Files</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                    }
                    h3 {
                        margin-bottom: 20px;
                        padding: 0;
                        font-size: 26px;
                    }

                    h4 {
                        margin-top: 20px;
                        font-size: 20px;
                        margin-left: 30px;
                        padding: 0;
                    }
                    .file-container {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 10px;
                        justify-content: center;
                    }
                    .file-image {
                        width: 500px;
                        height: 660px;
                        margin-bottom: 10px;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        margin-top: 10px;
                    }
                    .file-link {
                        display: flex;
                        align-items: center;
                        margin: 5px;
                    }
                    .file-link a {
                        text-decoration: none;
                        color: #007bff;
                        font-weight: bold;
                    }
                    .file-icon {
                        width: 16px;
                        height: 16px;
                        margin-right: 5px;
                    }
                    .business-info {
                    align-items:center;
                    font-size: 12px;
                    margin-bottom: 10px;
                    margin-left: 150px;
                    margin-top: 20px;   
                    }
                    .business-separator {
                        display: block;  
                    }
                    .business-details { 
                        display: flex; align-items: center; 
                    }
                    .business-logo { 
                        width: 120px; margin-right: 10px; 
                    } 
                </style>
            </head>
            <body>
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
                </div>
                <hr class="business-separator">
                <h3>Checklist and Car Condition Files</h3>
                
                <h4>Checklist:</h4>
                <div class="file-container">
                    ${checklistFiles.map(filePath => {
                        if (filePath.endsWith('.jpg') || filePath.endsWith('.png')) {
                            return `<img src="${filePath}" alt="Checklist Image" class="file-image">`;
                        } else if (filePath.endsWith('.pdf') || filePath.endsWith('.doc') || filePath.endsWith('.docx')) {
                            return `
                                <div class="file-link">
                                    <a href="${filePath}" target="_blank">${filePath.split('/').pop()}</a>
                                </div>`;
                        }
                    }).join('')}
                </div>

                <h4>Car Condition/s:</h4>
                <div class="file-container">
                    ${carConditionFiles.map(filePath => {
                        if (filePath.endsWith('.jpg') || filePath.endsWith('.png')) {
                            return `<img src="${filePath}" alt="Car Condition Image" class="file-image">`;
                        } else if (filePath.endsWith('.pdf') || filePath.endsWith('.doc') || filePath.endsWith('.docx')) {
                            return `
                                <div class="file-link">
                                    <a href="${filePath}" target="_blank">${filePath.split('/').pop()}</a>
                                </div>`;
                        }
                    }).join('')}
                </div>
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
}




// Event listener to close the popup
document.getElementById("close-file-popup-btn").addEventListener("click", () => {
    document.getElementById("file-popup").classList.remove("active");
});



function fetchJobOrderDetails(job_order_id) {
    // Fetch job order details from the server
    fetch(`fetch_job_order_details.php?job_order_id=${job_order_id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Reference to the job order details container inside the popup
            const jobOrderDetailsContainer = document.querySelector("#job-order-details");

            // Clear any existing content
            jobOrderDetailsContainer.innerHTML = '';

            if (data.order_info) {
                // Display job order main details with adjusted layout for close alignment
                jobOrderDetailsContainer.innerHTML += `
                <h3>Job Order #${data.order_info.id}</h3>
                <div style="display: flex; gap: 10px; margin-bottom: -5px;">
                    <div style="flex: 1;">
                        <p><strong>Customer:</strong> ${data.order_info.first_name} ${data.order_info.last_name}</p>
                    </div>
                    <div style="flex: 1;">
                        <p><strong>Mechanic:</strong> ${data.order_info.mechanic}</p>
                    </div>
                </div>
                <div style="display: flex; gap: 10px; margin-bottom: -5px;">
                    <div style="flex: 1;">
                        <p><strong>Appointment Date:</strong> ${data.order_info.appointment_date}</p>
                    </div>
                    <div style="flex: 1;">
                        <p><strong>Service:</strong> ${data.order_info.service}</p>
                    </div>
                </div>
                <div style="margin-top: 5px;">
                    <p><strong>Vehicle:</strong> ${data.order_info.vehicle}</p>
                </div>
                <hr>
            `;            
            }

            if (data.parts && data.parts.length > 0) {
                // Create a table for part names, quantities, unit prices, and amounts
                const partsTable = document.createElement("table");
                partsTable.style.width = "100%";
                partsTable.innerHTML = `
                    <thead>
                        <tr>
                            <th style="text-align: left;">Part Name</th>
                            <th style="text-align: center;">Quantity</th>
                            <th style="text-align: center;">Unit Price</th>
                            <th style="text-align: center;">Amount</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                `;

                // Populate table with parts data
                data.parts.forEach(part => {
                    const unitPrice = part.retail_price ? parseFloat(part.retail_price) : 0;
                    const totalPartPrice = part.part_quantity * unitPrice;

                    const row = document.createElement("tr");

                    // Create part name cell with conditional font size adjustment
                    const partNameCell = document.createElement("td");
                    partNameCell.style.textAlign = "left";
                    partNameCell.style.maxWidth = "200px"; // Limit max width
                    partNameCell.style.whiteSpace = "nowrap";
                    partNameCell.style.overflow = "hidden";
                    partNameCell.style.textOverflow = "ellipsis";
                    partNameCell.textContent = part.part_name;

                    // Adjust font size if part name is too long
                    if (part.part_name.length > 20) {
                        partNameCell.style.fontSize = "0.9em";
                    }

                    row.appendChild(partNameCell);

                    // Add other cells for quantity, unit price, and total price
                    row.innerHTML += `
                        <td style="text-align: center;">${part.part_quantity}</td>
                        <td style="text-align: center;">${unitPrice.toFixed(2)}</td>
                        <td style="text-align: center;">${totalPartPrice.toFixed(2)}</td>
                    `;
                    partsTable.querySelector("tbody").appendChild(row);
                });

                // Append the parts table to the container
                jobOrderDetailsContainer.appendChild(partsTable);

                // Create totals rows
                const totalsRowContainer = document.createElement("div");
                totalsRowContainer.style.display = "flex";
                totalsRowContainer.style.justifyContent = "flex-end";
                totalsRowContainer.style.marginRight = "30px";
                totalsRowContainer.style.marginTop = "-15px";

                const totalsTable = document.createElement("table");
                totalsTable.style.marginTop = "20px";
                totalsTable.style.width = "40%";
                totalsTable.style.textAlign = "right";
                totalsTable.style.borderCollapse = "collapse";

                totalsTable.innerHTML = `
                    <tr style="border: none;">
                        <td style="text-align: right; padding-right: 15px; border: none;"><strong>Total Amount Due:</strong></td>
                        <td style="text-align: right; border: none;"><strong>${data.total_amount_due.toFixed(2)}</strong></td>
                    </tr>
                    <tr style="border: none;">
                        <td style="text-align: right; padding-right: 15px; border: none;"><strong>Labor Cost:</strong></td>
                        <td style="text-align: right; border: none;"><strong>${data.total_labor_cost.toFixed(2)}</strong></td>
                    </tr>
                    <tr style="border: none;">
                        <td style="text-align: right; padding-right: 15px; border: none;"><strong>Grand Total:</strong></td>
                        <td style="text-align: right; border: none;"><strong>${data.grand_total.toFixed(2)}</strong></td>
                    </tr>
                `;

                totalsRowContainer.appendChild(totalsTable);

                // Append the totals container to the main job order details container
                jobOrderDetailsContainer.appendChild(totalsRowContainer);

                // Add a horizontal line and additional text after the table
                jobOrderDetailsContainer.innerHTML += `
                    <hr>
                    <p><em>Thank you for choosing AG Technician Services!</em></p>
                `;
            } else {
                jobOrderDetailsContainer.innerHTML += "<p>No parts data available for this job order.</p>";
            }

            // Display the modal
            document.getElementById("job-order-popup").classList.remove("hidden");
            document.getElementById("job-order-popup").style.display = "block";
        })
        .catch(error => {
            console.error("Error fetching job order details:", error);
        });
}







document.getElementById("print-job-order-btn").addEventListener("click", function () {
    // Get the popup content
    const popupContent = document.querySelector("#job-order-popup .modal-content").innerHTML;

    // Open a new window for printing
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    printWindow.document.open();
    printWindow.document.write(`
        <html>
        <head>
            <title>Print Job Order</title>
            <style>
                /* Styles for printing */
                body { 
                    font-family: Arial, sans-serif; 
                }
                .business-info {
                    align-items:center;
                    font-size: 12px;
                    margin-bottom: 30px;
                    margin-left: 150px;
                    margin-top: 20px;   
                }
                .business-separator {
                    display: none;                
                }
                .job-order-details { 
                    align-items:center;
                    font-size: 12px;
                    margin-bottom: 20px;
                    margin-left: 30px;
                }
                h2, h3 {
                    margin: 0; 
                }
                table { 
                    width: 100%; border-collapse: collapse; 
                }
                table, th, td { 
                    border: none; padding: 8px; 
                }
                th { 
                    background-color: #f2f2f2; text-align: left; 
                }
                .business-details { 
                    display: flex; align-items: center; 
                }
                .business-logo { 
                    width: 120px; margin-right: 10px; 
                }
                table th:last-child, /* Target the last header cell (Quantity) */
                table td:last-child { /* Target the last cell in each row (Quantity value) */
                    text-align: center;
                }


                .print-btn, .close-btn { 
                    display: none; 
                } /* Hide buttons in print */
            </style>
        </head>
        <body onload="window.print(); window.close();">
            ${popupContent}
        </body>
        </html>
    `);
    
    printWindow.document.close();
});


// Event listener for job-order-check-btn to handle clicks and open the popup
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('job-order-check-btn')) {
        const repairId = event.target.getAttribute('data-repair-id');
        
        if (repairId) {
            console.log("Fetching Job Order for repair ID:", repairId);
            fetchJobOrderDetails(repairId); // Call function with repairId as job_order_id
        }
        
        // Hide the dropdown after clicking
        event.target.closest('.dropdown').classList.add('hidden');
    }
});

// Close the popup when clicking the close button
document.getElementById("close-job-order-popup").addEventListener("click", () => {
    document.getElementById("job-order-popup").style.display = "none";
});

// Close the view-service popup
document.getElementById("close-view-service-popup").addEventListener("click", () => {
    document.getElementById("view-service-popup").classList.add("hidden");
});






const openServiceHistoryPopup = (repairId) => {
    const servicePopup = document.getElementById('service-history-popup');
    const serviceOverlay = document.getElementById('service-history-overlay');
    const serviceDetailsContainer = document.getElementById('service-history-details');

    // Assuming you have a function to fetch service history details by ID
    fetchServiceHistoryById(repairId).then(details => {
        if (details) {
            serviceDetailsContainer.innerHTML = `
                <h3>Service Ticket #${repairId}</h3>
                <p>Details: ${details}</p>
            `;
        } else {
            serviceDetailsContainer.innerHTML = `<p>No details available for this service ticket.</p>`;
        }
    }).catch(error => {
        console.error('Failed to load service details:', error);
        serviceDetailsContainer.innerHTML = `<p>Error loading service details.</p>`;
    });

    // Show the popup and overlay
    servicePopup.classList.remove('hidden');
    serviceOverlay.classList.remove('hidden');

    // Event listener to close the popup
    document.getElementById('close-service-history-popup-btn').addEventListener('click', closeServiceHistoryPopup);
    serviceOverlay.addEventListener('click', closeServiceHistoryPopup);
};

const closeServiceHistoryPopup = () => {
    document.getElementById('service-history-popup').classList.add('hidden');
    document.getElementById('service-history-overlay').classList.add('hidden');
};


// Function to toggle the service history popup


const displayPartsSummaryPopup = async (appointmentId) => {
    console.log("Fetching parts for appointment_id:", appointmentId); // Log the appointment ID being passed

    const summaryPopup = document.getElementById('parts-summary-popup');
    const summaryOverlay = document.getElementById('parts-summary-overlay');
    const summaryDetailsContainer = document.getElementById('parts-summary-details');

    try {
        const response = await fetch(`fetch_job_order_parts.php?appointment_id=${appointmentId}`);
        const result = await response.json();

        console.log("Response from fetch_job_order_parts.php:", result); // Log the entire response to check its structure

        if (result.success && result.data) {
            let htmlContent = "";

            for (const jobOrderId in result.data) {
                const jobOrder = result.data[jobOrderId];
                
                // Display Job Order ID, Mechanic, Appointment Date, and Service on the same line
                htmlContent += `
                    <h4>Job Order ID: ${jobOrderId} 
                        <span style="font-weight: normal; color: #555;">
                            | Mechanic: ${jobOrder.mechanic} 
                            | Date: ${jobOrder.appointment_date} 
                            | Service: ${jobOrder.service}
                        </span>
                    </h4>
                    <ul>`;

                // List each part under the job order
                jobOrder.parts.forEach(part => {
                    htmlContent += `<li>${part.part_name}: ${part.part_quantity}</li>`;
                });
                
                htmlContent += `</ul><hr>`;
            }

            summaryDetailsContainer.innerHTML = htmlContent;
        } else {
            summaryDetailsContainer.innerHTML = `<p>No parts found for this appointment.</p>`;
        }
    } catch (error) {
        console.error("Error fetching job order parts:", error);
        summaryDetailsContainer.innerHTML = `<p>Error loading job order details.</p>`;
    }

    summaryPopup.classList.remove('hidden');
    summaryOverlay.classList.remove('hidden');

    document.getElementById('close-summary-popup-btn').addEventListener('click', closePartsSummaryPopup);
    summaryOverlay.addEventListener('click', closePartsSummaryPopup);
};




const closePartsSummaryPopup = () => {
    document.getElementById('parts-summary-popup').classList.add('hidden');
    document.getElementById('parts-summary-overlay').classList.add('hidden');
};

const switchTabs = () => {
    const ticketingTab = document.querySelector('.tab[data-tab="ticketing"]');
    const serviceHistoryTab = document.querySelector('.tab[data-tab="service-history"]');
    const ticketingContent = document.getElementById('ticketing');
    const serviceHistoryContent = document.getElementById('service-history');
    const createTicketButton = document.getElementById('create-ticket-btn'); // Reference to the button
    const searchInput = document.getElementById('service-history-search'); // Reference to the search input
  
    // Switch to Service History
    serviceHistoryTab.addEventListener('click', () => {
        serviceHistoryTab.classList.add('active');
        ticketingTab.classList.remove('active');
        serviceHistoryContent.classList.add('active');
        ticketingContent.classList.remove('active');
        createTicketButton.style.display = 'none'; // Hide the button in Service History
        searchInput.style.display = 'block'; // Show the search bar in Service History
        renderServiceHistory();  // Load service history data
    });
  
    // Switch to Ticketing with Page Refresh
    ticketingTab.addEventListener('click', () => {
        ticketingTab.classList.add('active');
        serviceHistoryTab.classList.remove('active');
        ticketingContent.classList.add('active');
        serviceHistoryContent.classList.remove('active');
        createTicketButton.style.display = 'block'; // Show the button in Ticketing
        searchInput.style.display = 'none'; // Hide the search bar in Ticketing
        location.reload();  // Refresh the entire page
    });
  };
// ------------------------------------------------------ SMS HISTORY ------------------------------------------------------------------------- // 
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
            <div id="sms-appointment-details">Loading details...</div>
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
        console.log('Response data:', data); // Log the response to ensure data is received

        const appointmentDetailsDiv = document.getElementById('sms-appointment-details');
        const smsLogsDiv = document.getElementById('sms-logs');

        if (data.appointmentDetails) {
            console.log('Appointment details found:', data.appointmentDetails); // Log the appointment details

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
            console.log('No appointment details found'); // Log if details are missing
            appointmentDetailsDiv.innerHTML = '<p>No appointment details found.</p>';
        }

        if (data.smsLogs.length > 0) {
            smsLogsDiv.innerHTML = `
                <div class="sms-history-box">
                    ${data.smsLogs.map(log => {
                        const sentDate = log.sent_at ? log.sent_at.split(' ')[0] : 'N/A';
                        const sentTime = log.sent_at ? log.sent_at.split(' ')[1] : 'N/A';
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
// ------------------------------------------------------- CREATE TICKET ---------------------------------------------------------------------- // 
document.getElementById('create-ticket-btn').addEventListener('click', () => {
    document.getElementById('create-ticket-popup').classList.add('active');
    document.getElementById('create-ticket-overlay').classList.add('active'); // Activate overlay
});

document.getElementById('close-create-ticket-popup-btn').addEventListener('click', () => {
    document.getElementById('create-ticket-popup').classList.remove('active');
    document.getElementById('create-ticket-overlay').classList.remove('active'); // Deactivate overlay
});

// Ensure clicking on the overlay also closes the popup
document.getElementById('create-ticket-overlay').addEventListener('click', () => {
    document.getElementById('create-ticket-popup').classList.remove('active');
    document.getElementById('create-ticket-overlay').classList.remove('active');
});



// Handle form submission
document.getElementById('createTicketForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        appointmentDate: document.getElementById('appointmentDate').value,
        appointmentTime: document.getElementById('appointmentTime').value,
        carBrand: document.getElementById('carBrand').value,
        carModel: document.getElementById('carModel').value,
        carYear: document.getElementById('carYear').value,
        plateNumber: document.getElementById('plateNumber').value,
        contactNumber: document.getElementById('contactNumber').value,
        services: document.getElementById('services').value,
        mechanic: document.getElementById('mechanic').value
    };

    try {
        const response = await fetch('create_ticket.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (result.success) {
            alert("Ticket created successfully!");
            // Optionally close the popup or refresh the ticketing list
            document.getElementById('create-ticket-popup').classList.remove('active');
            document.getElementById('create-ticket-overlay').classList.remove('active');

            window.location.reload();
        } else {
            alert("Failed to create ticket. Please try again.");
        }
    } catch (error) {
        console.error('Error:', error);
        alert("An error occurred. Please try again.");
    }
});


// Load tickets and set up tab switching when the page loads
window.onload = () => {
  renderTickets();  // Load ticketing data initially
  switchTabs();  // Enable tab switching
};
