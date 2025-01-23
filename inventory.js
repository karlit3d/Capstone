document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('productList');
    const searchBar = document.getElementById('searchBar');
    const statusButtons = document.querySelectorAll('.status-button');
    const categoryFilter = document.getElementById('categoryFilter');
    const brandFilter = document.getElementById('brandFilter');
    const typeFilters = document.querySelectorAll('.typeFilter');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const sortBy = document.getElementById('sortBy');
    const addProductButton = document.getElementById('addProductButton');
    const applyFiltersButton = document.getElementById('applyFilters');
    const resetFiltersButton = document.getElementById('resetFilters');

    const allCountSpan = document.getElementById('allCount');
    const activeCountSpan = document.getElementById('activeCount');
    const inactiveCountSpan = document.getElementById('inactiveCount');

    let products = [];
    let selectedFilters = {
        searchTerm: '',
        status: 'all',
        category: 'all',
        brand: 'all', 
        types: [], // Keep track of selected types
        minPrice: 0,
        maxPrice: Infinity,
        sortBy: 'nameAsc'
    };

    const fetchProducts = () => {
        const category = selectedFilters.category !== 'all' ? selectedFilters.category : null;
        const brand = selectedFilters.brand !== 'all' ? selectedFilters.brand : null;
        const type = selectedFilters.types.length > 0 ? selectedFilters.types.join(',') : 'all';

        const url = new URL('fetch_products.php', window.location.origin);
        if (category) url.searchParams.append('category', category);
        if (brand) url.searchParams.append('brand', brand); 
        if (type !== 'all') url.searchParams.append('type', type);

        fetch(url)
            .then(response => response.json())
            .then(data => {
                products = data.products; // Get products
                updateCategoryFilter(data.categories); // Update categories in the filter
                updateBrandFilter(data.brands); // Update brands dynamically
                updateProductCounts();
                applyFilters();
            })
            .catch(error => console.error('Error fetching products:', error));
    };

    const updateCategoryFilter = (categories) => {
        const categoryFilter = document.getElementById('categoryFilter');
        categoryFilter.innerHTML = '<option value="all">All Categories</option>'; // Reset filter
    
        // Sort categories alphabetically
        categories.sort();
    
        // Add each category as an option
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    };
    
    const updateBrandFilter = (brands) => {
        const brandFilter = document.getElementById('brandFilter');
        brandFilter.innerHTML = '<option value="all">All Brands</option>'; // Reset filter
    
        // Sort brands alphabetically
        brands.sort();
    
        // Add each brand as an option
        brands.forEach(brand => {
            const option = document.createElement('option');
            option.value = brand;
            option.textContent = brand;
            brandFilter.appendChild(option);
        });
    };

    fetchProducts();

    const updateProductStatus = (productId, newStatus) => {
        const formData = new FormData();
        formData.append('id', productId);
        formData.append('status', newStatus);
    
        fetch('update_product_status.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                console.log('Product status updated successfully.');
            } else {
                console.error('Failed to update status:', result.message);
            }
        })
        .catch(error => {
            console.error('Error updating status:', error);
        });
    };

let itemsPerPage = 10; // Number of items per page
let currentPage = 1; // Current page

const renderProducts = (items) => {
    productList.innerHTML = '';
    if (items.length === 0) {
        productList.innerHTML = '<p>No products found.</p>';
        return;
    }

    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = items.slice(startIndex, endIndex);

    // Display only the items for the current page
    itemsToDisplay.forEach(product => {
        if (product.stock === 0 && product.status === 'active') {
            product.status = 'inactive';
            updateProductStatus(product.id, 'inactive'); // Automatically update status to inactive
        }

        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.setAttribute('data-id', product.id);
        productItem.innerHTML = `
            <div class="product-info">
                <div class="product-details">
                    <h4>${product.name}</h4>
                    <p class="inline-details">Brand: ${product.brand} | Category: ${product.category} | Stock: ${product.stock}</p>
                    <p class="inline-details">Item by: ${product.item_by}</p>
                </div>
            </div>
            <div class="product-type">
                <h4> Type: ${product.type}</h4>
            </div>
            <div class="product-prices">
                <p class="Tprice">RETAIL PRICE <span class="price">₱${product.retail_price}</span></p>
                <p class="Tprice">CAPITAL PRICE <span class="price">₱${product.capital_price}</span></p>
                <p class="Tprice">LABOR COST <span class="price">₱${product.labor_cost}</span></p>
            </div>
            <button class="details-button" data-id="${product.id}">...</button>
        `;
        productList.appendChild(productItem);
    });

    renderPaginationControls(items.length);
};

const maxVisiblePages = 5; // Maximum number of page numbers to display at once

const renderPaginationControls = (totalItems) => {
    const paginationControls = document.getElementById('paginationControls');
    paginationControls.innerHTML = '';

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentRangeStart = Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
    const currentRangeEnd = Math.min(currentRangeStart + maxVisiblePages - 1, totalPages);

    // Previous button
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.classList.add('page-button');
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            applyFilters();
            scrollToTop();
        }
    });
    paginationControls.appendChild(prevButton);

    // Page number buttons within the current range
    for (let i = currentRangeStart; i <= currentRangeEnd; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.classList.add('page-button');
        if (i === currentPage) pageButton.classList.add('active');

        pageButton.addEventListener('click', () => {
            currentPage = i;
            applyFilters();
            scrollToTop();
        });

        paginationControls.appendChild(pageButton);
    }

    // Next button
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.classList.add('page-button');
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            applyFilters();
            scrollToTop();
        }
    });
    paginationControls.appendChild(nextButton);
};

// Function to scroll to the top of the product list
const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
// --------------------------------------  BULK RESTOCK CODES BEGIN  ----------------------------------------- //

