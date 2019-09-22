'use strict';

var OFFER_TITLE = 'Напишите функцию для создания массива из 8 сгенерированных JS объектов.';
var OFFER_AMOUNTS = 8;
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_ROOMS = [1, 2, 3, 100];
var OFFER_GUESTS = [1, 2, 3, 0];
var OFFER_PHOTOS = 4;
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_TIMES = ['12:00', '13:00', '14:00'];
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var mapItem = document.querySelector('.map');

var getRandomArrayElement = function (array) {
  var random = array[Math.floor(Math.random() * array.length)];
  return random;
};

var getRandomElement = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomPhot = function (offerPhoto) {
  var randomPhotosLength = getRandomElement(1, offerPhoto);
  var randomPhotos = [];
  for (var i = 0; i < randomPhotosLength; i++) {
    randomPhotos.push('http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg');
  }
  return randomPhotos;
};

var getRandomFeatures = function (offerFeatures) {
  var randomFeaturesLength = getRandomElement(1, offerFeatures.length);
  var randomFeatures = [];
  for (var i = 0; i < randomFeaturesLength; i++) {
    randomFeatures.push(getRandomArrayElement(offerFeatures));
  }
  return randomFeatures;
};

var getObjMock = function (author, title, types, rooms, guests, pictures, features, times) {
  var offerAdress = [getRandomElement(20, 80), getRandomElement(130, 630)];
  var object = ({
    author: {
      avatar: 'img/avatars/user0' + (author + 1) + '.png'
    },
    offer: {
      title: title,
      address: offerAdress[0] + ', ' + offerAdress[1],
      price: getRandomElement(1000, 10000),
      type: getRandomArrayElement(types),
      rooms: getRandomArrayElement(rooms),
      guests: getRandomArrayElement(guests),
      checkin: getRandomArrayElement(times),
      checkout: getRandomArrayElement(times),
      features: getRandomFeatures(features),
      description: title,
      photos: getRandomPhot(pictures)
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

mapItem.addEventListener('click', function (evt) {
  evt.preventDefault();
  mapItem.classList.remove('map--faded');
});
