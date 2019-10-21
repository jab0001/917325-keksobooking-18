'use strict';

(function () {
  var offers = [];

  var inputFilterType = document.querySelector('select[name="housing-type"]');
  var inputFilterRoom = document.querySelector('select[name="housing-rooms"]');
  var inputFilterGuest = document.querySelector('select[name="housing-guests"]');
  var inputFilterPrice = document.querySelector('select[name="housing-price"]');
  var filterElement = document.querySelector('.map__filters');

  var filterOfferTypes = function (arr) {
    return inputFilterType.value === 'any' ? arr : inputFilterType.value === arr.offer.type;
  };

  var filterOfferRooms = function (arr) {
    return inputFilterRoom.value === 'any' ? arr : +inputFilterRoom.value === +arr.offer.rooms;
  };

  var filterOfferGuests = function (data) {
    return inputFilterGuest.value === 'any' ? data : +inputFilterGuest.value === +data.offer.guests;
  };

  var getOffersMinPrices = function (data) {
    return +data.offer.price <= window.price.MIN;
  };

  var getOffersMidPrices = function (data) {
    return +data.offer.price >= window.price.MIN && +data.offer.price <= window.price.MAX;
  };

  var getOffersHightPrices = function (data) {
    return +data.offer.price >= window.price.MAX;
  };

  var getOffersAllPrice = function (data) {
    return data;
  };

  var offersRange = {
    low: getOffersMinPrices,
    middle: getOffersMidPrices,
    high: getOffersHightPrices,
    any: getOffersAllPrice
  };

  var filterOffersPrice = function (data) {
    return offersRange[inputFilterPrice.value](data);
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
    var filteredPins = offers.filter(filterOfferTypes)
      .filter(filterOffersPrice)
      .filter(filterOfferRooms)
      .filter(filterOfferGuests)
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

  var onSuccess = window.debounce(function (data) {
    offers = data;
    getFilteringData();
    window.removePins(window.pinContainerElem.querySelectorAll('.map__pin'));
  });

  window.load(onSuccess, onError);
})();
