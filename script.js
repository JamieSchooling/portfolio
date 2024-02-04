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

const projectSection = document.querySelector(".project");
const imageTrack = document.querySelector(".image-track");
let mouseDownAt = 0;
let percentage = 50;
let lastPercentage = percentage;
imageTrack.style.transform = `translate(${-percentage}%, 0%)`;
updateImageParallax(percentage);
projectSection.addEventListener("mousedown", e => {
    mouseDownAt = e.clientX;
});
projectSection.addEventListener("touchstart", e => {
    mouseDownAt = e.touches[0].pageX;
});
projectSection.addEventListener("mousemove", e => {
    
    if (mouseDownAt === 0) return;

    const mouseDelta = mouseDownAt - e.clientX;
    const maxDelta = window.innerWidth / 2;

    percentage = (mouseDelta / maxDelta) * 100;
    percentage += lastPercentage;
    percentage = Math.max(percentage, 0);
    percentage = Math.min(percentage, 100);
    updateImageParallax(percentage);
    imageTrack.style.transform = `translate(${-percentage}%, 0%)`;
});
projectSection.addEventListener("touchmove",  e => {    
    if (mouseDownAt === 0) return;

    const mouseDelta = mouseDownAt - e.touches[0].pageX;
    const maxDelta = window.innerWidth;

    percentage = (mouseDelta / maxDelta) * 100;
    percentage += lastPercentage;
    percentage = Math.max(percentage, 0);
    percentage = Math.min(percentage, 100);
    updateImageParallax(percentage);
    imageTrack.style.transform = `translate(${-percentage}%, 0%)`;
});
projectSection.addEventListener("mouseup", e => {
    mouseDownAt = 0;
    lastPercentage = percentage;
});

projectSection.addEventListener("touchend", e => {
    mouseDownAt = 0;
    lastPercentage = percentage;
})

function updateImageParallax(percentage) {
    for (const image of imageTrack.getElementsByClassName("project-image")) {
        image.style.objectPosition = `${percentage}%`
    }
}



const openModalButtons = document.querySelectorAll("[data-modal-target]");
const overlay = document.getElementById("overlay");

const clickTime = 200;
let lastClickTimestamp = 0;
openModalButtons.forEach(button => {
    button.addEventListener("mousedown", event => {
        lastClickTimestamp = event.timeStamp;
    });
    button.addEventListener("touchstart", event => {
        lastClickTimestamp = event.timeStamp;
    });
    button.addEventListener("mouseup", event => {
        console.log("here");
        if (event.timeStamp - lastClickTimestamp <= clickTime) {
            const modal = document.querySelector(button.dataset.modalTarget);
            openModal(modal);
        }
    });
    button.addEventListener("touchend", event => {
        if (event.timeStamp - lastClickTimestamp <= clickTime) {
            const modal = document.querySelector(button.dataset.modalTarget);
            openModal(modal);
        }
    });
});

overlay.addEventListener("click", () => {
    const modals = document.querySelectorAll(".modal.active");
    modals.forEach(modal => {
        closeModal(modal);
    })
});

function openModal(modal) {
    if (modal === null) return;
    modal.classList.add("active");
    overlay.classList.add("active");
}

function closeModal(modal) {
    if (modal === null) return;
    modal.classList.remove("active");
    overlay.classList.remove("active");
}
