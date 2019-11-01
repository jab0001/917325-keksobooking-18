'use strict';

(function () {
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var filtersContainerValue = window.map.querySelector('.map__filters-container');
  var photoTemplateOffer = document.querySelector('template')
    .content
    .querySelector('.popup__photo');

  window.closeCardOffer = function () {
    var card = document.querySelector('.popup');
    if (card) {
      card.remove();
    }
  };

  window.getPhotos = function (photosArray) {
    var result = document.createDocumentFragment();
    for (var i = 0; i < photosArray.length; i++) {
      var photo = photoTemplateOffer.cloneNode(true);
      photo.src = photosArray[i];
      result.appendChild(photo);
    }
    return result;
  };

  window.getFeatures = function (featuresArray) {
    var result = document.createDocumentFragment();
    for (var i = 0; i < featuresArray.length; i++) {
      var feature = document.createElement('li');
      feature.className = 'popup__feature popup__feature--' + featuresArray[i];
      result.appendChild(feature);
    }
    return result;
  };

  var closeOfferOnKeydown = function (evt) {
    if (evt.keyCode === window.Key.ESC) {
      window.closeCardOffer();
    }
  };

  var getOfferCardPopup = function (completedCard) {
    var cardElement = cardTemplate.cloneNode(true);
    var buttonPopupClose = cardElement.querySelector('.popup__close');

    cardElement.querySelector('.popup__title').textContent = completedCard.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = completedCard.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = completedCard.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = window.TypeHousingMap[completedCard.offer.type.toUpperCase()];
    cardElement.querySelector('.popup__text--capacity').textContent = completedCard.offer.rooms + ' комнаты для ' + completedCard.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + completedCard.offer.checkin + ' , выезд до ' + completedCard.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = completedCard.offer.description;
    cardElement.querySelector('.popup__avatar').src = completedCard.author.avatar;

    cardElement.querySelector('.popup__features').innerText = '';
    if (completedCard.offer.features.length) {
      cardElement.querySelector('.popup__features').appendChild(window.getFeatures(completedCard.offer.features));
    } else {
      cardElement.querySelector('.popup__features').remove();
    }

    if (completedCard.offer.photos.length) {
      cardElement.querySelector('.popup__photos').removeChild(cardElement.querySelector('.popup__photo'));
      cardElement.querySelector('.popup__photos').appendChild(window.getPhotos(completedCard.offer.photos));
    } else {
      cardElement.querySelector('.popup__photos').remove();
    }

    buttonPopupClose.addEventListener('click', function () {
      window.closeCardOffer();
    });
    return cardElement;
  };

  var getConformityCardToPin = function (target) {
    var offerCards = window.map.querySelectorAll('.popup');
    if (target.classList.contains('map__pin')) {
      var img = target.querySelector('img');
      target = img;
    }
    var card = window.objects.find(function (object) {
      return window.getPhotoName(object.author.avatar) === window.getPhotoName(target.src);
    });
    window.map.insertBefore(getOfferCardPopup(card), filtersContainerValue);
    if (offerCards.length) {
      offerCards[0].remove();
    }
    document.addEventListener('keydown', closeOfferOnKeydown);
  };

  window.onMousedownMapOfferSearch = function (evt) {
    evt.preventDefault();
    var pinNumber = evt.target;
    getConformityCardToPin(pinNumber);
  };

  window.OnKeydownMapOfferSearch = function (evt) {
    var pinNumber = evt.target;
    if (evt.keyCode === window.Key.ENTER) {
      getConformityCardToPin(pinNumber);
    }
  };
})();
