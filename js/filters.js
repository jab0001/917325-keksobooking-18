'use strict';

(function () {
  var offers = [];

  var filterType = document.querySelector('select[name="housing-type"]');
  var filterRoom = document.querySelector('select[name="housing-rooms"]');
  var filterGuest = document.querySelector('select[name="housing-guests"]');
  var filterPrice = document.querySelector('select[name="housing-price"]');
  window.filters = document.querySelector('.map__filters');

  window.resetFilters = function () {
    filterType.value = window.DEFAULT_INPUT_VALUE;
    filterRoom.value = window.DEFAULT_INPUT_VALUE;
    filterGuest.value = window.DEFAULT_INPUT_VALUE;
    filterPrice.value = window.DEFAULT_INPUT_VALUE;
    var checkedFeatures = document.querySelectorAll('.map__checkbox:checked');
    checkedFeatures.forEach(function (elem) {
      elem.checked = false;
    });
  };

  var offerFilter = {
    types: function (data) {
      return getOffersForFilters(filterType, data.offer.type);
    },
    rooms: function (data) {
      return getOffersForFilters(filterRoom, data.offer.rooms);
    },
    guests: function (data) {
      return getOffersForFilters(filterGuest, data.offer.guests);
    }
  };

  var getOffersForFilters = function (input, data) {
    return input.value === window.DEFAULT_INPUT_VALUE ? true : input.value === data.toString();
  };

  var offerPriceRange = {
    low: function (price) {
      return +price < window.Price.MIN;
    },
    middle: function (price) {
      return +price >= window.Price.MIN && +price <= window.Price.MAX;
    },
    high: function (price) {
      return +price > window.Price.MAX;
    },
    any: function (price) {
      return price;
    }
  };

  var getOffersForPrice = function (data) {
    return offerPriceRange[filterPrice.value](data.offer.price);
  };

  var getOffersForFeatures = function (item) {
    var pushedFeatures = Array.from(document.querySelectorAll('.map__checkbox:checked')).map(function (features) {
      return features.value;
    });
    return pushedFeatures.every(function (value) {
      return item.offer.features.includes(value);
    });
  };

  var getFilteringOffers = function () {
    window.removePins(window.mapPins.querySelectorAll('.map__pin'));
    var filteredPins = offers.filter(offerFilter.types)
      .filter(getOffersForPrice)
      .filter(offerFilter.rooms)
      .filter(offerFilter.guests)
      .filter(getOffersForFeatures);
    window.renderOffers(filteredPins);
    window.makePinsActive();
    window.closeCardOffer();
  };

  window.filters.addEventListener('change', window.debounce(getFilteringOffers));

  var onError = function (message) {
    var error = window.cardTemplateError.cloneNode(true);
    error.querySelector('.error__message').textContent = message;
    document.body.insertAdjacentElement('afterbegin', error);
  };

  var onSuccess = function (data) {
    offers = data;
    window.NonFilteredOffers = data;
    getFilteringOffers();
    window.removePins(window.mapPins.querySelectorAll('.map__pin'));
  };

  window.load(onSuccess, onError);
})();
