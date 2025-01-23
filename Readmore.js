const hamMenu = document.querySelector('.ham-menu');
const offScreenMenu = document.querySelector('.off-screen-menu');
const overlay = document.getElementById('overlay');

hamMenu.addEventListener("click", () => {
    hamMenu.classList.toggle("active");
    offScreenMenu.classList.toggle("active");
    overlay.classList.toggle("active"); // Toggle the overlay on click
});

overlay.addEventListener("click", () => {
    hamMenu.classList.remove("active");
    offScreenMenu.classList.remove("active");
    overlay.classList.remove("active"); // Remove the overlay when clicked
});
document.addEventListener('DOMContentLoaded', function () {
    const infoItems = document.querySelectorAll('.info-item');

    function animateOnScroll() {
        infoItems.forEach((item) => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight && !item.classList.contains('animated')) {
                item.classList.add('animated'); // Prevent re-triggering
                item.style.opacity = 1; // Ensure visibility
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check on page load
});
