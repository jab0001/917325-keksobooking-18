'use strict';

(function () {
  window.OFFER_AMOUNTS = 5;
  window.Key = {
    ENTER: 13,
    ESC: 27
  };
  window.TypeHousingMap = {
    PALACE: 'дворец',
    FLAT: 'квартира',
    HOUSE: 'дом',
    BUNGALO: 'бунгало'
  };
  window.PIN_HEIGHT = 22;
  window.Coordinate = {
    X: 570,
    Y: 375
  };
  window.Limit = {
    Xmin: 0,
    Ymin: 130,
    Xmax: 1200,
    Ymax: 630
  };
  window.Price = {
    MIN: 10000,
    MAX: 50000,
  };
  window.DEBOUNCE_INTERVAL = 500;
  window.DEFAULT_INPUT_VALUE = 'any';
  window.FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  window.DEFAULT_PHOTO = 'img/muffin-grey.svg';
  window.INVALID_FIELD = '5px solid green';
  window.TITLE_LENGTH = 30;
  window.minPlacePrice = 0;
  window.maxPlacePrice = 100000;
  window.MinPriceForPlace = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };
  window.ERROR_BORDER = 'border-color: red';
  window.Url = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking'
  };
})();
