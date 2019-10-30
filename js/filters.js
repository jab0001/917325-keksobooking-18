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
      return getFilteringOffers(filterType, data.offer.type);
    },
    rooms: function (data) {
      return getFilteringOffers(filterRoom, data.offer.rooms);
    },
    guests: function (data) {
      return getFilteringOffers(filterGuest, data.offer.guests);
    }
  };

  var getFilteringOffers = function (input, data) {
    return input.value === window.DEFAULT_INPUT_VALUE ? true : input.value === data.toString();
  };

  var offerPriceRange = {
    low: function (data) {
      return +data < window.Price.MIN;
    },
    middle: function (data) {
      return +data >= window.Price.MIN && +data <= window.Price.MAX;
    },
    high: function (data) {
      return +data > window.Price.MAX;
    },
    any: function (data) {
      return data;
    }
  };

  var getFilterOffersPrice = function (data) {
    return offerPriceRange[filterPrice.value](data.offer.price);
  };

  var getOffersFeaturesFiltered = function (item) {
    var pushedFeatures = Array.from(document.querySelectorAll('.map__checkbox:checked')).map(function (features) {
      return features.value;
    });
    return pushedFeatures.every(function (value) {
      return item.offer.features.includes(value);
    });
  };

  var getFilteringData = function () {
    window.removePins(window.mapPins.querySelectorAll('.map__pin'));
    window.offers = [];
    var filteredPins = offers.filter(offerFilter.types)
      .filter(getFilterOffersPrice)
      .filter(offerFilter.rooms)
      .filter(offerFilter.guests)
      .filter(getOffersFeaturesFiltered);
    window.renderOffers(filteredPins);
    window.makePinsActive();
    window.closeOffer();
  };

  window.filters.addEventListener('change', window.debounce(getFilteringData));

  var onError = function (message) {
    var error = window.cardTemplateError.cloneNode(true);
    error.querySelector('.error__message').textContent = message;
    document.body.insertAdjacentElement('afterbegin', error);
  };

  var onSuccess = function (data) {
    offers = data;
    window.NonFilteredOffers = data;
    getFilteringData();
    window.removePins(window.mapPins.querySelectorAll('.map__pin'));
  };

  window.load(onSuccess, onError);
})();
