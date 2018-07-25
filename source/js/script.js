var navMain = document.querySelector(".header__nav");
var navToggle = document.querySelector(".header__toggle");

if (navToggle.classList.contains("header__toggle--nojs")) {
  navToggle.classList.remove("header__toggle--nojs");
};

if (navMain.classList.contains("header__nav--nojs")) {
  navMain.classList.remove("header__nav--open");
  navMain.classList.add("header__nav--closed");
  navMain.classList.remove("header__nav--nojs");
};

navToggle.addEventListener("click", function () {
  if (navMain.classList.contains("header__nav--closed")) {
    navMain.classList.remove("header__nav--closed");
    navMain.classList.add("header__nav--open");
  } else {
    navMain.classList.add("header__nav--closed");
    navMain.classList.remove("header__nav--open");
  }
});
