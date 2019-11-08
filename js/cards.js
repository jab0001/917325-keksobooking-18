'use strict';

(function () {
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var filtersContainer = window.map.pinsArea.querySelector('.map__filters-container');
  var offerPhotoTemplate = document.querySelector('template')
    .content
    .querySelector('.popup__photo');

  var getPhotoName = function (photo) {
    var result = photo.replace(/^.*[\\\/]/, '');
    return result;
  };

  var closeOfferCard = function () {
    var card = document.querySelector('.popup');
    if (card) {
      card.remove();
    }
  };

  var getPhotos = function (photos) {
    var result = document.createDocumentFragment();
    photos.forEach(function (photo) {
      var photoNode = offerPhotoTemplate.cloneNode(true);
      photoNode.src = photo;
      result.appendChild(photoNode);
    });
    return result;
  };

  var getFeatures = function (features) {
    var result = document.createDocumentFragment();
    features.forEach(function (feature) {
      var featureNode = document.createElement('li');
      featureNode.className = 'popup__feature popup__feature--' + feature;
      result.appendChild(featureNode);
    });
    return result;
  };

  var onOfferCardKeydown = function (evt) {
    if (evt.keyCode === window.const.key.ESC) {
      closeOfferCard();
    }
  };

  var getOfferCardPopup = function (completedCard) {
    var cardElement = cardTemplate.cloneNode(true);
    var buttonPopupClose = cardElement.querySelector('.popup__close');

    cardElement.querySelector('.popup__title').textContent = completedCard.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = completedCard.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = completedCard.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = window.const.typeHousingMap[completedCard.offer.type.toUpperCase()];
    cardElement.querySelector('.popup__text--capacity').textContent = completedCard.offer.rooms + ' комнаты для ' + completedCard.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + completedCard.offer.checkin + ' , выезд до ' + completedCard.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = completedCard.offer.description;
    cardElement.querySelector('.popup__avatar').src = completedCard.author.avatar;

    cardElement.querySelector('.popup__features').innerText = '';
    if (completedCard.offer.features.length) {
      cardElement.querySelector('.popup__features').appendChild(getFeatures(completedCard.offer.features));
    } else {
      cardElement.querySelector('.popup__features').remove();
    }

    if (completedCard.offer.photos.length) {
      cardElement.querySelector('.popup__photos').removeChild(cardElement.querySelector('.popup__photo'));
      cardElement.querySelector('.popup__photos').appendChild(getPhotos(completedCard.offer.photos));
    } else {
      cardElement.querySelector('.popup__photos').remove();
    }

    buttonPopupClose.addEventListener('click', function () {
      closeOfferCard();
    });
    return cardElement;
  };

  var getCardToPin = function (target) {
    var offerCards = window.map.pinsArea.querySelectorAll('.popup');
    if (target.classList.contains('map__pin')) {
      var img = target.querySelector('img');
      target = img;
    }
    var card = window.objects.find(function (object) {
      return getPhotoName(object.author.avatar) === getPhotoName(target.src);
    });
    window.map.pinsArea.insertBefore(getOfferCardPopup(card), filtersContainer);
    if (offerCards.length) {
      offerCards[0].remove();
    }
    document.addEventListener('keydown', onOfferCardKeydown);
  };

  var onMousedownMapOffer = function (evt) {
    evt.preventDefault();
    var pinNumber = evt.target;
    getCardToPin(pinNumber);
  };

  var onKeydownMapOffer = function (evt) {
    var pinNumber = evt.target;
    if (evt.keyCode === window.const.key.ENTER) {
      getCardToPin(pinNumber);
    }
  };

  window.cards = {
    onMousedownOffer: onMousedownMapOffer,
    onKeydownOffer: onKeydownMapOffer,
    closeOffer: closeOfferCard
  };
})();
