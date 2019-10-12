'use strict';

(function () {
  window.mapPin = document.querySelector('.map__pin--main');
  var mapSelects = document.getElementsByTagName('select');
  var mapFieldsets = document.getElementsByTagName('fieldset');
  window.mapItem = document.querySelector('.map');
  var formItem = document.querySelector('.ad-form');
  window.pinContainerElem = window.mapItem.querySelector('.map__pins');
  var addressCoordinate = document.querySelector('input[name="address"]');

  window.getAdressOfMark = function () {
    var mapPinLeft = +(window.mapPin.style.left.replace('px', ''));
    var mapPinTop = +(window.mapPin.style.top.replace('px', ''));
    var mapPinX = Math.round(mapPinLeft + window.mapPin.offsetWidth / 2);
    var mapPinY = Math.round(mapPinTop + (window.mapPin.offsetHeight + window.PIN_HEIGHT));
    addressCoordinate.value = mapPinX + 'px, ' + mapPinY + 'px';
    addressCoordinate.setAttribute('disabled', true);
  };

  var makePageActive = function () {
    window.mapItem.classList.remove('map--faded');
    formItem.classList.remove('ad-form--disabled');
    window.activateFieldsets(mapSelects);
    window.activateSelects(mapFieldsets);
    window.pinContainerElem.appendChild(window.renderPins(window.objects));
    for (var k = 1; k < window.mapPinOffer.length; k++) {
      window.mapPinOffer[k].addEventListener('mousedown', window.mapOfferSearchForMousedown);
      window.mapPinOffer[k].addEventListener('keydown', window.mapOfferSearchForKeydown);
    }
    window.mapPin.removeEventListener('mousedown', mapPinActiveOnMousedown);
    window.mapPin.removeEventListener('keydown', mapPinActiveOnKeydown);
  };

  var mapPinActiveOnMousedown = function (evt) {
    evt.preventDefault();
    makePageActive();
    window.getAdressOfMark();
  };

  var mapPinActiveOnKeydown = function (evt) {
    if (evt.keyCode === window.key.ENTER) {
      makePageActive();
      window.getAdressOfMark();
    }
  };

  window.mapPin.addEventListener('mousedown', mapPinActiveOnMousedown);
  window.mapPin.addEventListener('keydown', mapPinActiveOnKeydown);

})();
