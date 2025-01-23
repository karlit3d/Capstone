let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const aboutLink = document.querySelector('#about-link');
const aboutLinkNav = document.querySelector('#about-link-nav');
const homeLinks = document.querySelectorAll('a[href="#top"]'); // Select all "Home" links
const heroSection = document.querySelector('#hero');

const hamMenus = document.querySelectorAll('.ham-menu'); // Select all ham-menus
const offScreenMenu = document.querySelector('.off-screen-menu');
const body = document.body;

// Add event listener to all ham-menu elements
hamMenus.forEach(hamMenu => {
    hamMenu.addEventListener("click", () => {
        hamMenu.classList.toggle("active");
        offScreenMenu.classList.toggle("active");
        body.classList.toggle("hide-learn-more");
    });
});

// Automatically close the off-screen menu after a link is clicked
offScreenMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        offScreenMenu.classList.remove('active');
        hamMenus.forEach(hamMenu => hamMenu.classList.remove('active')); // Ensure the hamburger icon returns to its original state
        body.classList.remove("hide-learn-more"); // Reset the body state
    });
});

// Add bounce animation when the "Home" link is clicked
homeLinks.forEach(homeLink => {
    homeLink.addEventListener('click', () => {
        document.documentElement.scrollTop = 0; // Scroll to the top
        document.body.scrollTop = 0; // For Safari
        heroSection.classList.add('bounce');
        setTimeout(() => {
            heroSection.classList.remove('bounce');
        }, 1000); // Remove the animation class after it completes
    });
});

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        slide.classList.remove('blink');
        slide.classList.remove('fade-in');
        slide.classList.remove('fade-out');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    slides[currentSlide].classList.add('fade-out');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('fade-in');
    setTimeout(() => showSlide(currentSlide), 500);
}

function prevSlide() {
    slides[currentSlide].classList.add('fade-out');
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    slides[currentSlide].classList.add('fade-in');
    setTimeout(() => showSlide(currentSlide), 500);
}

// Removed the bounce effect for the "About Us" link

// Make the header in the hero section fixed on scroll
document.addEventListener('scroll', function () {
    const heroPosition = heroSection.getBoundingClientRect().top;

    if (heroPosition <= 0 && heroPosition > -heroSection.offsetHeight) {
        heroSection.classList.add('in-view');
    } else {
        heroSection.classList.remove('in-view');
    }
});

function showService(serviceId) {
    const services = document.querySelectorAll('.service-content');
    const buttons = document.querySelectorAll('.service-button');

    services.forEach(service => {
        service.style.display = 'none'; // Hide all services
    });

    buttons.forEach(button => {
        button.classList.remove('active'); // Remove active class from all buttons
    });

    const activeService = document.getElementById(serviceId);
    const activeButton = document.querySelector(`.service-button[onclick="showService('${serviceId}')"]`);

    if (activeService) {
        activeService.style.display = 'flex'; // Show the selected service
        activeButton.classList.add('active'); // Highlight the clicked button
    }
}