// Get elements
const bulkRestockButton = document.getElementById('bulkRestockButton');
const bulkRestockPopupOverlay = document.getElementById('bulkRestockPopupOverlay');
const bulkRestockCloseButton = document.getElementById('bulkRestockCloseButton');

// Show popup when "Bulk Restock" button is clicked
bulkRestockButton.addEventListener('click', () => {
    bulkRestockPopupOverlay.classList.remove('hidden');
});

// Close popup when "Close" button is clicked
// Event listener for Close button
bulkRestockCloseButton.addEventListener('click', () => {
    // Check if there is any data in the selectedParts object
    const hasData = Object.keys(selectedParts).length > 0; // Checks if there are any entries in selectedParts

    if (hasData) {
        // Show a confirmation dialog if there is data
        const confirmClose = confirm("Are you sure you want to close? Any unsaved changes will be lost.");
        
        if (confirmClose) {
            // Clear data and close the popup if the user confirms
            clearBulkRestockData();
            console.log('Popup closed and data cleared');
        } else {
            console.log('Close canceled by user');
        }
    } else {
        // No data in the table, just close the popup without asking
        clearBulkRestockData();
        console.log('Popup closed without data');
    }
});


// Function to clear all data in the bulk restock popup
function clearBulkRestockData() {
    bulkRestockSearch.value = ''; // Clear the search input field
    bulkRestockSearch.dataset.selectedName = ''; // Clear any stored dataset attributes
    bulkRestockSearch.dataset.selectedType = '';
    bulkRestockSearch.dataset.selectedStock = '';
    bulkRestockDropdown.classList.add('bulk-restock-dropdown-hidden'); // Hide dropdown

    // Clear selected parts and table rows
    selectedParts = {};
    tableBody.innerHTML = '';

    // Close the popup
    bulkRestockPopupOverlay.classList.add('hidden');
}

// Optional: close the popup when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === bulkRestockPopupOverlay) {
        bulkRestockPopupOverlay.classList.add('hidden');
    }
});


// Element references
// Element references
const bulkRestockSearch = document.getElementById('bulkRestockSearch');
const bulkRestockDropdown = document.getElementById('bulkRestockDropdown');
const bulkRestockAddPartButton = document.getElementById('bulkRestockAddPartButton');
const bulkRestockConfirmButton = document.getElementById('bulkRestockConfirmButton');
const tableBody = document.querySelector('.table-body'); // Table body to add new rows

// Inventory data and selected parts
let inventoryData = []; // Stores all inventory items
let selectedParts = {}; // Stores selected parts for restocking

// Fetch inventory data from the server
async function fetchInventory() {
    try {
        const response = await fetch('getInventory.php'); // Replace with your actual endpoint
        inventoryData = await response.json();
    } catch (error) {
        console.error('Error fetching inventory data:', error);
    }
}

// Initialize inventory data on page load
fetchInventory();

document.addEventListener('click', (event) => {
    const isClickInsideSearch = bulkRestockSearch.contains(event.target);
    const isClickInsideDropdown = bulkRestockDropdown.contains(event.target);

    // If the click is outside the search field and dropdown, hide the dropdown
    if (!isClickInsideSearch && !isClickInsideDropdown) {
        bulkRestockDropdown.classList.add('bulk-restock-dropdown-hidden');
    }
});

// Log to check if the input field is focused and has input
bulkRestockSearch.addEventListener('focus', () => {
    bulkRestockDropdown.classList.remove('bulk-restock-dropdown-hidden'); // Show dropdown
    console.log('Dropdown shown on focus');
});

bulkRestockSearch.addEventListener('input', () => {
    const query = bulkRestockSearch.value.toLowerCase();
    bulkRestockDropdown.innerHTML = ''; // Clear previous items

    // Filter and sort inventory items by stock in ascending order
    const filteredItems = inventoryData
        .filter(item => item.name.toLowerCase().includes(query))
        .sort((a, b) => a.stock - b.stock); // Sort by stock, lower values at the top

    if (filteredItems.length > 0) {
        bulkRestockDropdown.classList.remove('bulk-restock-dropdown-hidden');

        filteredItems.forEach(item => {
            const dropdownItem = document.createElement('div');
            dropdownItem.classList.add('bulk-restock-dropdown-item');
            dropdownItem.textContent = `${item.name} (${item.type}, Stock: ${item.stock})`;
            dropdownItem.dataset.name = item.name;
            dropdownItem.dataset.type = item.type;
            dropdownItem.dataset.stock = item.stock;

            dropdownItem.addEventListener('click', () => {
                bulkRestockSearch.value = dropdownItem.textContent;
                bulkRestockSearch.dataset.selectedName = dropdownItem.dataset.name;
                bulkRestockSearch.dataset.selectedType = dropdownItem.dataset.type;
                bulkRestockSearch.dataset.selectedStock = dropdownItem.dataset.stock;
                bulkRestockDropdown.classList.add('bulk-restock-dropdown-hidden');
            });
            bulkRestockDropdown.appendChild(dropdownItem);
        });
    } else {
        bulkRestockDropdown.classList.add('bulk-restock-dropdown-hidden');
    }
});


