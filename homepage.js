document.addEventListener('DOMContentLoaded', function () {
    const heroSection = document.querySelector('.hero-section');
    const navLinks = document.querySelectorAll('.nav-links li a');
    const logoText = document.querySelector('.logo-text');
    const hamMenus = document.querySelectorAll('.ham-menu span');

    // Hamburger menu elements
    const hamMenu = document.querySelector('.ham-menu');
    const offScreenMenu = document.querySelector('.off-screen-menu');
    const overlay = document.getElementById('overlay');

    // Function to apply white color when the hero section is in view
    function applyWhiteStyles() {
        navLinks.forEach(link => link.style.color = 'white');
        logoText.style.color = 'white';
        hamMenus.forEach(span => span.style.backgroundColor = 'white');
    }

    // Function to revert back to default colors when out of view
    function revertToDefaultStyles() {
        navLinks.forEach(link => link.style.color = '#282959'); // Replace with your default color
        logoText.style.color = '#282959'; // Replace with your default color
        hamMenus.forEach(span => span.style.backgroundColor = '#282959'); // Replace with your default color
    }

    // Function to detect scroll and apply styles based on hero-section visibility
    function handleScroll() {
        const heroPosition = heroSection.getBoundingClientRect();

        if (heroPosition.top <= 0 && heroPosition.bottom >= 0) {
            applyWhiteStyles(); // Change to white when hero-section is visible
        } else {
            revertToDefaultStyles(); // Revert when not visible
        }
    }

    // Run the scroll handler once on page load
    handleScroll();

    // Attach scroll event listener for color change
    window.addEventListener('scroll', handleScroll);

    // Hamburger menu toggle functionality
    hamMenu.addEventListener("click", (event) => {
        event.stopPropagation();
        offScreenMenu.classList.toggle("active");
        overlay.style.display = offScreenMenu.classList.contains("active") ? 'block' : 'none';
    });

    // Close menu if clicking on the overlay
    overlay.addEventListener("click", () => {
        offScreenMenu.classList.remove("active");
        overlay.style.display = 'none';
    });

    // Close menu if clicking anywhere outside the off-screen menu
    document.addEventListener("click", (event) => {
        if (!offScreenMenu.contains(event.target) && !hamMenu.contains(event.target)) {
            offScreenMenu.classList.remove("active");
            overlay.style.display = 'none';
        }
    });

    // Close menu if the Escape key is pressed
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            offScreenMenu.classList.remove("active");
            overlay.style.display = 'none';
        }
    });

    // Ensure off-screen menu closes when resizing window to larger screens
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            offScreenMenu.classList.remove("active");
            overlay.style.display = 'none';
        }
    });
});

let currentHeroSlide = 0;
const heroSlides = document.querySelectorAll('.carousel-item');

function showHeroSlide(index) {
    // Remove previous effects from all images
    heroSlides.forEach((slide, idx) => {
        const image = slide.querySelector('.carousel-image');
        if (idx === currentHeroSlide) {
            image.classList.remove('fade-in');
            image.classList.add('fade-out'); // Apply fade out on the current slide's image
        }
        slide.classList.remove('active');
    });

    // Set the new active slide
    heroSlides[index].classList.add('active');
    const newImage = heroSlides[index].querySelector('.carousel-image');
    newImage.classList.remove('fade-out');
    newImage.classList.add('fade-in'); // Apply fade in on the new slide's image

    currentHeroSlide = index;
}

function nextHeroSlide() {
    const nextIndex = (currentHeroSlide + 1) % heroSlides.length;
    showHeroSlide(nextIndex);
}

function prevHeroSlide() {
    const prevIndex = (currentHeroSlide - 1 + heroSlides.length) % heroSlides.length;
    showHeroSlide(prevIndex);
}

// Event listeners for navigation buttons
document.querySelector('.arrow.right').addEventListener('click', nextHeroSlide);
document.querySelector('.arrow.left').addEventListener('click', prevHeroSlide);

// Automatically switch slides every 5 seconds
setInterval(nextHeroSlide, 5000);

let currentServiceSlide = 0;
const serviceSlides = document.querySelectorAll('.box');

function showServiceSlide(index) {
    serviceSlides.forEach((slide, idx) => {
        slide.classList.remove('active');
        if (idx === index) {
            slide.classList.add('active');
        }
    });
}

function nextServiceSlide() {
    currentServiceSlide = (currentServiceSlide + 1) % serviceSlides.length;
    showServiceSlide(currentServiceSlide);
}

function prevServiceSlide() {
    currentServiceSlide = (currentServiceSlide - 1 + serviceSlides.length) % serviceSlides.length;
    showServiceSlide(currentServiceSlide);
}

