'use strict';

(function () {
  window.OFFER_AMOUNTS = 5;
  window.key = {
    ENTER: 13,
    ESC: 27
  };
  window.type = {
    palace: 'дворец',
    flat: 'квартира',
    house: 'дом',
    bungalo: 'бунгало'
  };
  window.PIN_HEIGHT = 22;
  window.coordinate = {
    x: 570,
    y: 375
  };
  window.limit = {
    Xmin: 0,
    Ymin: 130,
    Xmax: 1200,
    Ymax: 630
  };
  window.price = {
    low: {
      MIN: 0,
      MAX: 10000
    },
    middle: {
      MIN: 10000,
      MAX: 50000,
    },
    hight: {
      MIN: 50000,
      MAX: 9999999
    }
  };
  window.DEBOUNCE_INTERVAL = 500;
  window.DEFAULT_INPUT_VALUE = 'any';
})();
