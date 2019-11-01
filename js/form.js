'use strict';

(function () {
  var roomsNumber = document.querySelector('select[name="rooms"]');
  var capacityNumber = document.querySelector('select[name="capacity"]');
  var placeType = document.querySelector('select[name="type"]');
  var placePrice = document.querySelector('input[name="price"]');
  var placeTimeIn = document.querySelector('select[name="timein"]');
  var placeTimeOut = document.querySelector('select[name="timeout"]');
  var offerTitle = document.querySelector('input[name="title"]');
  var cardTemplateSuccess = document.querySelector('#success')
    .content
    .querySelector('.success');
  var formInputs = document.querySelectorAll('.ad-form input');

  var validateTitle = function () {
    if (offerTitle.value.length > window.TITLE_LENGTH) {
      offerTitle.style = '';
    }
  };

  var validateCapacityAndRooms = function () {
    var rooms = +roomsNumber.value;
    var capacity = +capacityNumber.value;
    if (rooms < capacity || rooms > capacity) {
      roomsNumber.setCustomValidity('для гостей нужно больше комнат');
    } else if (rooms === 100 && capacity !== 0) {
      roomsNumber.setCustomValidity('для комерческого помещения нужно выбрать 0 гостей');
    } else if (rooms !== 100 && capacity === 0) {
      roomsNumber.setCustomValidity('для 0 гостей нужно выбрать комерческое помещение');
    } else if (rooms === 100 && capacity === 0) {
      validateCapacityAndRoomsSuccess();
    } else {
      validateCapacityAndRoomsSuccess();
    }
  };

  var validateCapacityAndRoomsSuccess = function () {
    roomsNumber.setCustomValidity('');
    roomsNumber.style = '';
    capacityNumber.style = '';
  };

  var validateCapacityAndRoomsError = function () {
    roomsNumber.style = window.ERROR_BORDER;
    capacityNumber.style = window.ERROR_BORDER;
  };

  var synchronizePriceForPlaces = function () {
    placePrice.setAttribute('min', window.MinPriceForPlace[placeType.value.toUpperCase()]);
    placePrice.setAttribute('placeholder', window.MinPriceForPlace[placeType.value.toUpperCase()]);
  };

  var validatePrice = function () {
    if (placePrice.value < window.minPlacePrice) {
      placePrice.style = window.ERROR_BORDER;
    } else if (placePrice.value > window.maxPlacePrice) {
      placePrice.style = window.ERROR_BORDER;
    } else {
      placePrice.style = '';
    }
  };

  var synchronizeTimeIn = function () {
    placeTimeOut.value = placeTimeIn.value;
  };

  var synchronizeTimeOut = function () {
    placeTimeIn.value = placeTimeOut.value;
  };

  validateCapacityAndRooms();
  synchronizePriceForPlaces();

  window.startListeners = function () {
    capacityNumber.addEventListener('change', validateCapacityAndRooms);
    roomsNumber.addEventListener('change', validateCapacityAndRooms);
    placeTimeOut.addEventListener('change', synchronizeTimeOut);
    placeTimeIn.addEventListener('change', synchronizeTimeIn);
    capacityNumber.addEventListener('invalid', validateCapacityAndRoomsError);
    roomsNumber.addEventListener('invalid', validateCapacityAndRoomsError);
    placeType.addEventListener('change', synchronizePriceForPlaces);
    placePrice.addEventListener('input', validatePrice);
    window.form.addEventListener('reset', makePageDeactiveted);
    window.form.addEventListener('submit', onFormSubmit);
    offerTitle.addEventListener('input', validateTitle);
    synchronizePriceForPlaces();
    window.form.addEventListener('invalid', function (evt) {
      evt.target.style = window.ERROR_BORDER;
    }, true);
  };

  var endListeners = function () {
    capacityNumber.removeEventListener('change', validateCapacityAndRooms);
    roomsNumber.removeEventListener('change', validateCapacityAndRooms);
    capacityNumber.removeEventListener('invalid', validateCapacityAndRoomsError);
    roomsNumber.removeEventListener('invalid', validateCapacityAndRoomsError);
    placeType.removeEventListener('change', synchronizePriceForPlaces);
    placePrice.removeEventListener('input', validatePrice);
    window.form.removeEventListener('reset', makePageDeactiveted);
    window.form.removeEventListener('submit', onFormSubmit);
    offerTitle.removeEventListener('input', validateTitle);
    window.form.removeEventListener('invalid', function (evt) {
      evt.target.style = window.ERROR_BORDER;
    }, true);
  };

  var deactivateFields = function (select) {
    for (var k = 0; k < select.length; k++) {
      select[k].setAttribute('disabled', true);
    }
  };

  var makePageDeactiveted = function () {
    window.map.classList.add('map--faded');
    window.form.classList.add('ad-form--disabled');
    window.filters.classList.add('map__filters--disabled');
    window.mapFormAvatarUpload.setAttribute('disabled', true);
    deactivateFields(window.mapFilters);
    deactivateFields(window.mapFormInputs);
    formInputs.forEach(function (elem) {
      elem.style = '';
    });
    roomsNumber.style = '';
    capacityNumber.style = '';
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
})();
