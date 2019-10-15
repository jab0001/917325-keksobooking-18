'use strict';

(function () {
  window.mapSelects = document.getElementsByTagName('select');
  window.mapFieldsets = document.getElementsByTagName('fieldset');
  window.mapItem = document.querySelector('.map');
  window.formItem = document.querySelector('.ad-form');
  window.pinContainerElem = window.mapItem.querySelector('.map__pins');
  window.mapPin = window.pinContainerElem.querySelector('.map__pin--main');
  window.addressCoordinate = document.querySelector('input[name="address"]');
  window.cardTemplateError = document.querySelector('#error')
    .content
    .querySelector('.error');
  window.removeDupedOffer = window.mapItem.getElementsByTagName('article');

  window.getAdressOfMark = function () {
    var mapPinLeft = +(window.mapPin.style.left.replace('px', ''));
    var mapPinTop = +(window.mapPin.style.top.replace('px', ''));
    var mapPinX = Math.round(mapPinLeft + window.mapPin.offsetWidth / 2);
    var mapPinY = Math.round(mapPinTop + (window.mapPin.offsetHeight + window.PIN_HEIGHT));
    window.addressCoordinate.value = mapPinX + 'px, ' + mapPinY + 'px';
    window.addressCoordinate.setAttribute('disabled', true);
  };

  var activateSelects = function (select) {
    for (var k = 0; k < select.length; k++) {
      select[k].removeAttribute('disabled');
    }
  };

  var activateFieldsets = function (fieldset) {
    for (var k = 0; k < fieldset.length; k++) {
      fieldset[k].removeAttribute('disabled');
    }
  };

  var makePageActive = function () {
    window.mapItem.classList.remove('map--faded');
    window.formItem.classList.remove('ad-form--disabled');
    activateFieldsets(window.mapSelects);
    activateSelects(window.mapFieldsets);
    window.pinContainerElem.appendChild(window.renderPins(window.objects));
    for (var k = 1; k < window.mapPinOffer.length; k++) {
      window.mapPinOffer[k].addEventListener('mousedown', window.mapOfferSearchForMousedown);
      window.mapPinOffer[k].addEventListener('keydown', window.mapOfferSearchForKeydown);
    }
    window.mapPin.removeEventListener('mousedown', mapPinActiveOnMousedown);
    window.mapPin.removeEventListener('keydown', mapPinActiveOnKeydown);
    window.startValidityListeners();
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

  var onError = function (message) {
    var error = window.cardTemplateError.cloneNode(true);
    error.querySelector('.error__message').textContent = message;
    document.body.insertAdjacentElement('afterbegin', error);
  };

  var onSuccess = function (data) {
    window.objects = [];
    for (var i = 0; i < window.OFFER_AMOUNTS; i++) {
      window.objects.push(data[i]);
    }
  };

  window.load(onSuccess, onError);
})();
