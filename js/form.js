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

  var onTitleIntroduce = function () {
    if (offerTitle.value.length > window.const.titleLength) {
      offerTitle.style = '';
    }
  };

  var onCapacityAndRoomsChange = function () {
    var rooms = +roomsNumber.value;
    var capacity = +capacityNumber.value;
    if (rooms < capacity || rooms > capacity) {
      roomsNumber.setCustomValidity('для гостей нужно больше комнат');
    } else if (rooms === 100 && capacity !== 0) {
      roomsNumber.setCustomValidity('для комерческого помещения нужно выбрать 0 гостей');
    } else if (rooms !== 100 && capacity === 0) {
      roomsNumber.setCustomValidity('для 0 гостей нужно выбрать комерческое помещение');
    } else if (rooms === 100 && capacity === 0) {
      onCapacityAndRoomsSuccess();
    } else {
      onCapacityAndRoomsSuccess();
    }
  };

  var onCapacityAndRoomsSuccess = function () {
    roomsNumber.setCustomValidity('');
    roomsNumber.style = '';
    capacityNumber.style = '';
  };

  var onCapacityAndRoomsError = function () {
    roomsNumber.style = window.const.errorBorder;
    capacityNumber.style = window.const.errorBorder;
  };

  var onPriceForPlacesSynchronize = function () {
    placePrice.setAttribute('min', window.const.minPriceForPlace[placeType.value.toUpperCase()]);
    placePrice.setAttribute('placeholder', window.const.minPriceForPlace[placeType.value.toUpperCase()]);
  };

  var onPriceChange = function () {
    if (placePrice.value < window.const.minPlacePrice) {
      placePrice.style = window.const.errorBorder;
    } else if (placePrice.value > window.const.maxPlacePrice) {
      placePrice.style = window.const.errorBorder;
    } else {
      placePrice.style = '';
    }
  };

  var onTimeInChange = function () {
    placeTimeOut.value = placeTimeIn.value;
  };

  var onTimeOutChange = function () {
    placeTimeIn.value = placeTimeOut.value;
  };

  onCapacityAndRoomsChange();
  onPriceForPlacesSynchronize();

  var startListeners = function () {
    capacityNumber.addEventListener('change', onCapacityAndRoomsChange);
    roomsNumber.addEventListener('change', onCapacityAndRoomsChange);
    placeTimeOut.addEventListener('change', onTimeOutChange);
    placeTimeIn.addEventListener('change', onTimeInChange);
    capacityNumber.addEventListener('invalid', onCapacityAndRoomsError);
    roomsNumber.addEventListener('invalid', onCapacityAndRoomsError);
    placeType.addEventListener('change', onPriceForPlacesSynchronize);
    placePrice.addEventListener('input', onPriceChange);
    window.map.form.addEventListener('reset', onPageDeactiveted);
    window.map.form.addEventListener('submit', onFormSubmit);
    offerTitle.addEventListener('input', onTitleIntroduce);
    onPriceForPlacesSynchronize();
    window.map.form.addEventListener('invalid', function (evt) {
      evt.target.style = window.const.errorBorder;
    }, true);
  };

  var endListeners = function () {
    capacityNumber.removeEventListener('change', onCapacityAndRoomsChange);
    roomsNumber.removeEventListener('change', onCapacityAndRoomsChange);
    placeTimeOut.removeEventListener('change', onTimeOutChange);
    placeTimeIn.removeEventListener('change', onTimeInChange);
    capacityNumber.removeEventListener('invalid', onCapacityAndRoomsError);
    roomsNumber.removeEventListener('invalid', onCapacityAndRoomsError);
    placeType.removeEventListener('change', onPriceForPlacesSynchronize);
    placePrice.removeEventListener('input', onPriceChange);
    window.map.form.removeEventListener('reset', onPageDeactiveted);
    window.map.form.removeEventListener('submit', onFormSubmit);
    offerTitle.removeEventListener('input', onTitleIntroduce);
    window.map.form.removeEventListener('invalid', function (evt) {
      evt.target.style = window.const.errorBorder;
    }, true);
  };

  var deactivateFields = function (select) {
    for (var k = 0; k < select.length; k++) {
      select[k].setAttribute('disabled', true);
    }
  };

  var onPageDeactiveted = function () {
    window.map.pinsArea.classList.add('map--faded');
    window.map.form.classList.add('ad-form--disabled');
    window.map.filter.classList.add('map__filters--disabled');
    window.map.formAvatarUpload.setAttribute('disabled', true);
    deactivateFields(window.map.filterFields);
    deactivateFields(window.map.formInputs);
    formInputs.forEach(function (elem) {
      elem.style = '';
    });
    roomsNumber.style = '';
    capacityNumber.style = '';
    window.map.features.setAttribute('disabled', true);
    window.pins.remove(window.map.pins.querySelectorAll('.map__pin'));
    if (document.querySelector('.popup')) {
      document.querySelector('.popup').remove();
    }
    window.map.form.reset();
    window.filters.onReset();
    resetMainPin();
    resetPhotoPreview();
    endListeners();

    window.map.pinMain.addEventListener('mousedown', window.map.onMousedownPinActive);
    window.map.pinMain.addEventListener('keydown', window.map.onKeydownPinActive);
  };

  var resetMainPin = function () {
    window.map.pinMain.style.left = window.const.coordinate.X + 'px';
    window.map.pinMain.style.top = window.const.coordinate.Y + 'px';
  };

  var resetPhotoPreview = function () {
    window.avatar.userPreview.src = window.const.defaultPhoto;
    window.avatar.photoPreview.style = '';
  };

  var openSuccessMessage = function () {
    var result = cardTemplateSuccess.cloneNode(true);
    document.body.insertAdjacentElement('afterbegin', result);
  };

  var openErrorMessage = function (message) {
    var error = window.map.cardTemplateError.cloneNode(true);
    error.querySelector('.error__message').textContent = message;
    document.body.insertAdjacentElement('afterbegin', error);
  };

  var onSubmitSuccess = function () {
    openSuccessMessage();
    onPageDeactiveted();
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
    if (evt.keyCode === window.const.key.ESC) {
      closeSuccessMessage();
    }
  };

  var onErrorClick = function (evt) {
    evt.preventDefault();
    closeErrorMessage();
  };

  var onErrorEscDown = function (evt) {
    evt.preventDefault();
    if (evt.keyCode === window.const.key.ESC) {
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
    window.map.addressCoordinate.removeAttribute('disabled');
    var formData = new FormData(window.map.form);
    window.backend.save(formData, onSubmitSuccess, onSubmitError);
  };

  window.form = {
    startListeners: startListeners
  };
})();
