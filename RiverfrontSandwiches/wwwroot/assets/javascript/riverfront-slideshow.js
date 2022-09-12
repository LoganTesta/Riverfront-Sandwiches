/*Start of Slideshow */
let currentSlide;
let slideshowCounter = 0;
let paused = false;
let updateSlideSettings = true;
let currentSlideNumber = 0;
const maxSlideNumber = 3;
let pausePlayButton;
let slideshowHeader;
let slide0 = new Image(600, 400);
slide0.src = "../assets/images/food/grilled-cheese-sandwich-outside-in-sun.jpg";
let slide1 = new Image(600, 400);
slide1.src = "../assets/images/beverages/strawberry-smoothie.jpg";
let slide2 = new Image(600, 400);
slide2.src = "../assets/images/food/ham-sandwich-white-background.jpg";
let slide3 = new Image(600, 400);
slide3.src = "../assets/images/beverages/green-smoothie.jpg";

let slideButton0 = document.getElementById('slideButton0');
let slideButton1 = document.getElementById('slideButton1');
let slideButton2 = document.getElementById('slideButton2');
let slideButton3 = document.getElementById('slideButton3');

slideButtons = new Array(slideButton0, slideButton1, slideButton2, slideButton3);

for (let i = 0; i < maxSlideNumber + 1; i++) {
    slideButtons[i].addEventListener('click', function () {
        setSlide(i);
    }, false);
}

let backIcon = document.getElementsByClassName("slideshow__icon")[0];
let forwardIcon = document.getElementsByClassName("slideshow__icon")[1];

backIcon.addEventListener('click', function () {
    setSlide(currentSlideNumber - 1);
}, false);

forwardIcon.addEventListener('click', function () {
    setSlide(currentSlideNumber + 1);
}, false);



function init() {
    currentSlide = document.getElementsByClassName("slideshow__image")[0];
    slideshowHeader = document.getElementsByClassName("slideshow__header")[0];
    pausePlayButton = document.getElementById("pausePlayButton");
    currentSlide.style.opacity = 0;
    setInterval(function () {
        runFunctions();
    }, 10);
}
window.onload = init();


function runFunctions() {
    runSlideShow();
}

function runSlideShow() {

    if (paused === false) {
        if (slideshowCounter === 0) {
            currentSlide.style.opacity = 0.1;
        }
        if (slideshowCounter < 180) {
            currentSlide.style.opacity = parseFloat(currentSlide.style.opacity) + 0.005;
        }
        if (180 <= slideshowCounter && slideshowCounter < 680) {
            currentSlide.style.opacity = 1;
        }
        if (slideshowCounter >= 680) {
            currentSlide.style.opacity = parseFloat(currentSlide.style.opacity) - 0.005;
        }
        if (slideshowCounter >= 860) {
            slideshowCounter = 0;
            updateSlideSettings = true;
            currentSlide.style.opacity = 0.1;
            currentSlideNumber++;
        }

        if (currentSlideNumber < 0) {
            currentSlideNumber = maxSlideNumber;
        } else if (currentSlideNumber > maxSlideNumber) {
            currentSlideNumber = 0;
        }

        if (updateSlideSettings) {
            updateSlideSettings = false;
            for (let i = 0; i < maxSlideNumber + 1; i++) {
                slideButtons[i].classList.remove("active");
            }
            if (currentSlideNumber === 0) {
                slideshowHeader.innerHTML = "Our Grilled Cheese Sandwich";
                currentSlide.style.backgroundImage = "url(" + slide0.src + ")";
                slideButton0.classList.add("active");
            } else if (currentSlideNumber === 1) {
                slideshowHeader.innerHTML = "Fresh Strawberry Smoothies";
                currentSlide.style.backgroundImage = "url(" + slide1.src + ")";
                slideButton1.classList.add("active");
            } else if (currentSlideNumber === 2) {
                slideshowHeader.innerHTML = "Bold Ham Sandwich";
                currentSlide.style.backgroundImage = "url(" + slide2.src + ")";
                slideButton2.classList.add("active");
            } else if (currentSlideNumber === 3) {
                slideshowHeader.innerHTML = "Fruit and Veggie Smoothies";
                currentSlide.style.backgroundImage = "url(" + slide3.src + ")";
                slideButton3.classList.add("active");
            }
        }
        slideshowCounter++;
    }
}

function togglePausePlay() {
    paused = !paused;
    if (paused === false) {
        pausePlayButton.classList.remove("paused");
    } else if (paused) {
        pausePlayButton.classList.add("paused");
    }
}

let pausePlay = document.getElementById("pausePlayButton");
pausePlay.addEventListener("click", togglePausePlay, false);

function setSlide(slideNumber) {
    slideshowCounter = 50;
    currentSlideNumber = slideNumber;
    paused = false;
    pausePlayButton.classList.remove("paused");
    updateSlideSettings = true;
}



// Allow touch events to interact with slideshow.
let initialTouchX = 0;

let slideshowImage = document.getElementsByClassName("slideshow")[0];
slideshowImage.addEventListener("touchstart", getTouchCoords, false);
slideshowImage.addEventListener("touchend", getFinalTouchCoords, false);

function getTouchCoords(event) {
    let touchX = event.touches[0].clientX;
    let touchY = event.touches[0].clientY;

    initialTouchX = touchX;
}

function getFinalTouchCoords(event) {
    let finalTouchX = event.changedTouches[0].clientX;
    let finalTouchY = event.changedTouches[0].clientY;

    if (finalTouchX - initialTouchX > 80) {
        setSlide(currentSlideNumber - 1);
    } else if (initialTouchX - finalTouchX > 80) {
        setSlide(currentSlideNumber + 1);
    }
}


// Allow mouse dragging events to interact with slideshow.
slideshowImage.addEventListener("mousedown", getMouseDownCoords, false);
slideshowImage.addEventListener("mouseup", getMouseUpsCoords, false);
let mouseDown = false;

let initialMouseDownX = 0;

function getMouseDownCoords(event) {
    let mouseX = event.offsetX;
    initialMouseDownX = mouseX;
    slideshowImage.style.cursor = "grabbing";
}

function getMouseUpsCoords(event) {
    let mouseFinalX = event.offsetX;
    slideshowImage.style.cursor = "default";
    if (mouseFinalX - initialMouseDownX > 100) {
        setSlide(currentSlideNumber - 1);
    } else if (initialMouseDownX - mouseFinalX > 100) {
        setSlide(currentSlideNumber + 1);
    }
}
