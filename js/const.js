'use strict';

(function () {
  var OFFER_AMOUNTS = 5;
  var DEBOUNCE_INTERVAL = 500;
  var TITLE_LENGTH = 30;
  var MIN_PLACE_PRICE = 0;
  var MAX_PLACE_PRICE = 100000;
  var TIMEOUT = 10000;
  var STATUS_SUCCESS = 200;
  var PIN_HEIGHT = 22;
  var DEFAULT_INPUT_VALUE = 'any';
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_PHOTO = 'img/muffin-grey.svg';
  var ERROR_BORDER = 'border-color: red';
  var MAX_ROOMS = 100;
  var MIN_CAPACITY = 0;
  var Key = {
    ENTER: 13,
    ESC: 27
  };
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
  var MinPriceForPlace = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };
  var TypeHousingMap = {
    PALACE: 'дворец',
    FLAT: 'квартира',
    HOUSE: 'дом',
    BUNGALO: 'бунгало'
  };
  var Url = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking'
  };

  window.const = {
    offerAmounts: OFFER_AMOUNTS,
    maxRooms: MAX_ROOMS,
    minCapacity: MIN_CAPACITY,
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
