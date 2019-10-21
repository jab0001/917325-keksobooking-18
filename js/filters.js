'use strict';

(function () {
  var offers = [];

  var inputFilterType = document.querySelector('select[name="housing-type"]');
  var inputFilterRoom = document.querySelector('select[name="housing-rooms"]');
  var inputFilterGuest = document.querySelector('select[name="housing-guests"]');
  var inputFilterPrice = document.querySelector('select[name="housing-price"]');
  var filterElement = document.querySelector('.map__filters');
  var checkedFeatures = document.querySelectorAll('input[name="features"]');

  var updateOffers = function () {

    var sameOfferTypes = function (arr) {
      return inputFilterType.value === 'any' ? arr : inputFilterType.value === arr.offer.type;
    };

    // тернарный

    var sameOfferRooms = function (arr) {
      return inputFilterRoom.value === 'any' ? arr : inputFilterRoom.value === String(arr.offer.rooms);
    };

    // var sameOfferRooms = function (arr) {
    // if (inputFilterRoom.value === 'any') {
    // return arr;
    // } else {
    // return inputFilterRoom.value === String(arr.offer.rooms);
    // }
    // };

    var sameOfferGuests = function (arr) {
      return inputFilterGuest.value === 'any' ? arr : inputFilterGuest.value === String(arr.offer.guests);
    };

    var getOffersMinPrices = function (arr) {
      return +arr.offer.price <= window.price.MIN;
    };

    var getOffersMidPrices = function (arr) {
      return +arr.offer.price >= window.price.MIN && +arr.offer.price <= window.price.MAX;
    };

    var getOffersHightPrices = function (arr) {
      return +arr.offer.price >= window.price.MAX;
    };

    var getOffersAllPrice = function (arr) {
      return arr;
    };

    var offersRange = {
      low: getOffersMinPrices,
      middle: getOffersMidPrices,
      high: getOffersHightPrices,
      any: getOffersAllPrice
    };

    var getOffersPrice = function (arr) {
      return offersRange[inputFilterPrice.value](arr);
    };

    var getOffersFeaturesPushed = function () {
      var result = [];
      checkedFeatures.forEach(function (feature) {
        if (feature.checked) {
          result.push(feature.value);
        }
      });
      return result;
    };

    var getOffersFeaturesCompare = function (pushed, arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr.indexOf(pushed[i]) < 0) {
          return false;
        }
      }
      return true;
    };

    var getOffersFeaturesFiltered = function (arr) {
      return (getOffersFeaturesCompare(getOffersFeaturesPushed(), arr.offer.features)) ? arr : false;
    };

    var getFilteringData = function (arr) {
      return arr.filter(function (it) {
        return sameOfferTypes(it) &&
          getOffersPrice(it) &&
          sameOfferRooms(it) &&
          getOffersFeaturesFiltered(it) &&
          sameOfferGuests(it);
      });
    };

    window.renderOffers(getFilteringData(offers));
  };

  filterElement.addEventListener('change', window.debounce(function () {
    updateOffers();
    window.removePins(window.pinContainerElem.querySelectorAll('.map__pin'));
    window.makePinsActive();
  }));

  var onError = function (message) {
    var error = window.cardTemplateError.cloneNode(true);
    error.querySelector('.error__message').textContent = message;
    document.body.insertAdjacentElement('afterbegin', error);
  };

  var onSuccess = function (data) {
    offers = data;

    updateOffers();
  };

  window.load(onSuccess, onError);
})();
