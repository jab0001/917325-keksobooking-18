'use strict';

(function () {
  var mapItem = document.querySelector('.map');
  var pinContainerElem = mapItem.querySelector('.map__pins');
  var filtersContainerValues = mapItem.querySelector('.map__filters-container');
  var formItem = document.querySelector('.ad-form');
  var mapSelects = document.getElementsByTagName('select');
  var mapFieldsets = document.getElementsByTagName('fieldset');
  var mapPinOffer = pinContainerElem.getElementsByTagName('button');
  var removeDupedOffer = mapItem.getElementsByTagName('article');
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var TYPE = {
    palace: 'дворец',
    flat: 'квартира',
    house: 'дом',
    bungalo: 'бунгало'
  };
  var key = {
    ENTER: 13,
    ESC: 27
  };

  var closeOffer = function () {
    var card = document.querySelector('.popup');
    if (card) {
      card.remove();
    }
  };

  var closeOfferOnKeydown = function (evt) {
    if (evt.keyCode === key.ESC) {
      closeOffer();
    }
  };

  var getOfferPopup = function (completedCard) {
    var offerValue = cardTemplate.cloneNode(true);
    var closePopup = offerValue.querySelector('.popup__close');

    offerValue.querySelector('.popup__title').textContent = completedCard.offer.title;
    offerValue.querySelector('.popup__text--address').textContent = completedCard.offer.address;
    offerValue.querySelector('.popup__text--price').textContent = completedCard.offer.price + ' ₽/ночь';
    offerValue.querySelector('.popup__type').textContent = TYPE[completedCard.offer.type];
    offerValue.querySelector('.popup__text--capacity').textContent = completedCard.offer.rooms + ' комнаты для ' + completedCard.offer.guests + ' гостей';
    offerValue.querySelector('.popup__text--time').textContent = 'Заезд после ' + completedCard.offer.checkin + ' , выезд до ' + completedCard.offer.checkout;
    offerValue.querySelector('.popup__features').innerHTML = window.getRenamedFeatures(completedCard.offer.features).join(' ');
    offerValue.querySelector('.popup__description').textContent = completedCard.offer.description;
    offerValue.querySelector('.popup__photos').innerHTML = window.getRenamedPhotos(completedCard.offer.photos);
    offerValue.querySelector('.popup__avatar').src = completedCard.author.avatar;

    closePopup.addEventListener('click', function () {
      closeOffer();
    });

    return offerValue;
  };
  var getPhotoName = function (photo) {
    var result = photo.replace(/^.*[\\\/]/, '');
    return result;
  };

  var activateSelects = function (select) {
    for (var k = 0; k < select.length; k++) {
      select[k].removeAttribute('disabled');
    }
  };

  var activateFieldsets = function (fieldset) {
    for (var k = 0; k < fieldset.length; k++) {
      fieldset[k].removeAttribute('disabled');
    }
  };

  var getOfferToPin = function (pinNumber) {
    if (pinNumber.classList.contains('map__pin')) {
      var img = pinNumber.querySelector('img');
      pinNumber = img;
    }
    var card = window.objects.find(function (object) {
      return getPhotoName(object.author.avatar) === getPhotoName(pinNumber.src);
    });
    if (removeDupedOffer.length < 1) {
      mapItem.insertBefore(getOfferPopup(card), filtersContainerValues);
    } else {
      removeDupedOffer[0].replaceWith(getOfferPopup(card));
    }
    document.addEventListener('keydown', closeOfferOnKeydown);
  };

  var mapOfferSearchForMousedown = function (evt) {
    evt.preventDefault();
    var pinNumber = evt.target;
    getOfferToPin(pinNumber);
  };

  var mapOfferSearchForKeydown = function (evt) {
    var pinNumber = evt.target;
    if (evt.keyCode === key.ENTER) {
      getOfferToPin(pinNumber);
    }
  };

  var makePageActive = function () {
    mapItem.classList.remove('map--faded');
    formItem.classList.remove('ad-form--disabled');
    activateFieldsets(mapSelects);
    activateSelects(mapFieldsets);
    pinContainerElem.appendChild(window.renderPins(window.objects));
    for (var k = 1; k < mapPinOffer.length; k++) {
      mapPinOffer[k].addEventListener('mousedown', mapOfferSearchForMousedown);
      mapPinOffer[k].addEventListener('keydown', mapOfferSearchForKeydown);
    }
    window.mapPin.removeEventListener('mousedown', mapPinActiveOnMousedown);
    window.mapPin.removeEventListener('keydown', mapPinActiveOnKeydown);
  };

  var mapPinActiveOnMousedown = function (evt) {
    evt.preventDefault();
    makePageActive();
    window.getAdressOfMark();
  };

  var mapPinActiveOnKeydown = function (evt) {
    if (evt.keyCode === key.ENTER) {
      makePageActive();
      window.getAdressOfMark();
    }
  };

  window.mapPin.addEventListener('mousedown', mapPinActiveOnMousedown);
  window.mapPin.addEventListener('keydown', mapPinActiveOnKeydown);
})();
