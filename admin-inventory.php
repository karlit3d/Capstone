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
    <title>Inventory Management</title>
    <link rel="stylesheet" href="inventory.css">
</head>
<body>
        <div class="container">
             <!-- Header Section -->
            <div class="header">
                <div class="header-left"> 
                    <h1>AG</h1>
                    <h2>TECH</h2>
                    <div class="nav-links">
                        <a href="admin-dashboard.php" class="nav-item">Dashboard</a>
                        <a href="admin-inventory.php" class="nav-item active">Inventory</a>
                        <a href="admin-appointment.php" class="nav-item">Appointments</a>
                        <a href="service-tagging.php" class="nav-item">Service Tagging</a>
                    </div>
                </div>
                <div class="header-right">  
                    <p>Hey, Admin</p>
                    <div class="profile-pic"></div>
                </div>
            </div>
        <!-- Sidebar Section -->
        <aside class="sidebar">
            <h3>PRODUCT STATUS</h3>
            <div class="filters-group">
                <button class="status-button" data-value="all" id="allButton" aria-pressed="true">All <span id="allCount"></span></button>
                <div class="status-group">
                    <button class="status-button" data-value="active" id="activeButton" aria-pressed="false">Active <span id="activeCount"></span></button>
                    <button class="status-button" data-value="inactive" id="inactiveButton" aria-pressed="false">Inactive <span id="inactiveCount"></span></button>
                </div>
            </div>
            
            
            <h3>CATEGORY</h3>
            <select id="categoryFilter">
                <option value="all">All Stock</option>
            </select>

            <h3>BRAND</h3>
            <select id="brandFilter">
                <option value="all">All Brands</option>
            </select>

            <h3>PRODUCT TYPE</h3>
            <div class="filter-group">
                <button class="typeFilter" value="Original" onclick="toggleButton(this)">Original</button>
                <button class="typeFilter" value="Class A" onclick="toggleButton(this)">Class A</button>
            </div>

            <h3>SORT BY</h3>
            <select id="sortBy">
                <option value="nameAsc">Alphabetical: (A-Z)</option> 
                <option value="nameDesc">Alphabetical: (Z-A)</option>
                <option value="priceAsc">Price (Low to High)</option>
                <option value="priceDesc">Price (High to Low)</option>
            </select>

            <h3>PRICE</h3>
            <div class="price-group">
              <input type="number" id="minPrice" placeholder="Minimum price">
              <input type="number" id="maxPrice" placeholder="Maximum price">
            </div>
