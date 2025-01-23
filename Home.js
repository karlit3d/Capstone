let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');

const hamMenu = document.querySelector('.ham-menu');
const offScreenMenu = document.querySelector('.off-screen-menu');
const learnMoreButton = document.querySelector('.learn-more');
const body = document.body;

hamMenu.addEventListener("click", () => {
    hamMenu.classList.toggle("active");
    offScreenMenu.classList.toggle("active");
    body.classList.toggle("hide-learn-more");
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
