'use strict';

(function () {
  var offers = [];
  var inputFilterType = document.querySelector('select[name="housing-type"]');
  var filterElement = document.querySelector('.map__filters');

  var updateOffers = function () {

    var sameOffer = offers.filter(function (it) {
      return inputFilterType.value === 'any' ? it : inputFilterType.value === it.offer.type;
    });

    var shuffledArr = sameOffer.sort(function () {
      return Math.random() - 0.5;
    });

    window.renderOffers(shuffledArr);
  };

  filterElement.addEventListener('change', function () {
    updateOffers();
    window.removePins(window.pinContainerElem.querySelectorAll('.map__pin'));
    window.makePinsActive();
  });

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