<!-- Add Apply and Reset Buttons -->
            <button id="applyFilters" class="apply-filters-btn">Apply Now</button>
            <button id="resetFilters" class="reset-filters-btn">Reset All</button>
        </aside>

        <!-- Main Content Section -->
        <main class="main-content">  
              <h1>AG TECH - INVENTORY</h1>
            <div class="search-bar">
                <input type="text" id="searchBar" placeholder="Search Product...">
                <button class="add-button" id="addProductButton">Add Product +</button>
                <button class="bulk-restock-button" id="bulkRestockButton">Bulk Restock</button>
                <button id="generateReportButton" class="generate-report-button">Generate Report</button>
            </div>
            <div id="productList" class="product-list">
                <!-- Product items will be rendered here by JavaScript -->
            </div>
            <div id="paginationControls">
                <!-- Pagination buttons will be dynamically inserted here -->
            </div>
        </main>
    </div>

    <div id="bulkRestockPopupOverlay" class="bulk-restock-popup-overlay hidden">
        <div class="bulk-restock-popup-content">
                <div class="bulk-restock-popup-header">
            <h2 class="bulk-restock-popup-title">Bulk Restock of Inventory</h2>
            <button class="popup-close-button" id="bulkRestockCloseButton">X</button>
        </div>

            <!-- Search bar at the top -->
            <div class="popup-search" style="position: relative;">
                <input type="text" id="bulkRestockSearch" placeholder="Search Part">
                <div id="bulkRestockDropdown" class="bulk-restock-dropdown bulk-restock-dropdown-hidden"></div>
                <button id="bulkRestockAddPartButton" class="bulk-restock-add-part-button">Add Part</button>
            </div>

            <!-- Parts table -->
            <div class="popup-parts-table">
                <div class="table-header">
                    <span>Part Name</span>
                    <span>Type</span>
                    <span>Quantity</span>
                </div>
                <div class="table-body">
                    <!-- Example row (you can dynamically add more rows as needed) -->
                    <div class="table-row">
                    </div>
                    <!-- Additional rows would be generated dynamically -->
                </div>
            </div>
            
            <!-- Confirm button at the bottom right -->
            <button class="popup-confirm-button" id="bulkRestockConfirmButton">Confirm</button>
        </div>
    </div> 

    <div id="generateReportPopup" class="generate-report-popup hidden">
        <div class="generate-report-popup-content">
            <button id="closeReportPopup" class="close-report-popup">X</button>
            <h2 class="report-heading">AG TECH INVENTORY REPORT</h2>
            <div class="generate-report-header">
                <select id="reportTypeSelect">
                    <option value="">Select Report</option>
                    <option value="inventory">Inventory Report</option>
                    <option value="sales">Sales Report</option>
                    <option value="restock">Inventory Log Report</option>
                    <!-- Add other report options here -->
                </select>
                <label for="fromDate">From:</label>
                <input type="date" id="fromDate" />
                <label for="toDate">To:</label>
                <input type="date" id="toDate" />
                <button id="generateReportSubmit">Generate</button>
            </div>
            <div class="generate-report-body">
                <!-- This section will display the report content -->
            </div>
            <button id="printReportButton">Print</button>
        </div>
    </div>

    <div class="add-product-popup">
        <div class="add-product-content">
            <div class="add-product-header">
                <img src="back.png" alt="Close" class="close-add-product">
                <h3>Add New Product</h3>
            </div> 
            <div class="add-product-body">
                <div class="add-product-info">
                    <h4>Product Information</h4>
                    <div class="add-product-info-row">
                        <strong>NAME <span class="required">*</span></strong>
                        <input type="text" class="add-input" id="addProductName" placeholder="Product Name">
                    </div>
                    <div class="add-product-info-row">
                        <strong>BRAND <span class="required">*</span></strong>
                        <input type="text" class="add-input" id="addProductBrand" placeholder="Brand">
                    </div>
                    <div class="add-product-info-row">
                        <strong>CATEGORY <span class="required">*</span></strong>
                        <input type="text" class="add-input" id="addProductCategory" placeholder="Category">
                    </div>
                    <div class="add-product-info-row">
                        <strong>STATUS <span class="required">*</span></strong>
                        <select id="addProductStatus">
                            <option value="">Select Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <div class="add-product-info-row">
                        <strong>PRODUCT TYPE <span class="required">*</span></strong>
                        <select id="addProductType" class="add-input">
                            <option value="">Select Product Type</option>
                            <option value="Original">Original</option>
                            <option value="Class A">Class A</option>
                        </select>
                    </div>
                    <div class="add-product-info-row">
                        <strong>STOCK <span class="required">*</span></strong>
                        <input type="number" class="add-input" id="addProductStock" placeholder="Stock" min="0">
                    </div>
                    <div class="add-product-info-row">
                        <strong>RETAIL PRICE <span class="required">*</span></strong>
                        <input type="number" class="add-input" id="addProductRetailPrice" placeholder="Retail Price" min="0" step="0.01">
                    </div>
                    <div class="add-product-info-row">
                        <strong>CAPITAL PRICE <span class="required">*</span></strong>
                        <input type="number" class="add-input" id="addProductCapitalPrice" placeholder="Capital Price" min="0" step="0.01">
                    </div>
                    <div class="add-product-info-row">
                        <strong>ITEM BY <span class="required">*</span></strong>
                        <input type="text" class="add-input" id="addProductItemBy" placeholder="Item By">
                    </div>
                    <div class="add-product-info-row">
                        <strong>LABOR COST <span class="required">*</span></strong>
                        <input type="number" class="add-input" id="addProductLaborCost" placeholder="Labor Cost" min="0" step="0.01">
                    </div>
                    <div class="add-product-info-row">
                    <strong>DAYS TO DELIVER <span class="required">*</span></strong>
                    <input type="number" class="add-input" id="addProductDaysToDeliver" placeholder="Days to Deliver" min="0">
                    </div>
                    <div class="add-product-info-row">
                        <strong>ESTIMATE COMPLETION <span class="required">*</span></strong>
                        <div class="completion-container">
                            <div class="completion-field">
                                <label for="addProductCompletionDays">Days:</label>
                                <input type="number" id="addProductCompletionDays" min="0" placeholder="0">
                            </div>
                            <div class="completion-field">
                                <label for="addProductCompletionHours">Hours:</label>
                                <input type="number" id="addProductCompletionHours" min="0" max="23" placeholder="0">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="add-product-buttons">
                <button class="cancel-add-product">Cancel</button>
                <button class="save-add-product" disabled>Save</button> <!-- Disabled initially -->
            </div>
        </div>
    </div>        
    <script src="inventory.js"></script>
</body>
</html>