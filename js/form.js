'use strict';

(function () {
  var roomsNumber = document.querySelector('select[name="rooms"]');
  var capacityNumber = document.querySelector('select[name="capacity"]');
  var placeType = document.querySelector('select[name="type"]');
  var inputPrice = document.querySelector('input[name="price"]');
  var timeIn = document.querySelector('select[name="timein"]');
  var timeOut = document.querySelector('select[name="timeout"]');
  var cardTemplateSuccess = document.querySelector('#success')
    .content
    .querySelector('.success');

  var checkCapacityAndRooms = function () {
    var rooms = +roomsNumber.value;
    var capacity = +capacityNumber.value;
    if (rooms < capacity) {
      roomsNumber.setCustomValidity('для гостей нужно больше комнат');
    } else if (rooms === 100 && capacity !== 0) {
      roomsNumber.setCustomValidity('для комерческого помещения нужно выбрать 0 гостей');
    } else if (rooms !== 100 && capacity === 0) {
      roomsNumber.setCustomValidity('для 0 гостей нужно выбрать комерческое помещение');
    } else if (rooms === 100 && capacity === 0) {
      roomsNumber.setCustomValidity('');
    } else {
      roomsNumber.setCustomValidity('');
    }
  };

  var checkPriceForPlaces = function () {
    if (placeType.value === 'bungalo') {
      inputPrice.placeholder = '0';
      inputPrice.min = 0;
    } else if (placeType.value === 'flat') {
      inputPrice.placeholder = '1000';
      inputPrice.min = 1000;
    } else if (placeType.value === 'house') {
      inputPrice.placeholder = '5000';
      inputPrice.min = 5000;
    } else if (placeType.value === 'palace') {
      inputPrice.placeholder = '10000';
      inputPrice.min = 10000;
    }
  };

  var checkInTime = function () {
    if (timeIn.value === '14:00') {
      timeOut.value = timeIn.value;
    } else if (timeIn.value === '12:00') {
      timeOut.value = timeIn.value;
    } else if (timeIn.value === '13:00') {
      timeOut.value = timeIn.value;
    }
  };

  var checkOutTime = function () {
    if (timeOut.value === '14:00') {
      timeIn.value = timeOut.value;
    } else if (timeOut.value === '12:00') {
      timeIn.value = timeOut.value;
    } else if (timeOut.value === '13:00') {
      timeIn.value = timeOut.value;
    }
  };

  checkInTime();
  checkOutTime();
  checkCapacityAndRooms();
  checkPriceForPlaces();

  window.startValidityListeners = function () {
    timeIn.addEventListener('change', checkInTime);
    timeOut.addEventListener('change', checkOutTime);
    capacityNumber.addEventListener('change', checkCapacityAndRooms);
    roomsNumber.addEventListener('change', checkCapacityAndRooms);
    placeType.addEventListener('change', checkPriceForPlaces);
  };

  var endValidityListeners = function () {
    timeIn.removeEventListener('change', checkInTime);
    timeOut.removeEventListener('change', checkOutTime);
    capacityNumber.removeEventListener('change', checkCapacityAndRooms);
    roomsNumber.removeEventListener('change', checkCapacityAndRooms);
    placeType.removeEventListener('change', checkPriceForPlaces);
  };

  var deactivateSelects = function (select) {
    for (var k = 0; k < select.length; k++) {
      select[k].setAttribute('disabled', true);
    }
  };

  var deactivateFieldsets = function (fieldset) {
    for (var k = 0; k < fieldset.length; k++) {
      fieldset[k].setAttribute('disabled', true);
    }
  };

  var makePageDeactiveted = function () {
    window.mapItem.classList.add('map--faded');
    window.formItem.classList.add('ad-form--disabled');
    deactivateFieldsets(window.mapSelects);
    deactivateSelects(window.mapFieldsets);
    window.formItem.reset();
    window.removePins(window.pinContainerElem.querySelectorAll('.map__pin'));
    if (document.querySelector('.popup')) {
      document.querySelector('.popup').remove();
    }
    endValidityListeners();
    window.mapPin.style.left = window.coordinate.x + 'px';
    window.mapPin.style.top = window.coordinate.y = 'px';
  };

  var openSuccessMessage = function () {
    var result = cardTemplateSuccess.cloneNode(true);
    document.body.insertAdjacentElement('afterbegin', result);
  };

  var openErrorMessage = function (message) {
    var error = window.cardTemplateError.cloneNode(true);
    error.querySelector('.error__message').textContent = message;
    document.body.insertAdjacentElement('afterbegin', error);
  };

  var onSubmitSuccess = function () {
    openSuccessMessage();
    makePageDeactiveted();
    document.addEventListener('keydown', onSuccessEscDown);
    document.addEventListener('click', onSuccessClick);
  };

  var onSubmitError = function (errorMessage) {
    openErrorMessage(errorMessage);
    document.addEventListener('keydown', onErrorEscDown);
    document.addEventListener('click', onErrorClick);
  };


  var onSuccessClick = function (evt) {
    evt.preventDefault();
    closeSuccessMessage();
  };

  var onSuccessEscDown = function (evt) {
    evt.preventDefault();
    if (evt.keyCode === window.key.ESC) {
      closeSuccessMessage();
    }
  };

  var onErrorClick = function (evt) {
    evt.preventDefault();
    closeErrorMessage();
  };

  var onErrorEscDown = function (evt) {
    evt.preventDefault();
    if (evt.keyCode === window.key.ESC) {
      closeErrorMessage();
    }
  };

  var closeSuccessMessage = function () {
    document.querySelector('.success').remove();
    document.removeEventListener('keydown', onSuccessEscDown);
    document.removeEventListener('click', onSuccessClick);
  };

  var closeErrorMessage = function () {
    document.querySelector('.error').remove();
    document.removeEventListener('keydown', onErrorEscDown);
    document.removeEventListener('click', onSuccessClick);
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.addressCoordinate.removeAttribute('disabled');
    var formData = new FormData(window.formItem);
    window.save(formData, onSubmitSuccess, onSubmitError);
  };

  window.formItem.addEventListener('submit', onFormSubmit);

})();
