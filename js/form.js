'use strict';

(function () {
  var roomsNumber = document.querySelector('select[name="rooms"]');
  var capacityNumber = document.querySelector('select[name="capacity"]');
  var placeType = document.querySelector('select[name="type"]');
  var placePrice = document.querySelector('input[name="price"]');
  var placeTimeIn = document.querySelector('select[name="timein"]');
  var placeTimeOut = document.querySelector('select[name="timeout"]');
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
      placePrice.placeholder = '0';
      placePrice.min = 0;
    } else if (placeType.value === 'flat') {
      placePrice.placeholder = '1000';
      placePrice.min = 1000;
    } else if (placeType.value === 'house') {
      placePrice.placeholder = '5000';
      placePrice.min = 5000;
    } else if (placeType.value === 'palace') {
      placePrice.placeholder = '10000';
      placePrice.min = 10000;
    }
  };

  var checkTimeIn = function () {
    if (placeTimeIn.value === '14:00') {
      placeTimeOut.value = placeTimeIn.value;
    } else if (placeTimeIn.value === '12:00') {
      placeTimeOut.value = placeTimeIn.value;
    } else if (placeTimeIn.value === '13:00') {
      placeTimeOut.value = placeTimeIn.value;
    }
  };

  var checkTimeOut = function () {
    if (placeTimeOut.value === '14:00') {
      placeTimeIn.value = placeTimeOut.value;
    } else if (placeTimeOut.value === '12:00') {
      placeTimeIn.value = placeTimeOut.value;
    } else if (placeTimeOut.value === '13:00') {
      placeTimeIn.value = placeTimeOut.value;
    }
  };

  checkTimeIn();
  checkTimeOut();
  checkCapacityAndRooms();
  checkPriceForPlaces();

  window.startListeners = function () {
    placeTimeIn.addEventListener('change', checkTimeIn);
    placeTimeOut.addEventListener('change', checkTimeOut);
    capacityNumber.addEventListener('change', checkCapacityAndRooms);
    roomsNumber.addEventListener('change', checkCapacityAndRooms);
    placeType.addEventListener('change', checkPriceForPlaces);
    window.form.addEventListener('reset', makePageDeactiveted);
  };

  var endListeners = function () {
    placeTimeIn.removeEventListener('change', checkTimeIn);
    placeTimeOut.removeEventListener('change', checkTimeOut);
    capacityNumber.removeEventListener('change', checkCapacityAndRooms);
    roomsNumber.removeEventListener('change', checkCapacityAndRooms);
    placeType.removeEventListener('change', checkPriceForPlaces);
    checkPriceForPlaces();
    window.form.removeEventListener('reset', makePageDeactiveted);
  };

  var deactivateFields = function (select) {
    for (var k = 0; k < select.length; k++) {
      select[k].setAttribute('disabled', true);
    }
  };

  var makePageDeactiveted = function () {
    window.map.classList.add('map--faded');
    window.form.classList.add('ad-form--disabled');
    window.mapFormAvatarUpload.setAttribute('disabled', true);
    deactivateFields(window.mapFilters);
    deactivateFields(window.mapFormInputs);
    window.mapFeatures.setAttribute('disabled', true);
    window.removePins(window.mapPins.querySelectorAll('.map__pin'));
    if (document.querySelector('.popup')) {
      document.querySelector('.popup').remove();
    }
    window.form.reset();
    window.resetFilters();
    resetMainPin();
    resetPhotoPreview();
    endListeners();

    window.mapPinMain.addEventListener('mousedown', window.mapPinActiveOnMousedown);
    window.mapPinMain.addEventListener('keydown', window.mapPinActiveOnKeydown);
  };

  var resetMainPin = function () {
    window.mapPinMain.style.left = window.Coordinate.X + 'px';
    window.mapPinMain.style.top = window.Coordinate.Y + 'px';
  };

  var resetPhotoPreview = function () {
    window.avatarPreview.src = window.DEFAULT_PHOTO;
    window.photoPreview.style = '';
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
    if (evt.keyCode === window.Key.ESC) {
      closeSuccessMessage();
    }
  };

  var onErrorClick = function (evt) {
    evt.preventDefault();
    closeErrorMessage();
  };

  var onErrorEscDown = function (evt) {
    evt.preventDefault();
    if (evt.keyCode === window.Key.ESC) {
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
    document.removeEventListener('click', onErrorClick);
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.addressCoordinate.removeAttribute('disabled');
    var formData = new FormData(window.form);
    window.save(formData, onSubmitSuccess, onSubmitError);
  };

  window.form.addEventListener('submit', onFormSubmit);

})();
