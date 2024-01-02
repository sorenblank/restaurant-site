"use strict";


// PRELOAD
// loading will end after document is loaded

const preloader = document.querySelector("[data-preload]");

window.addEventListener("load", () => {
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
});


// EVENT LISTENERS ON MULTIPLE ELEMENTS

const addEventOnElements = function(elements,eventType,callback){
    for (let i=0, len = elements.length;i < len; i++ ){
        elements[i].addEventListener(eventType,callback);
    }
}; 


// NAVBAR

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");


const toggleNavbar = function(){
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("active");  
    
    // Added by github.com/hh-abir
    document.body.classList.toggle("navbar-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);

// Added by github.com/hh-abir
const navbarLinks = document.querySelectorAll(".navbar-item a");
for (const link of navbarLinks) {
  link.addEventListener("click", function(event) {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("navbar-active");
  });
}


// HEADER HIDE AND BACK TO TOP BUTTON
const header = document.querySelector("[data-header]");
const backToTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;


const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  // Updated by github.com/hh-abir
  if (isScrollBottom && !navbar.classList.contains("active")) {
    header.classList.add("hide");
    backToTopBtn.classList.add("active");
  } else {
    header.classList.remove("hide");
    backToTopBtn.classList.remove("active");
  }

  lastScrollPos = window.scrollY;
};

// Added by github.com/hh-abir
document.body.addEventListener("touchmove", function (e) {
  if (document.body.classList.contains("navbar-active")) {
    e.preventDefault();
    
  }
});


window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
  }
});


// HERO SLIDER

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSliderPos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function(){
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSliderPos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSliderPos];
};

const slideNext = function(){
  if (currentSliderPos === heroSliderItems.length - 1){
    currentSliderPos = 0;
  } else {
    currentSliderPos++;
  }
  updateSliderPos();
};


const slidePrev = function(){
  if (currentSliderPos === 0){
    currentSliderPos = heroSliderItems.length - 1;
  } else {
    currentSliderPos--;
  }
  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);
heroSliderPrevBtn.addEventListener("click", slidePrev);


// HERO SLIDER AUTOPLAY

let autoSlideInterval;

const autoSlide = function(){
  autoSlideInterval = setInterval(slideNext, 7000);
};

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", () => {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);


// PARALLAX EFFECT

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function(e){
  x = (e.clientX/ window.innerWidth * 10) - 5;
  y = (e.clientY/ window.innerHeight * 10) - 5;


  x = x - (x*2);
  y = y - (y*2);

  for (let i=0, len = parallaxItems.length; i < len; i++){
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }
});



