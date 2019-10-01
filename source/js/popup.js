var popupButtons = document.querySelectorAll(".js-modal-cart"),
    popup = document.querySelector(".modal"),
    popupFog = document.querySelector(".fog");


window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popup.classList.contains("modal--active")) {
      popup.classList.remove("modal--active");
      popupFog.classList.remove("fog--active");
    }
  }
});

popupFog.addEventListener("click", function (evt) {
  evt.preventDefault();
    if (popup.classList.contains("modal--active")) {
      popup.classList.remove("modal--active");
      popupFog.classList.remove("fog--active");
  }
});


for (var i = 0; i < popupButtons.length; i++){
  popupButtons[i].addEventListener("click", function (event) {
    event.preventDefault();
    popup.classList.add("modal--active");
    popupFog.classList.add("fog--active");
  }
)};
