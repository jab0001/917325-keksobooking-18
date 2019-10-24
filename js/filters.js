'use strict';

(function () {
  var offers = [];

  var inputFilterType = document.querySelector('select[name="housing-type"]');
  var inputFilterRoom = document.querySelector('select[name="housing-rooms"]');
  var inputFilterGuest = document.querySelector('select[name="housing-guests"]');
  var inputFilterPrice = document.querySelector('select[name="housing-price"]');
  var filterElement = document.querySelector('.map__filters');

  var offerInputs = {
    types: function (data) {
      return getFilteringOffer(inputFilterType, data.offer.type);
    },
    rooms: function (data) {
      return getFilteringOffer(inputFilterRoom, data.offer.rooms);
    },
    guests: function (data) {
      return getFilteringOffer(inputFilterGuest, data.offer.guests);
    }
  };

  var getFilteringOffer = function (input, data) {
    return input.value === window.DEFAULT_INPUT_VALUE ? true : input.value === data.toString();
  };

  var offersRange = {
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
    return offersRange[inputFilterPrice.value](data.offer.price);
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
    window.removePins(window.pinContainerElem.querySelectorAll('.map__pin'));
    var filteredPins = offers.filter(offerInputs.types)
      .filter(getFilterOffersPrice)
      .filter(offerInputs.rooms)
      .filter(offerInputs.guests)
      .filter(getOffersFeaturesFiltered);
    window.renderOffers(filteredPins);
    window.makePinsActive();
  };

  filterElement.addEventListener('change', window.debounce(getFilteringData));

  var onError = function (message) {
    var error = window.cardTemplateError.cloneNode(true);
    error.querySelector('.error__message').textContent = message;
    document.body.insertAdjacentElement('afterbegin', error);
  };

  var onSuccess = function (data) {
    offers = data;
    getFilteringData();
    window.removePins(window.pinContainerElem.querySelectorAll('.map__pin'));
  };

  window.load(onSuccess, onError);
})();