// Add selected part to the table when "Add Part" is clicked
bulkRestockAddPartButton.addEventListener('click', () => {
    const name = bulkRestockSearch.dataset.selectedName;
    const type = bulkRestockSearch.dataset.selectedType;
    const currentStock = parseInt(bulkRestockSearch.dataset.selectedStock);

    if (name && !selectedParts[`${name}-${type}`]) { // Add only if a part is selected and not already added
        selectedParts[`${name}-${type}`] = { name, type, currentStock };

        // Create a new row in the table for the selected part
        const tableRow = document.createElement('div');
        tableRow.classList.add('table-row');
        tableRow.innerHTML = ` 
            <span>${name}</span>
            <span>${type}</span>
            <input type="number" class="bulk-restock-quantity-input" min="0" placeholder="0" data-name="${name}" data-type="${type}" data-current-stock="${currentStock}">
            <button class="remove-part-button" data-name="${name}" data-type="${type}">X</button>
        `;

        tableRow.querySelector('.remove-part-button').addEventListener('click', (event) => {
            const partName = event.target.getAttribute('data-name');
            const partType = event.target.getAttribute('data-type');
            
            // Remove the part from selectedParts and the table row
            delete selectedParts[`${partName}-${partType}`];
            tableRow.remove();
        });

        tableBody.appendChild(tableRow);

        // Clear search input after adding
        bulkRestockSearch.value = '';
    }
});

// Confirm and update stock for each part
// Function to confirm and update stock for each part in bulk restock
// Confirm and update stock for each part in bulk restock
bulkRestockConfirmButton.addEventListener('click', () => {
    const inputs = document.querySelectorAll('.bulk-restock-quantity-input');
    let allQuantitiesValid = true;

    // Check if all quantity inputs have a value greater than 0
    inputs.forEach(input => {
        const quantityToAdd = parseInt(input.value) || 0;
        if (quantityToAdd <= 0) {
            allQuantitiesValid = false;
        }
    });

    if (!allQuantitiesValid) {
        alert("Please ensure all quantity values are greater than 0 before confirming.");
        return;
    }

    // Show a confirmation dialog before saving
    const confirmAction = confirm("Are you sure you want to confirm? Changes will be saved.");
    if (!confirmAction) return;

    inputs.forEach(input => {
        const partName = input.dataset.name;
        const currentStock = parseInt(input.dataset.currentStock) || 0;
        const quantityToAdd = parseInt(input.value) || 0;
        const newTotalStock = currentStock + quantityToAdd;

        console.log(`Restocking part: ${partName}, Current Stock: ${currentStock}, Quantity to Add: ${quantityToAdd}, New Total Stock: ${newTotalStock}`);

        if (quantityToAdd > 0) {
            // Log stock change without part_id
            logStockChange(partName, 'add', quantityToAdd, newTotalStock);

            // Update stock in the system
            fetch('updateStock.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: partName,
                    newStock: newTotalStock
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log(`Successfully updated stock for part ${partName} to ${newTotalStock}`);
                } else {
                    console.error(`Failed to update stock for ${partName}: ${data.error}`);
                }
            })
            .catch(error => console.error('Error updating stock:', error));
        }
    });

    alert('Stock update complete');
    location.reload();
});

// Function to log stock change in the inventory_stock_changes table
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
        console.log('Response from log_stock_change.php:', result);

        if (result.success) {
            console.log('Stock change logged successfully.');
        } else {
            console.error('Failed to log stock change:', result.error);
        }
    })
    .catch(error => console.error('Network error while logging stock change:', error));
}







// -------------------------------------  BULK RESTOCK CODES ENDS  ------------------------------------------- //
// -------------------------------------  GENERATE REPORT CODES BEGIN  --------------------------------------- //
// Select elements
const generateReportButton = document.getElementById('generateReportButton');
const generateReportPopup = document.getElementById('generateReportPopup');
const closeReportPopupButton = document.getElementById('closeReportPopup');
const generateReportSubmit = document.getElementById('generateReportSubmit');
const reportTypeSelect = document.getElementById('reportTypeSelect');
const fromDateInput = document.getElementById('fromDate');
const toDateInput = document.getElementById('toDate');
const dateLabels = document.querySelectorAll('.date-label');
const dateInputs = document.querySelectorAll('.date-input');
const reportBody = document.querySelector('.generate-report-body');

// Show popup when Generate Report button is clicked
generateReportButton.addEventListener('click', () => {
    generateReportPopup.classList.remove('hidden');
});

// Close popup when Close button is clicked
closeReportPopupButton.addEventListener('click', () => {
    generateReportPopup.classList.add('hidden');
    clearReportContent(); // Clear report content when closing

    fromDateInput.value = '';
    toDateInput.value = '';

    // Reset the selected type in the dropdown
    reportTypeSelect.value = ''; // Or use the default value, if any
});

// Toggle date fields visibility based on report type selection
reportTypeSelect.addEventListener('change', () => {
    if (reportTypeSelect.value === 'inventory') {
        // Hide date fields for Inventory Report
        dateLabels.forEach(label => label.classList.add('hidden'));
        dateInputs.forEach(input => input.classList.add('hidden'));
    } else {
        // Show date fields for other reports
        dateLabels.forEach(label => label.classList.remove('hidden'));
        dateInputs.forEach(input => input.classList.remove('hidden'));
    }
});

// Handle report generation when Generate button is clicked
generateReportSubmit.addEventListener('click', () => {
    const reportType = reportTypeSelect.value;

    if (!reportType) {
        alert("Please select a report type.");
        return;
    }

    if (reportType === 'inventory') {
        // Generate Inventory Report without date range
        clearReportContent();
        generateInventoryReport();
    } else if (reportType === 'sales') { // Check for Sales Report
        const fromDate = fromDateInput.value;
        const toDate = toDateInput.value;

        if (!fromDate || !toDate) {
            alert("Please select both a 'From' and 'To' date.");
            return;
        }

        if (new Date(fromDate) > new Date(toDate)) {
            alert("The 'From' date cannot be later than the 'To' date.");
            return;
        }

        clearReportContent();
        generateSalesReport(fromDate, toDate); // Pass date range for Sales Report
    } else if (reportType === 'restock') { // Check for Restock Report
        const fromDate = fromDateInput.value;
        const toDate = toDateInput.value;

        if (!fromDate || !toDate) {
            alert("Please select both a 'From' and 'To' date.");
            return;
        }

        if (new Date(fromDate) > new Date(toDate)) {
            alert("The 'From' date cannot be later than the 'To' date.");
            return;
        }

        clearReportContent();
        generateRestockReport(fromDate, toDate); // Pass date range for Restock Report
    } else {
        // For other report types, validate and use date range
        const fromDate = fromDateInput.value;
        const toDate = toDateInput.value;

        if (!fromDate || !toDate) {
            alert("Please select both a 'From' and 'To' date.");
            return;
        }

        if (new Date(fromDate) > new Date(toDate)) {
            alert("The 'From' date cannot be later than the 'To' date.");
            return;
        }

        // Generate report with date range
        clearReportContent();
        generateReport(reportType, fromDate, toDate);
    }
});

 
// Clear report content
function clearReportContent() {
    reportBody.innerHTML = ''; // Clear previous content
}

