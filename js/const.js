'use strict';

(function () {
  window.OFFER_AMOUNTS = 5;
  window.Key = {
    ENTER: 13,
    ESC: 27
  };
  window.Type = {
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
})();
