'use strict';

(function () {
  var OFFER_AMOUNTS = 5;
  var Key = {
    ENTER: 13,
    ESC: 27
  };
  var TypeHousingMap = {
    PALACE: 'дворец',
    FLAT: 'квартира',
    HOUSE: 'дом',
    BUNGALO: 'бунгало'
  };
  var PIN_HEIGHT = 22;
  var Coordinate = {
    X: 570,
    Y: 375
  };
  var Limit = {
    Xmin: 0,
    Ymin: 130,
    Xmax: 1200,
    Ymax: 630
  };
  var Price = {
    MIN: 10000,
    MAX: 50000,
  };
  var DEBOUNCE_INTERVAL = 500;
  var DEFAULT_INPUT_VALUE = 'any';
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_PHOTO = 'img/muffin-grey.svg';
  var TITLE_LENGTH = 30;
  var MIN_PLACE_PRICE = 0;
  var MAX_PLACE_PRICE = 100000;
  var MinPriceForPlace = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };
  var ERROR_BORDER = 'border-color: red';
  var Url = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking'
  };
  var TIMEOUT = 10000;
  var STATUS_SUCCESS = 200;

  window.const = {
    offerAmounts: OFFER_AMOUNTS,
    key: Key,
    typeHousingMap: TypeHousingMap,
    pinHeight: PIN_HEIGHT,
    coordinate: Coordinate,
    limit: Limit,
    price: Price,
    debounceInterval: DEBOUNCE_INTERVAL,
    defaultInputValue: DEFAULT_INPUT_VALUE,
    fileTypes: FILE_TYPES,
    defaultPhoto: DEFAULT_PHOTO,
    titleLength: TITLE_LENGTH,
    minPlacePrice: MIN_PLACE_PRICE,
    maxPlacePrice: MAX_PLACE_PRICE,
    minPriceForPlace: MinPriceForPlace,
    errorBorder: ERROR_BORDER,
    url: Url,
    timeout: TIMEOUT,
    statusSuccess: STATUS_SUCCESS
  };
})();
