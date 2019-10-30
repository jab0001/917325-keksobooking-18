'use strict';

(function () {
  window.mapFilters = document.querySelectorAll('.map__filter');
  window.mapFeatures = document.querySelector('.map__features');
  window.mapFormInputs = document.querySelectorAll('.ad-form__element');
  window.mapFormAvatarUpload = document.querySelector('.ad-form-header');
  window.map = document.querySelector('.map');
  window.form = document.querySelector('.ad-form');
  window.mapPins = window.map.querySelector('.map__pins');
  window.mapPinMain = window.mapPins.querySelector('.map__pin--main');
  window.addressCoordinate = document.querySelector('input[name="address"]');
  window.cardTemplateError = document.querySelector('#error')
    .content
    .querySelector('.error');

  window.getAdressOfMark = function () {
    var mapPinLeft = +(window.mapPinMain.style.left.replace('px', ''));
    var mapPinTop = +(window.mapPinMain.style.top.replace('px', ''));
    var mapPinX = Math.round(mapPinLeft + window.mapPinMain.offsetWidth / 2);
    var mapPinY = Math.round(mapPinTop + (window.mapPinMain.offsetHeight + window.PIN_HEIGHT));
    window.addressCoordinate.value = mapPinX + 'px, ' + mapPinY + 'px';
    window.addressCoordinate.setAttribute('disabled', true);
  };

  var activateFields = function (select) {
    for (var k = 0; k < select.length; k++) {
      select[k].removeAttribute('disabled');
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
    window.mapPins.appendChild(window.renderPins(window.objects));
    var pinButtons = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pinButtons.forEach(function (elem) {
      elem.addEventListener('mousedown', window.mapOfferSearchForMousedown);
      elem.addEventListener('keydown', window.mapOfferSearchForKeydown);
    });
  };

  window.makePageActive = function () {
    window.renderOffers(window.NonFilteredOffers);
    window.map.classList.remove('map--faded');
    window.form.classList.remove('ad-form--disabled');
    window.mapFormAvatarUpload.removeAttribute('disabled');
    activateFields(window.mapFilters);
    activateFields(window.mapFormInputs);
    window.mapFeatures.removeAttribute('disabled');
    window.makePinsActive();
    window.mapPinMain.removeEventListener('mousedown', window.mapPinActiveOnMousedown);
    window.mapPinMain.removeEventListener('keydown', window.mapPinActiveOnKeydown);
    window.startListeners();
  };

  window.mapPinActiveOnMousedown = function (evt) {
    evt.preventDefault();
    window.makePageActive();
    window.getAdressOfMark();
  };

  window.mapPinActiveOnKeydown = function (evt) {
    if (evt.keyCode === window.Key.ENTER) {
      window.makePageActive();
      window.getAdressOfMark();
    }
  };

  window.mapPinMain.addEventListener('mousedown', window.mapPinActiveOnMousedown);
  window.mapPinMain.addEventListener('keydown', window.mapPinActiveOnKeydown);

})();
