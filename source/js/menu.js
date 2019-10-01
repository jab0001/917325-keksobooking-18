var menuButton = document.querySelector(".main-nav__toggle"),
    menu = document.querySelector(".main-nav");

document.addEventListener("DOMContentLoaded", function (evt) {
  evt.preventDefault();
  menu.classList.remove("main-nav--no-js");
  menu.classList.add("main-nav--closed");
});


menuButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  menu.classList.toggle("main-nav--opened");
});
