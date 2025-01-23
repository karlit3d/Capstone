document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const backButton = document.getElementById("back-button");
    const forgotPasswordLink = document.getElementById("forgot-password");
    const forgotPasswordPopup = document.getElementById("forgot-password-popup");
    const closePopupButton = document.getElementById("close-popup");
    const sendOtpForm = document.getElementById("send-otp-form");
    const otpVerificationPopup = document.getElementById("otp-verification-popup");
    const verifyOtpForm = document.getElementById("verify-otp-form");
    const changePasswordPopup = document.getElementById("change-password-popup");
    const changePasswordForm = document.getElementById("change-password-form");
    const closeOtpPopupButton = document.getElementById("close-otp-popup");
    const closeChangePasswordPopup = document.getElementById("close-change-password-popup");
    const loadingPopup = document.getElementById("loading-popup");
    const otpBoxes = document.querySelectorAll(".otp-box"); // Select all OTP input boxes

    // Track whether the action is for forgot password
    let isForgotPasswordAction = false;

    // Ensure the popups are hidden on page load
    forgotPasswordPopup.style.display = "none";
    otpVerificationPopup.style.display = "none";
    changePasswordPopup.style.display = "none";
    loadingPopup.style.display = "none"; // Ensure the loading popup is hidden on load

    // Set initial placeholder as *
    otpBoxes.forEach((box, index) => {
        box.placeholder = "*"; // Set initial placeholder

        // Update box to show entered value and move to the next box
        box.addEventListener("input", (e) => {
            if (e.target.value.length === 1) {
                if (index < otpBoxes.length - 1) {
                    otpBoxes[index + 1].focus();
                }
            }
        });

        // Handle backspace key to move focus back and clear input
        box.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" && box.value === "" && index > 0) {
                otpBoxes[index - 1].focus();
            }
        });
    });

    // Function to collect OTP from all boxes
    function collectOtp() {
        return Array.from(otpBoxes).map(box => box.value).join("");
    }

    // Function to show OTP popup and reset its state
    function showOtpPopup() {
        otpVerificationPopup.style.display = "flex";
        otpVerificationPopup.querySelector(".failure-mark").style.display = "none"; // Hide failure mark
        otpBoxes.forEach(box => box.value = ""); // Clear previous OTP inputs
    }

    // Updated login functionality
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        isForgotPasswordAction = false; // Set to false for login OTP flow
    
        const username = document.getElementById("admin-username").value.trim();
        const password = document.getElementById("admin-password").value.trim();
        const loginErrorPopup = document.getElementById("login-error-popup");
    
        // Validate login credentials without showing loading popup initially
        fetch("validate_login.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
        })
        .then(response => response.text())
        .then(data => {
            if (data === "success") {
                // Show loading popup only if credentials are correct
                loadingPopup.style.display = "flex";
                loadingPopup.classList.remove("success", "failure"); // Reset any previous success/failure state
                loadingPopup.querySelector(".loading-spinner").style.display = "block"; // Show spinner initially
                loadingPopup.querySelector(".checkmark").style.display = "none"; // Hide checkmark initially
    
                // Send OTP if login is successful
                fetch("send_login_otp.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: `username=${encodeURIComponent(username)}`
                })
                .then(response => response.text())
                .then(otpData => {
                    loadingPopup.querySelector(".loading-spinner").style.display = "none"; // Hide spinner
    
                    if (otpData.includes("OTP sent")) {
                        // Show checkmark after OTP is sent
                        loadingPopup.classList.add("success");
                        loadingPopup.querySelector(".checkmark").style.display = "block"; // Show checkmark
    
                        setTimeout(() => {
                            loadingPopup.style.display = "none"; // Hide loading popup after showing checkmark
                            loadingPopup.classList.remove("success"); // Remove checkmark for future use
                            showOtpPopup(); // Show OTP input popup for login
                        }, 1000); // Adjust timing as needed
                    } else {
                        loadingPopup.style.display = "none";
                        console.error("Failed to send login OTP. Please try again.");
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    loadingPopup.style.display = "none"; // Hide loading popup on error
                });
            } else {
                // If credentials are incorrect, show the error popup
                document.getElementById("login-error-message").textContent = "Invalid username or password. Please try again.";
                loginErrorPopup.style.display = "flex";
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    });

    // Close the login error popup when the close button is clicked
    document.getElementById("close-login-error-popup").addEventListener("click", function () {
        document.getElementById("login-error-popup").style.display = "none";
    });

    // Open the Forgot Password Popup and set action flag
    forgotPasswordLink.addEventListener("click", function (e) {
        e.preventDefault();
        isForgotPasswordAction = true; // Set to true for forgot password OTP flow
        forgotPasswordPopup.style.display = "flex"; // Show the popup
    });

    // Close the Forgot Password Popup
    closePopupButton.addEventListener("click", function () {
        forgotPasswordPopup.style.display = "none"; // Hide the popup
        document.getElementById("otp-email").value = ""; // Clear the email field
    });

    // Handle sending OTP for forgot password
    sendOtpForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = document.getElementById("otp-email").value.trim();
        const errorPopup = document.getElementById("error-popup");
        const errorMessage = document.getElementById("error-message");
    
        // Show the loading popup
        loadingPopup.style.display = "flex";
        loadingPopup.classList.remove("success", "failure"); // Reset any previous state
    
        fetch("send_otp.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `email=${encodeURIComponent(email)}`
        })
        .then(response => response.json()) // Parse response as JSON
        .then(data => {
            loadingPopup.style.display = "none"; // Hide loading popup by default
    
            if (data.status === "success") {
                // Show loading popup with checkmark
                loadingPopup.style.display = "flex";
                loadingPopup.classList.add("success"); // Add success class to show checkmark
                loadingPopup.querySelector(".loading-spinner").style.display = "none"; // Hide spinner
    
                setTimeout(() => {
                    loadingPopup.style.display = "none"; // Hide loading popup after showing checkmark
                    loadingPopup.classList.remove("success"); // Reset success state
                    forgotPasswordPopup.style.display = "none";
                    showOtpPopup(); // Show OTP input popup
                }, 1000);
            } else if (data.status === "error") {
                // Display the error popup with the message
                errorMessage.textContent = data.message;
                errorPopup.style.display = "flex";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            loadingPopup.style.display = "none"; // Hide loading popup on error
        });
    });

    // Close the error popup when the close button is clicked
    document.getElementById("close-error-popup").addEventListener("click", function () {
        document.getElementById("error-popup").style.display = "none";
    });

    // Verify OTP for both login and forgot password
    verifyOtpForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const otp = collectOtp(); // Collect the OTP from all boxes
        console.log("Entered OTP:", otp); // Debug: Log the entered OTP before sending

        // Show the loading popup
        loadingPopup.style.display = "flex";

        const verificationUrl = isForgotPasswordAction 
            ? "verify_otp.php"    // For forgot password
            : "verify_login_otp.php";  // For login

        fetch(verificationUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `otp=${encodeURIComponent(otp)}`
        })
        .then(response => response.text())
        .then(data => {
            console.log("Verification response:", data); // Debug: Log the server response

            loadingPopup.style.display = "none"; // Hide loading popup by default

            if (data.includes("OTP verified")) {
                otpBoxes.forEach(box => box.value = ""); // Clear OTP input fields

                if (isForgotPasswordAction) {
                    otpVerificationPopup.style.display = "none";
                    changePasswordPopup.style.display = "flex"; // Show password change popup for forgot password
                } else {
                    window.location.href = "admin-dashboard.php"; // Redirect to dashboard for login
                }
            } else {
                // Show failure mark if OTP is invalid
                loadingPopup.classList.add("failure");

                // Display failure mark and message temporarily
                setTimeout(() => {
                    loadingPopup.style.display = "none"; // Hide loading popup after showing failure mark
                    loadingPopup.classList.remove("failure"); // Reset failure mark for future use
                    otpVerificationPopup.querySelector(".failure-mark").style.display = "block"; // Show failure mark in OTP popup
                }, 1000); // Adjust timing as needed
            }
        })
        .catch(error => {
            console.error("Error:", error);
            loadingPopup.style.display = "none";
        });
    });

    // Handle changing password
    changePasswordForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const newPassword = document.getElementById("new-password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // Show the loading popup
        loadingPopup.style.display = "flex";

        fetch("change_password.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `newPassword=${encodeURIComponent(newPassword)}`
        })
        .then(response => response.text())
        .then(data => {
            loadingPopup.style.display = "none";

            if (data.includes("Password reset successful")) {
                changePasswordPopup.style.display = "none";
            } else {
                console.error("Failed to reset password. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            loadingPopup.style.display = "none";
        });
    });

    // Close OTP Popup
    closeOtpPopupButton.addEventListener("click", function () {
        otpVerificationPopup.style.display = "none";
        otpBoxes.forEach(box => box.value = ""); // Clear OTP input fields when popup is closed
    });

    // Close Change Password Popup
    closeChangePasswordPopup.addEventListener("click", function () {
        changePasswordPopup.style.display = "none";
    });

    // Existing back button functionality
    backButton.addEventListener("click", function () {
        window.location.href = "homepage.html";
    });

    // Resend OTP functionality
    const resendOtpButton = document.getElementById("resend-otp-button");
    resendOtpButton.addEventListener("click", function () {
        // Show loading popup with spinner while processing resend
        loadingPopup.style.display = "flex";
        loadingPopup.classList.remove("success", "failure"); // Reset any previous success/failure state
        loadingPopup.querySelector(".loading-spinner").style.display = "block"; // Show spinner initially
        loadingPopup.querySelector(".checkmark").style.display = "none"; // Hide checkmark initially
        loadingPopup.querySelector(".failure-mark").style.display = "none"; // Hide failure mark initially

        // Disable the button for 30 seconds to prevent spamming
        resendOtpButton.disabled = true;
        setTimeout(() => resendOtpButton.disabled = false, 30000);

        const resendUrl = isForgotPasswordAction ? "send_otp.php" : "send_login_otp.php";

        fetch(resendUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: isForgotPasswordAction 
                ? `email=${encodeURIComponent(document.getElementById("otp-email").value)}`
                : `username=${encodeURIComponent(document.getElementById("admin-username").value)}`
        })
        .then(response => response.text())
        .then(data => {
            loadingPopup.querySelector(".loading-spinner").style.display = "none"; // Hide spinner

            if (data.includes("OTP sent")) {
                // Show success checkmark
                loadingPopup.classList.add("success");
                loadingPopup.querySelector(".checkmark").style.display = "block"; // Show checkmark
            } else {
                // Show failure X mark
                loadingPopup.classList.add("failure");
                loadingPopup.querySelector(".failure-mark").style.display = "block"; // Show failure mark
            }

            // Display the popup with checkmark/failure mark for a moment before hiding it
            setTimeout(() => {
                loadingPopup.style.display = "none";
                loadingPopup.classList.remove("success", "failure"); // Reset after displaying
                loadingPopup.querySelector(".checkmark").style.display = "none"; // Hide checkmark for future use
                loadingPopup.querySelector(".failure-mark").style.display = "none"; // Hide failure mark for future use
            }, 1000); // Adjust timing as needed
        })
        .catch(error => {
            console.error("Error:", error);
            loadingPopup.querySelector(".loading-spinner").style.display = "none"; // Hide spinner
            loadingPopup.classList.add("failure"); // Show failure X mark
            loadingPopup.querySelector(".failure-mark").style.display = "block"; // Show failure mark

            // Display failure for a moment before hiding
            setTimeout(() => {
                loadingPopup.style.display = "none";
                loadingPopup.classList.remove("failure"); // Reset after displaying
                loadingPopup.querySelector(".failure-mark").style.display = "none"; // Hide failure mark for future use
            }, 1000);
        });
    });
});
