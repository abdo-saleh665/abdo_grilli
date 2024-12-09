'use strict';



/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});

/**
 * Meals Time
 */

const mealTypeDropdown = document.getElementById('mealType');
const timeDropdown = document.getElementById('timeDropdown');

const mealTimes = {
  breakfast: [
    { value: '08:30am', text: '8:30 AM' },
    { value: '09:00am', text: '9:00 AM' },
    { value: '09:30am', text: '9:30 AM' },
    { value: '10:00am', text: '10:00 AM' },
    { value: '10:30am', text: '10:30 AM' },
    { value: '11:00am', text: '11:00 AM' },
  ],
  lunch: [
    { value: '01:30pm', text: '1:30 PM' },
    { value: '02:00pm', text: '2:00 PM' },
    { value: '02:30pm', text: '2:30 PM' },
    { value: '03:00pm', text: '3:00 PM' },
    { value: '03:30pm', text: '3:30 PM' },
    { value: '04:00pm', text: '4:00 PM' },
    { value: '05:00pm', text: '5:00 PM' },
  ],
  dinner: [
    { value: '06:00pm', text: '6:00 PM' },
    { value: '06:30pm', text: '6:30 PM' },
    { value: '07:00pm', text: '7:00 PM' },
    { value: '07:30pm', text: '7:30 PM' },
    { value: '08:00pm', text: '8:00 PM' },
    { value: '08:30pm', text: '8:30 PM' },
    { value: '09:00pm', text: '9:00 PM' },
    { value: '09:30pm', text: '9:30 PM' },
    { value: '10:00pm', text: '10:00 PM' },
  ],
};

mealTypeDropdown.addEventListener('change', (event) => {
  const selectedMeal = event.target.value;

  // Clear existing time options
  timeDropdown.innerHTML = '<option value="" disabled selected>Select Time</option>';

  // Populate new options based on selected meal
  if (mealTimes[selectedMeal]) {
    mealTimes[selectedMeal].forEach((time) => {
      const option = document.createElement('option');
      option.value = time.value;
      option.textContent = time.text;
      timeDropdown.appendChild(option);
    });
  }
});
