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

  window.renderOffers = function (data) {
    window.objects = [];
    for (var i = 0; i < data.length; i++) {
      window.objects.push(data[i]);
    }
    return window.objects;
  };

  window.makePinsActive = function () {
    window.pinContainerElem.appendChild(window.renderPins(window.objects));
    var pinButtons = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pinButtons.forEach(function (elem) {
      elem.addEventListener('mousedown', window.mapOfferSearchForMousedown);
      elem.addEventListener('keydown', window.mapOfferSearchForKeydown);
    });
  };

  var makePageActive = function () {
    window.mapItem.classList.remove('map--faded');
    window.formItem.classList.remove('ad-form--disabled');
    activateFieldsets(window.mapSelects);
    activateSelects(window.mapFieldsets);
    window.makePinsActive();
    window.mapPin.removeEventListener('mousedown', window.mapPinActiveOnMousedown);
    window.mapPin.removeEventListener('keydown', window.mapPinActiveOnKeydown);
    window.startValidityListeners();
  };

  window.mapPinActiveOnMousedown = function (evt) {
    evt.preventDefault();
    makePageActive();
    window.getAdressOfMark();
  };

  window.mapPinActiveOnKeydown = function (evt) {
    if (evt.keyCode === window.Key.ENTER) {
      makePageActive();
      window.getAdressOfMark();
    }
  };

  window.mapPin.addEventListener('mousedown', window.mapPinActiveOnMousedown);
  window.mapPin.addEventListener('keydown', window.mapPinActiveOnKeydown);

})();
