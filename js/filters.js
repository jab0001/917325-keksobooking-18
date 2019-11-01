'use strict';

(function () {
  var filterType = document.querySelector('select[name="housing-type"]');
  var filterRoom = document.querySelector('select[name="housing-rooms"]');
  var filterGuest = document.querySelector('select[name="housing-guests"]');
  var filterPrice = document.querySelector('select[name="housing-price"]');
  var filters = document.querySelector('.map__filters');

  var resetFilters = function () {
    filterType.value = window.const.defaultInputValue;
    filterRoom.value = window.const.defaultInputValue;
    filterGuest.value = window.const.defaultInputValue;
    filterPrice.value = window.const.defaultInputValue;
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
    return input.value === window.const.defaultInputValue ? true : input.value === data.toString();
  };

  var offerPriceRange = {
    low: function (price) {
      return +price < window.const.price.MIN;
    },
    middle: function (price) {
      return +price >= window.const.price.MIN && +price <= window.const.price.MAX;
    },
    high: function (price) {
      return +price > window.const.price.MAX;
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
    var arrayForFilters = window.offers.slice();
    window.pins.removePins(window.map.mapPins.querySelectorAll('.map__pin'));
    var filteredPins = arrayForFilters.filter(offerFilter.types)
      .filter(getOffersForPrice)
      .filter(offerFilter.rooms)
      .filter(offerFilter.guests)
      .filter(getOffersForFeatures);
    window.map.renderOffers(filteredPins);
    window.map.makePinsActive();
    window.cards.closeCardOffer();
  };

  filters.addEventListener('change', window.debounce(getFilteringOffers));

  window.filters = {
    resetFilters: resetFilters,
    filters: filters,
    filteringOffers: getFilteringOffers
  };
})();
