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
slideButton0.addEventListener('click', function () {
    setSlide(0);
}, false);
slideButton1.addEventListener('click', function () {
    setSlide(1);
}, false);
slideButton2.addEventListener('click', function () {
    setSlide(2);
}, false);
slideButton3.addEventListener('click', function () {
    setSlide(3);
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
            currentSlide.style.opacity = 0;
            updateSlideSettings = true;
        }
        if (slideshowCounter < 100) {
            currentSlide.style.opacity = parseFloat(currentSlide.style.opacity) + 0.01;
        }
        if (100 <= slideshowCounter && slideshowCounter < 600) {
            currentSlide.style.opacity = 1;
        }
        if (slideshowCounter >= 600) {
            currentSlide.style.opacity = parseFloat(currentSlide.style.opacity) - 0.01;
        }
        if (slideshowCounter >= 700) {
            slideshowCounter = 0;
            currentSlide.style.opacity = 0;
            currentSlideNumber++;
        }
        if (currentSlideNumber > maxSlideNumber) {
            currentSlideNumber = 0;
        }

        if (updateSlideSettings) {
            updateSlideSettings = false;
            if (currentSlideNumber === 0) {
                slideshowHeader.innerHTML = "Our Specialty Grilled Cheese Sandwich";
                currentSlide.style.backgroundImage = "url(" + slide0.src + ")";
                slideButton0.style.opacity = 1.0;
                slideButton1.style.opacity = 0.40;
                slideButton2.style.opacity = 0.40;
                slideButton3.style.opacity = 0.40;
            } else if (currentSlideNumber === 1) {
                slideshowHeader.innerHTML = "Fresh Strawberry Smoothies";
                currentSlide.style.backgroundImage = "url(" + slide1.src + ")";
                slideButton0.style.opacity = 0.40;
                slideButton1.style.opacity = 1.0;
                slideButton2.style.opacity = 0.40;
                slideButton3.style.opacity = 0.40;
            } else if (currentSlideNumber === 2) {
                slideshowHeader.innerHTML = "Bold Ham Sandwich";
                currentSlide.style.backgroundImage = "url(" + slide2.src + ")";
                slideButton0.style.opacity = 0.40;
                slideButton1.style.opacity = 0.40;
                slideButton2.style.opacity = 1.0;
                slideButton3.style.opacity = 0.40;
            } else if (currentSlideNumber === 3) {
                slideshowHeader.innerHTML = "Fresh Green Fruit and Veggie Smoothies";
                currentSlide.style.backgroundImage = "url(" + slide3.src + ")";
                slideButton0.style.opacity = 0.40;
                slideButton1.style.opacity = 0.40;
                slideButton2.style.opacity = 0.40;
                slideButton3.style.opacity = 1.0;
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
    updateSlideSettings = true;
}
