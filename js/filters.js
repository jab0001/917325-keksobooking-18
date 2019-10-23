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
      return filtrationOffer(inputFilterType, data.offer, 'type');
    },
    rooms: function (data) {
      return filtrationOffer(inputFilterRoom, data.offer, 'rooms');
    },
    guests: function (data) {
      return filtrationOffer(inputFilterGuest, data.offer, 'guests');
    }
  };

  var filtrationOffer = function (input, data, key) {
    return input.value === window.DEFAULT_INPUT_VALUE ? true : input.value === data[key].toString();
  };

  var filterOffersPrice = function (data) {
    return inputFilterPrice.value === window.DEFAULT_INPUT_VALUE ? true : data.offer.price >= window.price[inputFilterPrice.value].MIN && data.offer.price <= window.price[inputFilterPrice.value].MAX;
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
      .filter(filterOffersPrice)
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