function generateRestockReport(fromDate, toDate) {
    fetch(`generate_restock_report.php?from=${fromDate}&to=${toDate}`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                reportBody.innerHTML = '<p>No restock data found for the selected date range.</p>';
            } else {
                displayRestockReportData(data);
            }
        })
        .catch(error => {
            console.error("Error generating inventory log report:", error);
            reportBody.innerHTML = '<p>Failed to generate the inventory log report. Please try again later.</p>';
        });
}

function generateSalesReport(fromDate, toDate) {
    fetch(`generate_sales_report.php?from=${fromDate}&to=${toDate}`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                reportBody.innerHTML = '<p>No sales data found for the selected date range.</p>';
            } else {
                displayReportData(data, "Sales Report"); // Add title for Sales Report
            }
        })
        .catch(error => {
            console.error("Error generating sales report:", error);
            reportBody.innerHTML = '<p>Failed to generate the sales report. Please try again later.</p>';
        });
}

// Generate Inventory Report function
function generateInventoryReport() {
    fetch(`generate_inventory_report.php`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                reportBody.innerHTML = '<p>No items found in inventory.</p>';
            } else {
                displayReportData(data, "Current Inventory Report"); // Add title for Inventory Report
            }
        })
        .catch(error => {
            console.error("Error generating inventory report:", error);
            reportBody.innerHTML = '<p>Failed to generate the inventory report. Please try again later.</p>';
        });
}

// Generate other reports with date range
function generateRestockReport(fromDate, toDate) {
    fetch(`generate_restock_report.php?from=${fromDate}&to=${toDate}`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                reportBody.innerHTML = '<p>No restock data found for the selected date range.</p>';
            } else {
                displayReportData(data, "Inventory Log Report"); // Use the display function with title "Restock Report"
            }
        })
        .catch(error => {
            console.error("Error generating inventory log report:", error);
            reportBody.innerHTML = '<p>Failed to generate the inventory log report. Please try again later.</p>';
        });
}

