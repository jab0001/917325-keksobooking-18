'use strict';

(function () {
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var filtersContainerValues = window.map.querySelector('.map__filters-container');

  window.closeOffer = function () {
    var card = document.querySelector('.popup');
    if (card) {
      card.remove();
    }
  };

  var closeOfferOnKeydown = function (evt) {
    if (evt.keyCode === window.Key.ESC) {
      window.closeOffer();
    }
  };

  var getOfferPopup = function (completedCard) {
    var offerValue = cardTemplate.cloneNode(true);
    var closePopup = offerValue.querySelector('.popup__close');

    offerValue.querySelector('.popup__title').textContent = completedCard.offer.title;
    offerValue.querySelector('.popup__text--address').textContent = completedCard.offer.address;
    offerValue.querySelector('.popup__text--price').textContent = completedCard.offer.price + ' ₽/ночь';
    offerValue.querySelector('.popup__type').textContent = window.Type[completedCard.offer.type.toUpperCase()];
    offerValue.querySelector('.popup__text--capacity').textContent = completedCard.offer.rooms + ' комнаты для ' + completedCard.offer.guests + ' гостей';
    offerValue.querySelector('.popup__text--time').textContent = 'Заезд после ' + completedCard.offer.checkin + ' , выезд до ' + completedCard.offer.checkout;
    offerValue.querySelector('.popup__description').textContent = completedCard.offer.description;
    offerValue.querySelector('.popup__avatar').src = completedCard.author.avatar;

    offerValue.querySelector('.popup__features').innerText = '';
    if (completedCard.offer.features.length) {
      offerValue.querySelector('.popup__features').appendChild(window.getFeatures(completedCard.offer.features));
    } else {
      offerValue.querySelector('.popup__features').classList.add('hidden');
    }

    if (completedCard.offer.photos.length) {
      offerValue.querySelector('.popup__photos').removeChild(offerValue.querySelector('.popup__photo'));
      offerValue.querySelector('.popup__photos').appendChild(window.getPhotos(completedCard.offer.photos));
    } else {
      offerValue.querySelector('.popup__photos').innerText = '';
      offerValue.querySelector('.popup__photos').classList.add('hidden');
    }

    closePopup.addEventListener('click', function () {
      window.closeOffer();
    });
    return offerValue;
  };

  var getOfferToPin = function (target) {
    var removeDupedOffer = window.map.querySelectorAll('.popup');
    if (target.classList.contains('map__pin')) {
      var img = target.querySelector('img');
      target = img;
    }
    var card = window.objects.find(function (object) {
      return window.getPhotoName(object.author.avatar) === window.getPhotoName(target.src);
    });
    if (removeDupedOffer.length < 1) {
      window.map.insertBefore(getOfferPopup(card), filtersContainerValues);
    } else {
      removeDupedOffer[0].replaceWith(getOfferPopup(card));
    }
    document.addEventListener('keydown', closeOfferOnKeydown);
  };

  window.mapOfferSearchForMousedown = function (evt) {
    evt.preventDefault();
    var pinNumber = evt.target;
    getOfferToPin(pinNumber);
  };

  window.mapOfferSearchForKeydown = function (evt) {
    var pinNumber = evt.target;
    if (evt.keyCode === window.Key.ENTER) {
      getOfferToPin(pinNumber);
    }
  };
})();
