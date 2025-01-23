document.addEventListener('DOMContentLoaded', function () {
    const hamMenu = document.querySelector('.ham-menu');
    const offScreenMenu = document.querySelector('.off-screen-menu');
    const carBrandInput = document.getElementById('car-brand');
    const brandSuggestions = document.getElementById('brand-suggestions');
    const carLogo = document.getElementById('car-logo');
    const carModelInput = document.getElementById('car-model');
    const carYearInput = document.getElementById('car-year');
    const nextButtons = document.querySelectorAll('.next-button');
    const backButtonImg = document.querySelector('.back-button-img');
    const inputs = document.querySelectorAll('input[required]');
    const steps = document.querySelectorAll('.step');
    const lines = document.querySelectorAll('.line');
    const stepContents = document.querySelectorAll('.step-content');
    const checkboxes = document.querySelectorAll('.service input[type="checkbox"]');
    const mechanicsContainer = document.getElementById("available-mechanics");
    const calendarMonth = document.getElementById('calendar-month');
    const calendarDates = document.getElementById('calendar-dates');
    const timeSlotsContainer = document.getElementById('time-slots');
    const clearBtn = document.getElementById('clear-btn');
    let currentStep = 0;
    let bookedSlots = [];
    let currentDate = new Date();
    const today = new Date();

    const carBrands = {
        "Ford": "ford.png",
        "Toyota": "toyota.png",
        "Honda": "honda.png",
        "Chevrolet": "chevorlet.png",
        "Mitsubishi": "mitsubishi.png",
        "Nissan": "nissan.png",
        "Hyundai": "hyundai.png",
    }; 

    const carModels = {
        "Ford": ["Raptor", "Fiesta", "Explorer","Ranger", "Ecosport", "Everest","Focus", "Escape", "Expedition"],
        "Toyota": ["Vios", "Corolla", "RAV4","Camry", "HiAce", "Fortuner","Innova", "Land Cruiser", "Hilux"],
        "Honda": ["Civic", "Accord", "CR-V","Brio", "City"],
        "Chevrolet": ["Sail", "Trailblazer", "Captiva"],
        "Mitsubishi": ["Lancer", "Xpander", "Pajero","Mirage", "Xforce", "Montero"],
        "Nissan": ["Navara", "Terra", "Almera","Xtrail"],
        "Hyundai": ["Tucson", "Santa Fe"],
    };

    // Hamburger menu toggle
    hamMenu.addEventListener("click", () => {
        hamMenu.classList.toggle("active");
        offScreenMenu.classList.toggle("active");
    });

    // Populate the car year model dropdown
    function populateCarYears() {
        carYearInput.innerHTML = ''; // Clear the current car year dropdown
    
        const placeholderYearOption = document.createElement('option');
        placeholderYearOption.value = "";
        placeholderYearOption.textContent = "Select Car Year Model";
        placeholderYearOption.disabled = true;
        placeholderYearOption.selected = true;
        carYearInput.appendChild(placeholderYearOption);
    
        const currentYear = new Date().getFullYear();
        const startYear = 1950;
    
        for (let year = currentYear; year >= startYear; year--) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            carYearInput.appendChild(option);
        }
    
        carYearInput.disabled = false; // Ensure the car year dropdown is enabled after it's populated
    }
    
    // Function to reset the car year dropdown (called when no car brand is selected)
    function resetCarYearDropdown() {
        carYearInput.innerHTML = ''; // Clear the current car year dropdown
    
        const placeholderYearOption = document.createElement('option');
        placeholderYearOption.value = "";
        placeholderYearOption.textContent = "Select Car Year Model";
        placeholderYearOption.disabled = true;
        placeholderYearOption.selected = true;
        carYearInput.appendChild(placeholderYearOption);
    
        carYearInput.disabled = true; // Disable the car year dropdown until a brand is selected
    }
    
    // Initialize the car year dropdown as disabled
    resetCarYearDropdown();
 
    function validateCarBrand() {
        const enteredBrand = carBrandInput.value.trim().toLowerCase();
        return Object.keys(carBrands).some(
            brand => brand.toLowerCase() === enteredBrand
        );
    }

    // Function to update car models based on selected brand
    function updateCarModels(brand) {
        carModelInput.innerHTML = ''; // Clear the current car model dropdown

        const placeholderModelOption = document.createElement('option');
        placeholderModelOption.value = "";
        placeholderModelOption.textContent = "Select a car model";
        placeholderModelOption.disabled = true;
        placeholderModelOption.selected = true;
        carModelInput.appendChild(placeholderModelOption);

        // Populate models if the brand has models
        if (carModels[brand]) {
            carModels[brand].forEach(model => {
                const option = document.createElement('option');
                option.value = model;
                option.textContent = model;
                carModelInput.appendChild(option);
            });
            carModelInput.disabled = false; // Enable the car model dropdown after populating models
        }
    }

    // Function to reset the car models dropdown to default state
    function resetCarModels() {
        carModelInput.innerHTML = ''; // Clear the current car model dropdown

        const placeholderModelOption = document.createElement('option');
        placeholderModelOption.value = "";
        placeholderModelOption.textContent = "Select a car model";
        placeholderModelOption.disabled = true;
        placeholderModelOption.selected = true;
        carModelInput.appendChild(placeholderModelOption);

        carModelInput.disabled = true; // Disable the car model dropdown until a brand is selected
    }

    // Initialize the car model dropdown as disabled on page load
    resetCarModels();
    
    // Show full dropdown when the input field is clicked
    carBrandInput.addEventListener('click', function () {
        const input = this.value.toLowerCase(); // Get the input value and convert to lowercase
        brandSuggestions.innerHTML = ''; // Clear previous suggestions
        let suggestions = '';

        // Show all car brands when clicked (no filtering yet)
        for (let brand in carBrands) {
            suggestions += `<div class="suggestion" data-brand="${brand}" data-logo="${carBrands[brand]}">${brand}</div>`;
        }

        // Display the dropdown
        if (suggestions) {
            brandSuggestions.innerHTML = suggestions;
            brandSuggestions.style.display = 'block'; // Show the dropdown
        }
    });

    // Filter brands and handle input as the user types
    carBrandInput.addEventListener('input', function () {
        const input = this.value.toLowerCase(); // Get the input value and convert to lowercase
        brandSuggestions.innerHTML = ''; // Clear previous suggestions
        let suggestions = '';
        let exactMatch = false; // Variable to track if there's an exact match
    
        // Filter brands that match the input
        for (let brand in carBrands) {
            if (brand.toLowerCase().startsWith(input)) {
                // Only show brands that match the typed input
                suggestions += `<div class="suggestion" data-brand="${brand}" data-logo="${carBrands[brand]}">${brand}</div>`;
            }
    
            // Check for an exact match
            if (brand.toLowerCase() === input) {
                exactMatch = true;
                carLogo.src = carBrands[brand]; // Update the car logo if exact match
                updateCarModels(brand); // Update car models if exact match
            }
        }
    
        // Display filtered suggestions or hide the dropdown if no matches
        if (suggestions) {
            brandSuggestions.innerHTML = suggestions;
            brandSuggestions.style.display = 'block'; // Show the dropdown
        } else {
            brandSuggestions.style.display = 'none'; // Hide the dropdown if no suggestions match
        }
    
        // If there's an exact match, show the clear button, otherwise show newlogo.png and reset car models
        if (exactMatch) {
            clearBtn.style.display = 'block'; // Show the clear button after an exact match
            populateCarYears(); // Populate car years only when a valid car brand is selected
        } else {
            clearBtn.style.display = 'none'; // Hide the clear button if no exact match
            carLogo.src = 'newlogo.png'; // Show newlogo.png if no exact match
            resetCarYearDropdown(); // Reset car year dropdown if no exact match
            resetCarModels(); // Reset the car models if no exact match
        }
    });
    

    // Handle the Enter key to select the exact match and prevent form submission
    carBrandInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { // Check if the Enter key is pressed
            e.preventDefault(); // Prevent the form submission or default action
            
            const input = this.value.toLowerCase();
            let exactMatch = false;

            // Check if the input matches any brand exactly
            for (let brand in carBrands) {
                if (brand.toLowerCase() === input) {
                    exactMatch = true;
                    carBrandInput.value = brand; // Set the exact match brand as the value
                    carLogo.src = carBrands[brand]; // Update the car logo to the matched brand
                    updateCarModels(brand); // Update car models based on the exact match
                    brandSuggestions.style.display = 'none'; // Hide the dropdown
                    clearBtn.style.display = 'block'; // Show the clear button
                    break;
                }
            }

            // If no exact match, do nothing and prevent form submission
            if (!exactMatch) {
                e.preventDefault();
            }
        }
    });

    // Clear the input field when the "X" button is clicked and set the logo to newlogo.png
    clearBtn.addEventListener('click', function () {
        carBrandInput.value = ''; // Clear the input field
        carLogo.src = 'newlogo.png'; // Set the logo to newlogo.png
        brandSuggestions.innerHTML = ''; // Clear the dropdown
        brandSuggestions.style.display = 'none'; // Hide the dropdown
        clearBtn.style.display = 'none'; // Hide the clear button after clearing the input
        resetCarYearDropdown(); // Reset the car year dropdown
        resetCarModels(); // Reset the car models dropdown
    });

    // Event listener for selecting a brand from the suggestions
    brandSuggestions.addEventListener('click', function (e) {
    if (e.target.classList.contains('suggestion')) {
        carBrandInput.value = e.target.dataset.brand; // Set the selected brand in the input field
        carLogo.src = e.target.dataset.logo; // Set the car logo (if needed)
        brandSuggestions.innerHTML = ''; // Clear the dropdown
        brandSuggestions.style.display = 'none'; // Hide the dropdown after selection
        updateCarModels(e.target.dataset.brand); // Update car models for the selected brand
        clearBtn.style.display = 'block'; // Show the clear button after selection
        populateCarYears(); // Populate car years after brand selection
        }
    });

    // Hide dropdown when clicking outside of the suggestions or the input field
    document.addEventListener('click', function (e) {
        if (!brandSuggestions.contains(e.target) && e.target !== carBrandInput) {
            brandSuggestions.style.display = 'none'; // Hide the dropdown if clicking outside
        }
    });

    function validateCarModel() {
        const selectedModel = carModelInput.value;
        return selectedModel !== "";
    }

    function validateContactNumber() {
        const contactNumberInput = document.getElementById('contact-number').value.trim();
        const contactNumberPattern = /^63\d{10}$/; // This pattern ensures the number starts with 63 and has exactly 12 digits.
    
        if (!contactNumberPattern.test(contactNumberInput)) {
            alert('Contact number must be exactly 12 digits and start with "63".');
            return false;
        }
        return true;
    }    

    function validateCheckboxes() {
        return Array.from(checkboxes).some(checkbox => checkbox.checked);
    }

    function validateForm() {
        let formValid = true;
    
        // Existing form validation logic
        inputs.forEach(input => {
            const errorMessage = input.parentElement.querySelector('.error-message');
            if (!input.value.trim()) {
                errorMessage.style.display = 'block';
                formValid = false;
            } else {
                errorMessage.style.display = 'none';
            }
        });
    
        if (currentStep === 1 && !validateCheckboxes()) {
            formValid = false;
            alert('Please select at least one service.');
        }
    
        if (!validateCarBrand()) {
            formValid = false;
            alert('Please select a valid car brand from the list.');
        }
    
        if (!validateCarModel()) {
            formValid = false;
            alert('Please select a valid car model.');
        }

        if (!validateContactNumber()) {
            formValid = false;
        }
    
        if (carYearInput.value === "") {
            formValid = false;
            alert('Please select a valid car year.');
        }
    
        if (currentStep === 2) {
            const selectedDate = document.querySelector('.calendar-date.selected');
            const selectedTime = document.querySelector('.time-slot.selected');
            if (!selectedDate || !selectedTime) {
                formValid = false;
                alert('Please select both a date and a time slot.');
            }
    
            // Mechanic validation only if a mechanic is selected
            const selectedMechanic = document.querySelector('.mechanic.selected');
            if (selectedMechanic) {
                console.log(`Mechanic selected: ${selectedMechanic.textContent}`);
            }
        }
    
        return formValid;
    }

    nextButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            if (!validateForm()) {
                event.preventDefault();
                alert('Please fill out all required fields.');
                return;
            }

            if (currentStep < steps.length - 1) {
                updateStep(1);

                if (currentStep === 3) {
                    populateConfirmation();
                }
            } else {
                alert('Your appointment has been successfully booked!');
                window.location.href = 'homepage.html';
            } 
        });
    });

    document.querySelectorAll('.back-button-img').forEach(button => {
        button.addEventListener('click', function () {
            if (currentStep > 0) {
                updateStep(-1);
            }
        });
    });

    function updateStep(direction) {
        steps[currentStep].classList.remove('active');
        steps[currentStep].classList.add('visited');
        stepContents[currentStep].classList.remove('active');
        if (currentStep > 0) {
            lines[currentStep - 1].classList.remove('active');
            lines[currentStep - 1].classList.add('visited');
        }

        currentStep += direction;

        steps[currentStep].classList.add('active');
        stepContents[currentStep].classList.add('active');
        if (currentStep > 0) {
            lines[currentStep - 1].classList.add('active');
        }

        backButtonImg.style.display = currentStep > 0 ? 'inline-block' : 'none';
        nextButtons.forEach(btn => btn.textContent = currentStep === steps.length - 1 ? 'Finish' : 'Next');
    }

    function populateConfirmation() {
        document.getElementById('confirm-first-name').textContent = document.getElementById('first-name').value;
        document.getElementById('confirm-last-name').textContent = document.getElementById('last-name').value;
        document.getElementById('confirm-contact-number').textContent = document.getElementById('contact-number').value;
        document.getElementById('confirm-plate-number').textContent = document.getElementById('plate-number').value;
        document.getElementById('confirm-car-brand').textContent = document.getElementById('car-brand').value;
        document.getElementById('confirm-car-model').textContent = document.getElementById('car-model').value;
        document.getElementById('confirm-car-year').textContent = document.getElementById('car-year').value;
    
        const selectedServices = Array.from(document.querySelectorAll('.service input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.parentElement.querySelector('span').textContent)
            .join(', ');
        document.getElementById('confirm-services').textContent = selectedServices;
    
        const selectedDate = document.querySelector('.calendar-date.selected').dataset.date;
        const selectedTime = document.querySelector('.time-slot.selected').textContent;
        document.getElementById('confirm-appointment-date').textContent = selectedDate;
        document.getElementById('confirm-appointment-time').textContent = selectedTime;
    
        // Optional Mechanic
        const selectedMechanic = document.querySelector('.mechanic.selected');
        if (selectedMechanic) {
            document.getElementById('confirm-mechanic').textContent = selectedMechanic.textContent;
        } else {
            document.getElementById('confirm-mechanic').textContent = 'No Preferred Mechanic';
        }
    }

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDayIndex = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month + 1, 0).getDate();
        
        calendarMonth.textContent = date.toLocaleString('default', { month: 'long', year: 'numeric' });
        calendarDates.innerHTML = '';
        
        const today = new Date(); // Current date for comparison
        const currentDate = new Date();  // Get the current time
        
        // Add empty divs for alignment based on the first day of the month
        for (let i = 0; i < firstDayIndex; i++) {
            const emptyDiv = document.createElement('div');
            calendarDates.appendChild(emptyDiv);
        }
        
        // Fetch bookings for all dates in the current month before rendering
        fetch(`fetch_booking.php?month=${year}-${(month + 1).toString().padStart(2, '0')}`)
            .then(response => response.json())
            .then(data => {
                const fullyBookedDates = data.fullyBookedDates || [];
                
                // Render the days in the month
                for (let i = 1; i <= lastDay; i++) {
                    const dateDiv = document.createElement('div');
                    const currentDay = new Date(year, month, i);
                    const formattedDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
                    
                    dateDiv.textContent = i;
                    dateDiv.dataset.date = formattedDate;
                    dateDiv.classList.add('calendar-date');

                    if (currentDay.getDay() === 0) {  // 0 represents Sunday
                        dateDiv.classList.add('disabled');
                        dateDiv.style.pointerEvents = 'none';
                        dateDiv.style.color = '#ccc';
                    }
                    
                    // Disable past dates (before today)
                    if (currentDay < today.setHours(0, 0, 0, 0)) {
                        dateDiv.classList.add('disabled');
                        dateDiv.style.pointerEvents = 'none';
                        dateDiv.style.color = '#ccc';
                    } else {
                        // Fetch booking information for each future date
                        fetch(`fetch_booking.php?date=${formattedDate}`)
                            .then(response => response.json())
                            .then(slotData => {
                                const slotCounts = slotData.slotCounts || {};  // Default to an empty object if no data is returned
                                let allSlotsDisabled = true;
    
                                // Check if all time slots for the date are fully booked or unavailable
                                const timeSlots = [10, 11, 13, 14, 15];  // Updated time slots: 10:00, 11:00, 1:00, 2:00, 3:00

                            timeSlots.forEach(hour => {
                                const timeSlot = `${hour.toString().padStart(2, '0')}:00:00`;
                                const slotTime = new Date(`${formattedDate}T${timeSlot}`);
                                const timeDifference = (slotTime - currentDate) / (1000 * 60);  // Difference in minutes

                                const bookingCount = slotCounts[timeSlot] || 0;  // Default to 0 if no bookings

                                // If any slot is available (not fully booked or less than 45 minutes away), the date is not fully disabled
                                if (bookingCount < 3 && timeDifference >= 45) {
                                    allSlotsDisabled = false;
                                }
                            });
    
                                // If all slots are disabled, disable the date
                                if (allSlotsDisabled) {
                                    dateDiv.classList.add('disabled');
                                    dateDiv.style.pointerEvents = 'none';  // Disable interaction
                                    dateDiv.style.color = '#ccc';  // Change color to indicate it's disabled
                                    console.log(`All time slots for date ${formattedDate} are disabled. Disabling the date.`);
                                } else {
                                    // If date is not fully disabled, add click event for future dates
                                    dateDiv.addEventListener('click', handleDateClick);
                                }
                            })
                            .catch(error => console.error('Error fetching slot data:', error));
                        }
                    
                    calendarDates.appendChild(dateDiv);
                }
            })
            .catch(error => console.error('Error fetching fully booked dates:', error));
    }
    
    
    function handleDateClick(event) {
        const selectedDate = event.target.dataset.date;
        document.getElementById('appointment-date').value = selectedDate;  // Store selected date
        const allDates = document.querySelectorAll('.calendar-date');
        allDates.forEach(date => date.classList.remove('selected'));
        event.target.classList.add('selected');

        // Clear mechanic selection when date changes
        document.getElementById('mechanic').value = '';  // Clear the mechanic field

        // Clear mechanic UI
        mechanicsContainer.innerHTML = '';
        
        generateTimeSlots(selectedDate);
        showAvailableMechanicsForDate(selectedDate);  // Show available mechanics based on the date
    }
    

    function generateTimeSlots(date) {
        console.log("Generating time slots for date:", date);  // Log the selected date
        timeSlotsContainer.innerHTML = '';
        const timeSlots = [10, 11, 13, 14, 15];  // Updated time slots: 10:00, 11:00, 1:00, 2:00, 3:00
        let fullyBookedSlots = 0;  // Track the number of fully booked slots
        const totalSlots = timeSlots.length;  // Total number of time slots
        
        const currentDate = new Date();  // Get the current date and time
        let allSlotsDisabled = true;  // Variable to track if all slots are disabled
    
        // Fetch the booking counts for the selected date via AJAX
        fetch(`fetch_booking.php?date=${date}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Data received from fetch:", data);
                const slotCounts = data.slotCounts || {};  // Default to an empty object if no data is returned
                const allFullyBooked = data.allFullyBooked;  // Check if all slots are fully booked for the date
    
                // If all slots are fully booked, mark the date as fully booked
                if (allFullyBooked) {
                    const calendarDateElement = document.querySelector(`[data-date="${date}"]`);
                    if (calendarDateElement) {
                        calendarDateElement.style.backgroundColor = 'red';
                        calendarDateElement.style.pointerEvents = 'none';  // Disable interaction
                        console.log(`Date ${date} is fully booked.`);
                    }
                    return; // No need to generate time slots if the date is fully booked
                }
    
                timeSlots.forEach(hour => {
                    const timeSlot = `${hour.toString().padStart(2, '0')}:00:00`;
                    const slotDiv = document.createElement('div');
                    slotDiv.classList.add('time-slot');
                    slotDiv.textContent = `${hour.toString().padStart(2, '0')}:00`;
                    slotDiv.dataset.timeslot = timeSlot;
    
                    // Fetch the booking count for this specific time slot
                    const bookingCount = slotCounts[timeSlot] || 0;  // Default to 0 if no bookings
    
                    // Calculate the time difference between the current time and the timeslot
                    const slotTime = new Date(`${date}T${timeSlot}`);
                    const timeDifference = (slotTime - currentDate) / (1000 * 60);  // Difference in minutes
    
                    // Disable the time slot if it's fully booked or less than 45 minutes away
                    if (bookingCount >= 3 || timeDifference < 45) {
                        console.log(`Disabling time slot ${timeSlot} (bookings: ${bookingCount}, timeDifference: ${timeDifference})`);
                        slotDiv.classList.add('fully-booked');
                        slotDiv.style.cursor = 'not-allowed';
                        slotDiv.style.pointerEvents = 'none';  // Disable interaction on fully booked or near timeslots
                        slotDiv.textContent += bookingCount >= 3 ? " (Fully Booked)" : " (Unavailable)";
                    } else {
                        slotDiv.addEventListener('click', handleTimeSlotClick);
                        allSlotsDisabled = false;  // At least one slot is available, so the date shouldn't be fully disabled
                        console.log(`Time slot ${timeSlot} is available (bookings: ${bookingCount})`);
                    }
    
                    timeSlotsContainer.appendChild(slotDiv);
                });
    
                // If all slots are disabled, disable the date
                if (allSlotsDisabled) {
                    const calendarDateElement = document.querySelector(`[data-date="${date}"]`);
                    if (calendarDateElement) {
                        calendarDateElement.classList.add('disabled');
                        calendarDateElement.style.pointerEvents = 'none';  // Disable interaction
                        calendarDateElement.style.color = '#ccc';  // Change color to indicate it's disabled
                        console.log(`All time slots for date ${date} are disabled. Disabling the date.`);
                    }
                }
            })
            .catch(error => console.error('Error fetching booking counts:', error));
    }

    function handleTimeSlotClick(event) {
        const selectedTime = event.target.textContent.trim();
        document.getElementById('appointment-time').value = selectedTime;  // Store selected time
        const allSlots = document.querySelectorAll('.time-slot');
        allSlots.forEach(slot => slot.classList.remove('selected'));
        event.target.classList.add('selected');
    
        const selectedDate = document.querySelector('.calendar-date.selected').dataset.date;
    
        // Clear mechanic field when selecting a new time slot
        document.getElementById('mechanic').value = '';  // Clear the mechanic field

        // Fetch and show available mechanics for the selected date and time
        showAvailableMechanics(selectedDate, selectedTime);
    }

    function showAvailableMechanicsForDate(date) {
        mechanicsContainer.innerHTML = '';  // Clear previous mechanics

        // Fetch available mechanics from the backend based on the selected date
        fetch(`fetch_mechanics_by_day.php?date=${date}`)
            .then(response => response.json())
            .then(data => {
                const mechanics = data.mechanics || [];

                if (mechanics.length > 0) {
                    mechanics.forEach(mechanic => {
                        const mechanicDiv = document.createElement('div');
                        mechanicDiv.className = 'mechanic';
                        mechanicDiv.textContent = mechanic.name;

                        mechanicDiv.dataset.mechanicName = mechanic.name;  // Store mechanic name for later filtering
                        mechanicsContainer.appendChild(mechanicDiv);
                    });
                    mechanicsContainer.classList.add('active');
                } else {
                    mechanicsContainer.innerHTML = '<p style="font-size: 2em; color: #666;">No mechanics available for this date.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching mechanics:', error);
                mechanicsContainer.innerHTML = '<p style="font-size: 2em; color: #666;">Unable to fetch mechanics.</p>';
            });
    }
    
    function showAvailableMechanics(date, time) {
        console.log(`Fetching available mechanics for date: ${date} and time: ${time}`);
    
        mechanicsContainer.innerHTML = '';  // Clear previous mechanics
    
        // Fetch available mechanics from the backend based on the selected date and time
        fetch(`fetch_mechanics.php?date=${date}&time=${time}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Received data from backend:", data);  // Log the data received
                const mechanics = data.mechanics || [];
                const bookedMechanics = data.bookedMechanics || [];
    
                if (mechanics.length > 0) {
                    let autoAssignedMechanic = null;
    
                    mechanics.forEach(mechanic => {
                        const mechanicDiv = document.createElement('div');
                        mechanicDiv.className = 'mechanic';
                        mechanicDiv.textContent = mechanic;
    
                        if (bookedMechanics.includes(mechanic)) {
                            // Mechanic is booked, disable them
                            mechanicDiv.classList.add('disabled');
                            mechanicDiv.style.pointerEvents = 'none';
                            mechanicDiv.style.opacity = '0.5';
                        } else {
                            mechanicDiv.onclick = function () {
                                selectMechanic(mechanicDiv);
                            };
    
                            // Auto-assign the first available mechanic if no mechanic is already selected
                            if (!autoAssignedMechanic) {
                                autoAssignedMechanic = mechanic;
                            }
                        }
    
                        mechanicsContainer.appendChild(mechanicDiv);
                    });
    
                    mechanicsContainer.classList.add('active');
    
                    // Auto-select the first available mechanic if none was chosen by the user
                    if (!document.querySelector('.mechanic.selected') && autoAssignedMechanic) {
                        document.getElementById('mechanic').value = autoAssignedMechanic;
                        console.log(`Auto-assigned mechanic: ${autoAssignedMechanic}`);
                    }
                } else {
                    mechanicsContainer.innerHTML = '<p style="font-size: 2em; color: #666;">No mechanics available for this date and time slot.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching mechanics:', error);
                mechanicsContainer.innerHTML = '<p style="font-size: 2em; color: #666;">Unable to fetch mechanics.</p>';
            });
    }
    
    // Function to select and visually highlight a mechanic
    function selectMechanic(element) {
        const mechanics = document.querySelectorAll('.mechanic');
        mechanics.forEach(mechanic => mechanic.classList.remove('selected'));
        element.classList.add('selected');
        document.getElementById('mechanic').value = element.textContent;  // Store selected mechanic
    }

    document.querySelector('.chevron-left').addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    document.querySelector('.chevron-right').addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    renderCalendar(currentDate); 
});
 