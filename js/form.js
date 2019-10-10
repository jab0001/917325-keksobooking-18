'use strict';

(function () {
  var addressCoordinate = document.querySelector('input[name="address"]');
  var roomsNumber = document.querySelector('select[name="rooms"]');
  var capacityNumber = document.querySelector('select[name="capacity"]');
  var placeType = document.querySelector('select[name="type"]');
  var inputPrice = document.querySelector('input[name="price"]');
  var timeIn = document.querySelector('select[name="timein"]');
  var timeOut = document.querySelector('select[name="timeout"]');
  window.PIN_HEIGHT = 22;

  window.getAdressOfMark = function () {
    var mapPinLeft = +(window.mapPin.style.left.replace('px', ''));
    var mapPinTop = +(window.mapPin.style.top.replace('px', ''));
    var mapPinX = Math.round(mapPinLeft + window.mapPin.offsetWidth / 2);
    var mapPinY = Math.round(mapPinTop + (window.mapPin.offsetHeight + window.PIN_HEIGHT));
    addressCoordinate.value = mapPinX + 'px, ' + mapPinY + 'px';
    addressCoordinate.setAttribute('disabled', true);
  };

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

  timeIn.addEventListener('change', function () {
    checkInTime();
  });

  timeOut.addEventListener('change', function () {
    checkOutTime();
  });

  checkCapacityAndRooms();

  capacityNumber.addEventListener('change', function () {
    checkCapacityAndRooms();
  });

  roomsNumber.addEventListener('change', function () {
    checkCapacityAndRooms();
  });

  checkPriceForPlaces();
  placeType.addEventListener('change', function () {
    checkPriceForPlaces();
  });

})();