// Display fetched report data in the report body
function displayReportData(data, title) {
    const headerMapping = {
        job_order_id: "Job Order ID",
        first_name: "First Name",
        last_name: "Last Name",
        part_name: "Part Name",
        quantity: "Quantity",
        completion_time: "Completion Time",
        name: "Product Name",
        brand: "Brand",
        type: "Product Type",
        stock: "Available Stock",
        retail_price: "Retail Price",
        capital_price: "Capital Price",
        item_by: "Owner",
        change_type: "Change Type",           // For Restock Report
        total_stock: "Total Stock", // For Restock Report
        change_date: "Change Date"
    };

    // Clear previous report content
    reportBody.innerHTML = '';

    // Create a container for title and timestamp
    const headerContainer = document.createElement('div');
    headerContainer.style.display = 'flex';
    headerContainer.style.justifyContent = 'space-between';
    headerContainer.style.alignItems = 'center';
    headerContainer.style.marginBottom = '20px';

    // Create a heading element for the report
    const headingElement = document.createElement('h2');
    headingElement.textContent = title; // Set the heading text to the title parameter
    headingElement.style.color = '#3A3B66';
    headingElement.style.fontSize = '24px';
    headingElement.style.fontWeight = 'bold';
    headingElement.style.margin = 0;

    // Get current date and time
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();

    // Create a timestamp element
    const timestampElement = document.createElement('p');
    timestampElement.textContent = `Generated on: ${formattedDate} at ${formattedTime}`;
    timestampElement.style.color = '#555';
    timestampElement.style.fontSize = '14px';
    timestampElement.style.margin = 0;

    // Append title and timestamp to the header container
    headerContainer.appendChild(headingElement);
    headerContainer.appendChild(timestampElement);
    reportBody.appendChild(headerContainer);

    // Create a table for displaying the report data
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';

    // Create the header row
    const headerRow = document.createElement('tr');
    const headers = Object.keys(data[0]);
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = headerMapping[header] || header; // Use mapped name or default if not in mapping
        th.style.padding = '8px';
        th.style.textAlign = 'center';
        th.style.backgroundColor = '#f2f2f2';
        th.style.borderBottom = '1px solid #ccc';
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Create rows for each data entry
    data.forEach(row => {
        const tr = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = row[header];
            td.style.padding = '8px';
            td.style.textAlign = 'center';
            td.style.borderBottom = '1px solid #ccc';
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    // Append the table to the report body
    reportBody.appendChild(table);
}

// Pass the report title dynamically when printing
const printReportButton = document.getElementById('printReportButton');

printReportButton.addEventListener('click', () => {
    const title = document.querySelector('.generate-report-body h2').textContent; // Get the report title
    printReport(title);
});

function printReport(title) {
    const printContents = document.querySelector('.generate-report-body').innerHTML;
    const originalContents = document.body.innerHTML;

    // Set up the printable view with the image using a unique timestamp to avoid cache issues
    document.body.innerHTML = `
        <html>
        <head>
            <title>Print Report</title>
            <style>
                /* General styles for the print view */
                body { font-family: Arial, sans-serif; color: #333; }
                .business-info { margin-bottom: 20px; display: flex; align-items: center; justify-content: center; }
                .business-logo { width: 80px; height: auto; margin-right: 1px; }
                .business-text { text-align: left; }
                .business-name { font-size: 20px; font-weight: bold; color: #333; margin: 5px 0; margin-right: 80px; }
                .business-address, .business-contact { margin: 0; font-size: 14px; color: #555; }
                .business-separator { border: 1px solid #ccc; margin: 10px 0; }
                h2 { text-align: center; color: #3A3B66; font-size: 24px; margin-bottom: 20px; }
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
                th { background-color: #f2f2f2; }
                
            </style>
        </head>
        <body>
            <div class="business-info">
                <img src="initial-logo.png?timestamp=${new Date().getTime()}" alt="AG-Tech Logo" class="business-logo">
                <div class="business-text">
                    <h2 class="business-name">AG TECHNICIAN SERVICES</h2>
                    <p class="business-address">BLK 34 LOT 13 SANTOL KANAN St. corner MULAWIN</p>
                    <p class="business-address">AMPARO VILLAGE CALOOCAN CITY</p>
                    <p class="business-contact">AG TECH - ALEX Mobile No: 09453611707</p>
                </div>
            </div>
            <hr class="business-separator">
            ${printContents}
        </body>
        </html>
    `;

    // Wait for the logo to load before triggering print
    const printLogo = document.querySelector('.business-logo');
    printLogo.onload = () => {
        window.print();
        document.body.innerHTML = originalContents;
        location.reload(); // Reload to restore JavaScript functionality after printing
    };

    // In case the image fails to load, fallback to printing immediately
    printLogo.onerror = () => {
        window.print();
        document.body.innerHTML = originalContents;
        location.reload();
    };
}


// -------------------------------------  GENERATE REPORT CODES END  ----------------------------------------- //


    // Real-time search functionality without debounce
    searchBar.addEventListener('input', () => {
        selectedFilters.searchTerm = searchBar.value.toLowerCase(); // Update the search term
        applyFilters(); // Apply filters immediately
    });

    productList.addEventListener('click', (event) => {
        if (event.target.classList.contains('details-button')) {
            const productId = event.target.getAttribute('data-id');
            showProductPopup(productId);
        }
    });

    const togglePopupProductStatus = (productId, button) => {
        const product = products.find(p => p.id == productId);
        if (product) {
            // Toggle product status
            product.status = product.status === 'active' ? 'inactive' : 'active';
            button.textContent = product.status === 'active' ? 'Inactive' : 'Active';
            button.classList.toggle('active', product.status === 'active');
            button.classList.toggle('inactive', product.status === 'inactive');
            
            // Save the new status to the backend
            const formData = new FormData();
            formData.append('id', productId);
            formData.append('status', product.status);
    
            fetch('update_product_status.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())  // Expecting JSON from the backend
            .then(result => {
                if (result.success) {
                    console.log('Product status updated successfully.');
                } else {
                    console.error('Failed to update status:', result.message);
                    alert('Error updating product status: ' + result.message);
                }
            })
            .catch(error => {
                console.error('Error updating status:', error);
                alert('There was an error communicating with the server: ' + error);
            });
    
            applyFilters();
            updateProductCounts();
        }
    };    

    const showProductPopup = (productId) => {
        const existingPopup = document.querySelector('.popup-container');
        if (existingPopup) {
            document.body.removeChild(existingPopup);
            if (existingPopup.dataset.productId === productId) return;
        }
    
        const product = products.find(p => p.id == productId);
        const popupContainer = document.createElement('div');
        popupContainer.classList.add('popup-container');
        popupContainer.dataset.productId = productId;
    
        popupContainer.innerHTML = `
            <div class="popup-content">
                <div class="popup-header">
                    <button class="close-popup">X</button>
                    <div class="button-wrapper">
                        <div class="status-toggle">
                            <button class="toggle-popup-status-button ${product.status}" data-id="${product.id}">${product.status === 'active' ? 'Inactive' : 'Active'}</button>
                        </div>
                        <button class="edit-button">Edit</button>
                    </div>
                </div>
                <h3><span class="editable" contenteditable="false">${product.name}</span></h3>
                <p>${product.category} · ${product.brand}</p>
                <div class="popup-body">
                    <div class="popup-product-info">
                        <h4>Product Information</h4>
                        <div class="info-row">
                            <strong>CATEGORY</strong>
                            <span class="editable" contenteditable="false">${product.category}</span>
                        </div>
                        <div class="info-row">
                            <strong>PRODUCT TYPE</strong>
                            <select id="editProductType" class="editable" disabled>
                                <option value="ORIGINAL" ${product.type === 'ORIGINAL' ? 'selected' : ''}>ORIGINAL</option>
                                <option value="CLASS A" ${product.type === 'CLASS A' ? 'selected' : ''}>CLASS A</option>
                            </select>
                        </div>
                        <div class="info-row">
                            <strong>BRAND</strong>
                            <span class="editable" contenteditable="false">${product.brand}</span>
                        </div>
                        <div class="info-row">
                            <strong>RETAIL PRICE</strong>
                            <span class="editable" contenteditable="false">${product.retail_price}</span>
                        </div>
                        <div class="info-row">
                            <strong>CAPITAL PRICE</strong>
                            <span class="editable" contenteditable="false">${product.capital_price}</span>
                        </div>
                        <div class="info-row">
                            <strong>ITEM BY</strong>
                            <span class="editable" contenteditable="false">${product.item_by}</span>
                        </div>
                        <div class="info-row">
                            <strong>LABOR COST</strong>
                            <span class="editable" contenteditable="false">${product.labor_cost}</span>
                        </div>
                        <div class="info-row">
                            <strong>DAYS TO DELIVER</strong>
                            <span class="editable" contenteditable="false">${product.days_to_deliver}</span>
                        </div>
                        <div class="info-row">
                            <strong>ESTIMATE COMPLETION</strong>
                            <div class="completions-container">
                                <div class="completion-item">
                                    <span class="editables" contenteditable="true" id="completionDays">${product.estimate_completion_days || 0}</span>
                                    <span>DAYS</span>
                                </div>
                                <div class="completion-item">
                                    <span class="editables" contenteditable="true" id="completionHours">${product.estimate_completion_hours || 0}</span>
                                    <span>HOURS</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="stock-info">
                        <h4>QUANTITY AT HAND</h4>
                        <span class="stock-display">${product.stock}</span>
                        <div class="stock-container" style="display: none;">
                            <input type="number" class="stock-input" value="${product.stock}" min="0" style="border: 1px solid #ccc; width: 100px;">
                        </div>
                        <button class="adjust-stock">Adjust Stock</button>
                    </div>
                </div>
                <div class="button-container">
                    <button class="cancel-button" style="display: none;">Cancel</button>
                    <button class="save-details" style="display: none;" disabled>Save</button>
                </div>
            </div>
        `;
    
        document.body.appendChild(popupContainer);
    
        const adjustStockButton = popupContainer.querySelector('.adjust-stock');
        const stockContainer = popupContainer.querySelector('.stock-container');
        const stockDisplay = popupContainer.querySelector('.stock-display');
        const stockInput = popupContainer.querySelector('.stock-input');
        const saveButton = popupContainer.querySelector('.save-details');
        const editButton = popupContainer.querySelector('.edit-button');
        const cancelButton = popupContainer.querySelector('.cancel-button');
        const productTypeSelect = document.getElementById('editProductType');
        const toggleStatusButton = popupContainer.querySelector('.toggle-popup-status-button');
    
        let hasChanges = false;
    
        const enableSaveButton = () => {
            saveButton.disabled = false;
            saveButton.classList.remove('disabled');
            saveButton.style.display = 'inline';
        };
    
        saveButton.disabled = true;
        saveButton.classList.add('disabled');
    
        const editableFields = popupContainer.querySelectorAll('.editable');
        editableFields.forEach(field => {
            field.addEventListener('input', () => {
                console.log(`Field Updated: ${event.target.innerText}`);
                hasChanges = true;
                enableSaveButton();
            });
        });
    
        editButton.addEventListener('click', () => {
            productTypeSelect.disabled = false; // Enable the select field
        });
        
        cancelButton.addEventListener('click', () => {
            productTypeSelect.disabled = true; // Disable the select field
        });
    
        stockInput.addEventListener('input', () => {
            hasChanges = true;
            enableSaveButton();
        });
    
        adjustStockButton.addEventListener('click', () => {
            stockContainer.style.display = 'block';
            stockDisplay.style.display = 'none';
            saveButton.style.display = 'inline';
            cancelButton.style.display = 'inline';
    
            editButton.classList.add('disabled');
            toggleStatusButton.classList.add('disabled');
        });
    
        editButton.addEventListener('click', () => {
            makeFieldsEditable(popupContainer);
            document.getElementById('editProductType').removeAttribute('disabled');
            adjustStockButton.classList.add('disabled');
            toggleStatusButton.classList.add('disabled');
            saveButton.style.display = 'inline';
            cancelButton.style.display = 'inline';
        });
    
        cancelButton.addEventListener('click', () => {
            stockContainer.style.display = 'none';
            stockDisplay.style.display = 'inline';
            saveButton.style.display = 'none';
            cancelButton.style.display = 'none';
    
            hasChanges = false;
            saveButton.disabled = true;
            saveButton.classList.add('disabled');
    
            editButton.classList.remove('disabled');
            adjustStockButton.classList.remove('disabled');
            toggleStatusButton.classList.remove('disabled');
    
            const fields = popupContainer.querySelectorAll('.editable');
            fields.forEach(field => {
                field.contentEditable = false;
                field.style.border = 'none';
            });
        });
    
        const closeButton = popupContainer.querySelector('.close-popup');
        closeButton.addEventListener('click', () => {
            document.body.removeChild(popupContainer);
        });
    
        // Toggle product status functionality
        toggleStatusButton.addEventListener('click', () => {
            togglePopupProductStatus(productId, toggleStatusButton);
        });
    
        saveButton.addEventListener('click', () => {
            const newStock = parseInt(stockInput.value, 10);
            if (!isNaN(newStock) && newStock >= 0) {
                const currentStock = product.stock;

                if (newStock !== currentStock) {
                    const changeType = newStock > currentStock ? 'add' : 'deduct';
                    const quantity = Math.abs(newStock - currentStock);

                    if (quantity > 0) { // Only log if the quantity change is greater than 0
                        logStockChange(product.name, changeType, quantity, newStock);
                    }
                }

                // Update product object and UI
                product.stock = newStock;
                stockDisplay.textContent = newStock;
                stockContainer.style.display = 'none';
                stockDisplay.style.display = 'inline';

                if (newStock === 0 && product.status === 'active') {
                    product.status = 'inactive';
                    toggleStatusButton.textContent = 'Active'; // Change button text to show "Active"
                    toggleStatusButton.classList.remove('active');
                    toggleStatusButton.classList.add('inactive');
                    updateProductStatus(product.id, 'inactive'); // Update status
                }
            }
            product.name = editableFields[0]?.innerText.trim().toUpperCase();
            product.category = editableFields[1]?.innerText.trim().toUpperCase();
            product.type = document.getElementById('editProductType').value; // Get the selected value from the dropdown
            product.brand = editableFields[3]?.innerText.trim().toUpperCase();
            product.retail_price = parseFloat(editableFields[4]?.innerText.trim()) || product.retail_price;
            product.capital_price = parseFloat(editableFields[5]?.innerText.trim()) || product.capital_price;
            product.item_by = editableFields[6]?.innerText.trim().toUpperCase();
            product.labor_cost = parseFloat(editableFields[7]?.innerText.trim()) || product.labor_cost;
            product.days_to_deliver = parseInt(editableFields[8]?.innerText.trim(), 10) || product.days_to_deliver;
        
            const completionDaysElement = popupContainer.querySelector('#completionDays');
            const completionHoursElement = popupContainer.querySelector('#completionHours');
        
            product.estimate_completion_days = parseInt(completionDaysElement.innerText.trim(), 10) || 0;
            product.estimate_completion_hours = parseInt(completionHoursElement.innerText.trim(), 10) || 0;
        
            console.log("Estimate Completion Days:", product.estimate_completion_days);
            console.log("Estimate Completion Hours:", product.estimate_completion_hours);
        
            const formData = new FormData();
            formData.append('id', product.id);
            formData.append('name', product.name);
            formData.append('category', product.category);
            formData.append('type', product.type); // Include product type
            formData.append('brand', product.brand);
            formData.append('retail_price', product.retail_price);
            formData.append('capital_price', product.capital_price);
            formData.append('item_by', product.item_by);
            formData.append('labor_cost', product.labor_cost);
            formData.append('stock', product.stock);
            formData.append('days_to_deliver', product.days_to_deliver);
            formData.append('estimate_completion_days', product.estimate_completion_days);
            formData.append('estimate_completion_hours', product.estimate_completion_hours);
        
            fetch('update_product.php', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.text())
                .then((result) => {
                    const productItem = document.querySelector(`.product-item[data-id="${product.id}"]`);
                    if (productItem) {
                        productItem.querySelector('.inline-details').innerHTML = `Brand: ${product.brand} | Category: ${product.category} | Stock: ${product.stock}`;
                        productItem.querySelector('h4').textContent = product.name;
                        productItem.querySelectorAll('.Tprice')[0].innerHTML = `RETAIL PRICE <span class="price">₱${product.retail_price}</span>`;
                        productItem.querySelectorAll('.Tprice')[1].innerHTML = `CAPITAL PRICE <span class="price">₱${product.capital_price}</span>`;
                        productItem.querySelector('.product-type h4').textContent = `Type: ${product.type}`;
                        productItem.querySelector('.inline-details:nth-of-type(2)').textContent = `Item by: ${product.item_by}`;
                    }
                    saveButton.style.display = 'none';
                    cancelButton.style.display = 'none';
                    document.body.removeChild(popupContainer);
                    updateProductCounts();
                })
                .catch((error) => console.error('Error updating product:', error));
        });
        
        // Enable save button when estimate fields change
        const completionDaysElement = popupContainer.querySelector('#completionDays');
        const completionHoursElement = popupContainer.querySelector('#completionHours');
        
        completionDaysElement.addEventListener('input', () => {
            saveButton.disabled = false;
            saveButton.classList.remove('disabled');
        });
        
        completionHoursElement.addEventListener('input', () => {
            saveButton.disabled = false;
            saveButton.classList.remove('disabled');
        });
        
        // Also ensure other editable fields enable the save button
        editableFields.forEach((field) => {
            field.addEventListener('input', () => {
                saveButton.disabled = false;
                saveButton.classList.remove('disabled');
            });
        });               
    };
    
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
    const makeFieldsEditable = (popupContainer) => {
        const fields = popupContainer.querySelectorAll('.editable');
        fields.forEach(field => {
            field.contentEditable = true;
            field.style.border = '1px solid #ccc';
        });
        popupContainer.querySelector('.save-details').style.display = 'inline';
    };

    const updateProductCounts = () => {
        const allCount = products.length;
        const activeCount = products.filter(product => product.status === 'active').length;
        const inactiveCount = products.filter(product => product.status === 'inactive').length;

        allCountSpan.textContent = `(${allCount})`;
        activeCountSpan.textContent = `(${activeCount})`;
        inactiveCountSpan.textContent = `(${inactiveCount})`;
    };

    const sortProducts = (products, sortBy) => {
        if (sortBy === 'nameAsc') {
            return products.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'nameDesc') {
            return products.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sortBy === 'priceAsc') {
            return products.sort((a, b) => a.retail_price - b.retail_price);
        } else if (sortBy === 'priceDesc') {
            return products.sort((a, b) => b.retail_price - a.retail_price);
        }
        return products;
    };

    const applyFilters = () => {
        const filteredProducts = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(selectedFilters.searchTerm);
            const matchesStatus = selectedFilters.status === 'all' || product.status === selectedFilters.status;
            const matchesCategory = selectedFilters.category === 'all' || product.category.toUpperCase() === selectedFilters.category.toUpperCase();
            const matchesBrand = selectedFilters.brand === 'all' || product.brand.toUpperCase() === selectedFilters.brand.toUpperCase(); 
            const matchesType = selectedFilters.types.length === 0 || selectedFilters.types.map(type => type.toUpperCase()).includes(product.type.toUpperCase());
            const matchesPrice = product.retail_price >= selectedFilters.minPrice && product.retail_price <= selectedFilters.maxPrice;

            return matchesSearch && matchesStatus && matchesCategory && matchesBrand && matchesType && matchesPrice;
        });

        const sortedProducts = sortProducts(filteredProducts, selectedFilters.sortBy);
        renderProducts(sortedProducts);
    };

    const updateFilters = () => {
        selectedFilters.searchTerm = searchBar.value.toLowerCase();
        selectedFilters.status = Array.from(statusButtons).find(btn => btn.getAttribute('aria-pressed') === 'true').dataset.value;
        selectedFilters.category = categoryFilter.value;
        selectedFilters.brand = brandFilter.value;
        selectedFilters.types = Array.from(typeFilters).filter(btn => btn.classList.contains('active')).map(btn => btn.value);
        selectedFilters.minPrice = parseFloat(minPriceInput.value) || 0;
        selectedFilters.maxPrice = parseFloat(maxPriceInput.value) || Infinity;
        selectedFilters.sortBy = sortBy.value;
    };

    // Add event listeners for the type filter buttons
    typeFilters.forEach(button => {
        button.addEventListener('click', function() {
            // Toggle active class on the clicked button
            this.classList.toggle('active');
            // Do not apply filters here; only change the button state.
        });
    });

    applyFiltersButton.addEventListener('click', () => {
        updateFilters();
        applyFilters();
    });

    resetFiltersButton.addEventListener('click', () => {
        searchBar.value = '';
        statusButtons.forEach(btn => {
            btn.setAttribute('aria-pressed', 'false');
            btn.classList.remove('active');
            btn.classList.add('inactive'); // Adjust based on your CSS classes
        });
        document.querySelector('.status-button[data-value="all"]').setAttribute('aria-pressed', 'true');
        categoryFilter.value = 'all';
        brandFilter.value = 'all'; 
        typeFilters.forEach(btn => btn.classList.remove('active'));
        minPriceInput.value = '';
        maxPriceInput.value = '';
        sortBy.value = 'nameAsc';

        selectedFilters = {
            searchTerm: '',
            status: 'all',
            category: 'all',
            brand: 'all',
            types: [],
            minPrice: 0,
            maxPrice: Infinity,
            sortBy: 'nameAsc'
        };

        fetchProducts();
    });

    const addProduct = (() => {
        const popupContainer = document.querySelector('.add-product-popup');
        const saveButton = popupContainer.querySelector('.save-add-product');
        const inputFields = [
            document.getElementById('addProductName'),
            document.getElementById('addProductBrand'),
            document.getElementById('addProductCategory'),
            document.getElementById('addProductStatus'),
            document.getElementById('addProductType'),
            document.getElementById('addProductStock'),
            document.getElementById('addProductRetailPrice'),
            document.getElementById('addProductCapitalPrice'),
            document.getElementById('addProductItemBy'),
            document.getElementById('addProductLaborCost'),
            document.getElementById('addProductDaysToDeliver'),
            document.getElementById('addProductCompletionDays'), // Days input
            document.getElementById('addProductCompletionHours')
        ];

        const closePopup = () => {
            popupContainer.style.display = 'none';
        };

        const saveProduct = () => {
            const formData = new FormData();
            formData.append('name', inputFields[0].value.trim().toUpperCase());
            formData.append('brand', inputFields[1].value.trim().toUpperCase());
            formData.append('category', inputFields[2].value.trim().toUpperCase());
            formData.append('status', inputFields[3].value);
            formData.append('type', inputFields[4].value.trim().toUpperCase());
            formData.append('stock', inputFields[5].value);
            formData.append('retail_price', inputFields[6].value);
            formData.append('capital_price', inputFields[7].value);
            formData.append('item_by', inputFields[8].value.trim().toUpperCase());
            formData.append('labor_cost', inputFields[9].value);
            formData.append('days_to_deliver', inputFields[10].value.trim());
            formData.append('completion_days', inputFields[11].value.trim() || 0); // Default to 0 if empty
            formData.append('completion_hours', inputFields[12].value.trim() || 0); // Default to 0 if empty

            fetch('add_product.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(result => {
                alert(result);
                fetchProducts(); // Fetch products again to update the filter
                closePopup();
            })
            .catch(error => console.error('Error adding product:', error));
        };

        const checkFieldsFilled = () => {
            const allFilled = inputFields.every(input => input.value.trim() !== '');
        
            saveButton.disabled = !allFilled;
        
            inputFields.forEach((input, index) => {
                const requiredIndicator = input.previousElementSibling?.querySelector('.required');
                if (requiredIndicator) {
                    if (input.value.trim() === '') {
                        requiredIndicator.style.color = 'red';
                    } else {
                        requiredIndicator.style.color = '';
                    }
                }
            });
        };

        const setupEventListeners = () => {
            const closeButton = popupContainer.querySelector('.close-add-product');
            closeButton.addEventListener('click', closePopup);

            saveButton.disabled = true;
            saveButton.addEventListener('click', saveProduct);

            const cancelButton = popupContainer.querySelector('.cancel-add-product');
            cancelButton.addEventListener('click', closePopup);

            inputFields.forEach(input => {
                input.addEventListener('input', checkFieldsFilled);
            });
        };

        setupEventListeners();

        return () => {
            inputFields.forEach(input => input.value = '');
            checkFieldsFilled();
            popupContainer.style.display = 'flex';
        };
    })();

    addProductButton.addEventListener('click', addProduct);

    statusButtons.forEach(button => {
        button.addEventListener('click', () => {
            statusButtons.forEach(btn => {
                btn.setAttribute('aria-pressed', 'false');
                btn.classList.remove('active');
                btn.classList.add('inactive'); // Adjust based on your CSS classes
            });

            button.setAttribute('aria-pressed', 'true');
            button.classList.add('active'); // Adjust based on your CSS classes
            button.classList.remove('inactive'); // Adjust based on your CSS classes

            selectedFilters.status = button.getAttribute('data-value');
            applyFilters();
        });
    });

    updateProductCounts();
});