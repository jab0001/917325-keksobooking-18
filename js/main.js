'use strict';

var OFFER_TITLE = 'Напишите функцию для создания массива из 8 сгенерированных JS объектов.';
var OFFER_AMOUNTS = 8;
var OFFER_TYPE = {
  palace: 'дворец',
  flat: 'квартира',
  house: 'дом',
  bungalo: 'бунгало'
};
var OFFER_ROOMS = [1, 2, 3, 100];
var OFFER_GUESTS = [1, 2, 3, 0];
var OFFER_PHOTOS = 3;
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_TIMES = ['12:00', '13:00', '14:00'];
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var mapItem = document.querySelector('.map');
var ENTER_KEY = 13;

var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');


var getRandomArrayElement = function (array) {
  var random = array[Math.floor(Math.random() * array.length)];
  return random;
};

var getRandomElement = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomPhoto = function (offerPhoto) {
  var randomPhotosLength = getRandomElement(1, offerPhoto);
  var randomPhotos = [];
  for (var i = 0; i < randomPhotosLength; i++) {
    randomPhotos.push('<img src="http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
  }
  return randomPhotos;
};

var getRandomFeatures = function (offerFeatures) {
  var randomFeaturesLength = getRandomElement(1, offerFeatures.length);
  var randomFeatures = [];
  for (var i = 0; i < randomFeaturesLength; i++) {
    randomFeatures.push('<li class="popup__feature popup__feature--' + getRandomArrayElement(offerFeatures) + '"></li>');
  }
  return randomFeatures;
};

var getFeaturesSingleElem = function (randomFeaturesArray) {
  var singleFeatArray = [];
  for (var i = 0; i < randomFeaturesArray.length; i++) {
    if (singleFeatArray.indexOf(randomFeaturesArray[i]) < 0) {
      singleFeatArray.push(randomFeaturesArray[i]);
    }
  }
  return singleFeatArray;
};

var getObjMock = function (author, title, types, rooms, guests, pictures, features, times) {
  var offerAdress = [getRandomElement(20, 80), getRandomElement(130, 630)];
  var object = ({
    author: {
      avatar: 'img/avatars/user0' + (author + 1) + '.png'
    },
    offer: {
      title: title,
      address: offerAdress.join(' ,'),
      price: getRandomElement(1000, 10000),
      type: getRandomArrayElement(Object.values(types)),
      rooms: getRandomArrayElement(rooms),
      guests: getRandomArrayElement(guests),
      checkin: getRandomArrayElement(times),
      checkout: getRandomArrayElement(times),
      features: getFeaturesSingleElem(getRandomFeatures(features)),
      description: title,
      photos: getRandomPhoto(pictures)
    },
    location: {
      x: offerAdress[0],
      y: offerAdress[1]
    }
  });
  return object;
};

var objects = [];
for (var i = 0; i < OFFER_AMOUNTS; i++) {
  objects.push(getObjMock(i, OFFER_TITLE, OFFER_TYPE, OFFER_ROOMS, OFFER_GUESTS, OFFER_PHOTOS, OFFER_FEATURES, OFFER_TIMES));
}

var renderPinFromTemplate = function (offers) {
  var pin = pinTemplate.cloneNode(true);

  pin.style.left = offers.location.x + '%';
  pin.style.top = offers.location.y + 'px';

  var pinImg = pin.querySelector('img');
  pinImg.src = offers.author.avatar;
  pinImg.alt = offers.offer.title;

  return pin;
};

var renderPins = function (arr) {
  var result = document.createDocumentFragment();
  for (var j = 0; j < arr.length; j++) {
    result.appendChild(renderPinFromTemplate(arr[j]));
  }
  return result;
};

var pinContainerElem = mapItem.querySelector('.map__pins');
pinContainerElem.appendChild(renderPins(objects));

var getOfferPopup = function (completedCards) {
  var offerValue = cardTemplate.cloneNode(true);

  offerValue.querySelector('.popup__title').textContent = completedCards.offer.title;
  offerValue.querySelector('.popup__text--address').textContent = completedCards.offer.address;
  offerValue.querySelector('.popup__text--price').textContent = completedCards.offer.price + ' ₽/ночь';
  offerValue.querySelector('.popup__type').textContent = completedCards.offer.type;
  offerValue.querySelector('.popup__text--capacity').textContent = completedCards.offer.rooms + ' комнаты для ' + completedCards.offer.guests + ' гостей';
  offerValue.querySelector('.popup__text--time').textContent = 'Заезд после ' + completedCards.offer.checkin + ' , выезд до ' + completedCards.offer.checkout;
  offerValue.querySelector('.popup__features').innerHTML = completedCards.offer.features.join(' ');
  offerValue.querySelector('.popup__description').textContent = completedCards.offer.description;
  offerValue.querySelector('.popup__photos').innerHTML = completedCards.offer.photos.join(' ');
  offerValue.querySelector('.popup__avatar').src = completedCards.author.avatar;

  return offerValue;
};

var filtersContainerValues = mapItem.querySelector('.map__filters-container');
mapItem.insertBefore(getOfferPopup(objects[0]), filtersContainerValues);

var mapPin = mapItem.querySelector('.map__pin--main');
var formItem = document.querySelector('.ad-form');
var mapSelects = document.getElementsByTagName('select');
var mapFieldsets = document.getElementsByTagName('fieldset');
var addressCoordinate = document.querySelector('input[name="address"]');
var addressOfMark = [mapPin.style.left, mapPin.style.top];
var roomsNumber = document.querySelector('select[name="rooms"]');
var capacityNumber = document.querySelector('select[name="capacity"]');

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

var makePageActive = function () {
  mapItem.classList.remove('map--faded');
  formItem.classList.remove('ad-form--disabled');
  activateFieldsets(mapSelects);
  activateSelects(mapFieldsets);
};

mapPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  makePageActive();
  addressCoordinate.placeholder = addressOfMark.join(' ,');

});

mapPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY) {
    makePageActive();
  }
});

var checkCapacityAndRooms = function () {
  var rooms = roomsNumber.value;
  var capacity = capacityNumber.value;
  if (rooms < capacity) {
    roomsNumber.setCustomValidity('для гостей нужно больше комнат');
  } else if (rooms === 100 && capacity !== 0) {
    roomsNumber.setCustomValidity('для комерческого помещения нужно выбрать 0 гостей');
  } else if (rooms !== 100 && capacity === 0) {
    roomsNumber.setCustomValidity('для 0 гостей нужно выбрать комерческое помещение');
  } else if (rooms === 100 && capacity === 0) {
    roomsNumber.setCustomValidity('');
  } else {
    roomsNumber.setCustomValidity('');
  }
};

capacityNumber.addEventListener('change', function () {
  checkCapacityAndRooms();
});

roomsNumber.addEventListener('change', function () {
  checkCapacityAndRooms();
});
