const menu = document.querySelector(".menu-links");
const icon = document.querySelector(".mobile-menu-icon");
function toggleMenu() {
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

const scrollElements = document.querySelectorAll(".js-scroll");

function elementInView(element) {
    const elementTop = element.getBoundingClientRect().top;
    return elementTop <= (window.innerHeight || document.documentElement.clientHeight);
}

function displayScrollElement(element) {
    element.classList.add("scrolled");
}
function hideScrollElement(element) {
    element.classList.remove("scrolled");
}

function handleScrollAnimation() {
    scrollElements.forEach(element => {
        if (elementInView(element)) {
            displayScrollElement(element);
        }
        else {
            hideScrollElement(element);
        }
    });
}
handleScrollAnimation();

window.addEventListener('scroll', () => {
    handleScrollAnimation();
});