document.getElementById('nextBtn').addEventListener('click', nextServiceSlide);
document.getElementById('prevBtn').addEventListener('click', prevServiceSlide);

// Optionally, automatically switch slides every 5 seconds
setInterval(nextServiceSlide, 5000);
document.addEventListener('DOMContentLoaded', function () {
    const heroSection = document.querySelector('#hero');
    const servicesSection = document.querySelector('#services');

    let heroAnimated = false;
    let servicesAnimated = false;

    // Function to add animations to child elements of a section
    function addAnimation(section) {
        const elementsToAnimate = section.querySelectorAll('.fade-slide, .button-bounce, .drop-down');
        elementsToAnimate.forEach(element => {
            element.classList.add('animate'); // Add a class to trigger animations
        });
    }

    // Function to check if a section is in the viewport
    function isSectionInView(section) {
        const rect = section.getBoundingClientRect();
        return rect.top <= window.innerHeight && rect.bottom >= 0;
    }

    // Scroll event handler to check visibility of sections
    function handleScroll() {
        if (isSectionInView(heroSection) && !heroAnimated) {
            addAnimation(heroSection); // Trigger animations for hero section
            heroAnimated = true; // Ensure animation triggers only once
        }

        if (isSectionInView(servicesSection) && !servicesAnimated) {
            addAnimation(servicesSection); // Trigger animations for services section
            servicesAnimated = true; // Ensure animation triggers only once
        }
    }

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on page load
});
document.addEventListener('DOMContentLoaded', function () {
    const heroSection = document.querySelector('#hero');
    const servicesSection = document.querySelector('#services');
    const diagnosticsSection = document.querySelector('.diagnostics-section');
    const diagnosticsImage = document.querySelector('.diagnostics-image img');
    
    const heroContent = document.querySelector('.hero-content');
    const infoBox = document.querySelector('.info-box');
    const slideshowContainer = document.querySelector('#slideshow-container');

    let heroAnimated = false;
    let servicesAnimated = false;
    let diagnosticsAnimated = false;
    let diagnosticsImageAnimated = false;
    let heroContentAnimated = false;
    let slideshowContainerAnimated = false;
    let infoBoxAnimated = false;

    // Function to reset animations
    function resetAnimation(element) {
        element.style.animation = 'none';
        element.offsetHeight; // Trigger reflow to reset animation
        element.style.animation = '';
    }

    // Function to add animations to child elements of a section
    function addAnimation(section) {
        const elementsToAnimate = section.querySelectorAll('.fade-slide, .button-bounce, .drop-down');
        elementsToAnimate.forEach(element => {
            resetAnimation(element);
            element.classList.add('animate'); // Add class to trigger animation
        });
    }

    // Function to animate specific elements like hero content, info box, and slideshow container
    function animateElement(element) {
        resetAnimation(element);
        element.classList.add('animate'); // Add class to trigger specific element animation
    }

    // Modified function to check if 1/4 of a section is visible in the viewport
    function isSectionInView(section) {
        const rect = section.getBoundingClientRect();
        return rect.top <= window.innerHeight * 0.75 && rect.bottom >= window.innerHeight * 0.25;
    }

    // Function to check if an element (like diagnostics image, hero content, slideshow, or info box) is in the viewport
    function isElementInView(element) {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom >= 0;
    }

    // Scroll event handler to check visibility of sections
    function handleScroll() {
        if (isSectionInView(heroSection) && !heroAnimated) {
            addAnimation(heroSection);
            heroAnimated = true;
        }

        if (isSectionInView(servicesSection) && !servicesAnimated) {
            addAnimation(servicesSection);
            servicesAnimated = true;
        }

        if (isSectionInView(diagnosticsSection) && !diagnosticsAnimated) {
            addAnimation(diagnosticsSection);
            diagnosticsAnimated = true;
        }

        // Specifically animate diagnostics image
        if (isElementInView(diagnosticsImage) && !diagnosticsImageAnimated) {
            animateElement(diagnosticsImage);
            diagnosticsImageAnimated = true;
        }

        // Specifically animate hero content and info box together
        if (isElementInView(heroContent) && !heroContentAnimated) {
            animateElement(heroContent);
            animateElement(infoBox);
            heroContentAnimated = true;
            infoBoxAnimated = true;
        }

        // Specifically animate slideshow container
        if (isElementInView(slideshowContainer) && !slideshowContainerAnimated) {
            animateElement(slideshowContainer);
            slideshowContainerAnimated = true;
        }
    }

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on page load
});