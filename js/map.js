'use strict';

(function () {
  var mapFilters = document.querySelectorAll('.map__filter');
  var filters = document.querySelector('.map__filters');
  var mapFeatures = document.querySelector('.map__features');
  var mapFormInputs = document.querySelectorAll('.ad-form__element');
  var mapFormAvatarUpload = document.querySelector('.ad-form-header');
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var mapPins = map.querySelector('.map__pins');
  var mapPinMain = mapPins.querySelector('.map__pin--main');
  var addressCoordinate = document.querySelector('input[name="address"]');
  var cardTemplateError = document.querySelector('#error')
    .content
    .querySelector('.error');

  var getAdressOfMark = function () {
    var mapPinLeft = +(mapPinMain.style.left.replace('px', ''));
    var mapPinTop = +(mapPinMain.style.top.replace('px', ''));
    var mapPinX = Math.round(mapPinLeft + mapPinMain.offsetWidth / 2);
    var mapPinY = Math.round(mapPinTop + (mapPinMain.offsetHeight + window.const.pinHeight));
    addressCoordinate.value = mapPinX + 'px, ' + mapPinY + 'px';
    addressCoordinate.setAttribute('disabled', true);
  };

  var activateFields = function (selects) {
    selects.forEach(function (select) {
      select.removeAttribute('disabled');
    });
  };

  var renderOffers = function (offers) {
    window.objects = [];
    offers.forEach(function (offer) {
      window.objects.push(offer);
    });
    return window.objects;
  };

  var makePinsActive = function () {
    mapPins.appendChild(window.pins.render(window.objects.slice(0, window.const.offerAmounts)));
    var pinButtons = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pinButtons.forEach(function (pinButton) {
      pinButton.addEventListener('mousedown', window.cards.onMousedownOffer);
      pinButton.addEventListener('keydown', window.cards.onKeydownOffer);
    });
  };

  var makePageActive = function () {
    renderOffers(window.offers);
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    filters.classList.remove('map__filters--disabled');
    mapFormAvatarUpload.removeAttribute('disabled');
    activateFields(mapFilters);
    activateFields(mapFormInputs);
    mapFeatures.removeAttribute('disabled');
    makePinsActive();
    mapPinMain.removeEventListener('mousedown', onMapPinMousedown);
    mapPinMain.removeEventListener('keydown', onMapPinKeydown);
    window.form.startListeners();
  };

  var onMapPinMousedown = function (evt) {
    evt.preventDefault();
    makePageActive();
    getAdressOfMark();
  };

  var onMapPinKeydown = function (evt) {
    if (evt.keyCode === window.const.key.ENTER) {
      makePageActive();
      getAdressOfMark();
    }
  };

  mapPinMain.addEventListener('mousedown', onMapPinMousedown);
  mapPinMain.addEventListener('keydown', onMapPinKeydown);

  var onError = function (message) {
    var error = cardTemplateError.cloneNode(true);
    error.querySelector('.error__message').textContent = message;
    document.body.insertAdjacentElement('afterbegin', error);
  };

  var onSuccess = function (data) {
    window.offers = data;
    window.filters.getOffers();
    window.pins.remove(mapPins.querySelectorAll('.map__pin:not(.map__pin--main)'));
  };

  window.backend.load(onSuccess, onError);

  window.map = {
    pinsArea: map,
    form: form,
    filter: filters,
    onMousedownPinActive: onMapPinMousedown,
    onKeydownPinActive: onMapPinKeydown,
    pinMain: mapPinMain,
    adressOfMark: getAdressOfMark,
    makePinsActive: makePinsActive,
    pins: mapPins,
    renderOffers: renderOffers,
    formAvatarUpload: mapFormAvatarUpload,
    filterFields: mapFilters,
    formInputs: mapFormInputs,
    features: mapFeatures,
    addressCoordinate: addressCoordinate,
    cardTemplateError: cardTemplateError
  };
})();
