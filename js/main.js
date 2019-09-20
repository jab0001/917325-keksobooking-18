'use strict';

var OFFER_TITLE = 'Напишите функцию для создания массива из 8 сгенерированных JS объектов.';
var OFFER_AMOUNTS = 8;
var OFFER_ADDRESS = '600, 350';
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_ROOMS = [1, 2, 3, 100];
var OFFER_GUESTS = [1, 2, 3, 0];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var OFFER_TIME = [12, 13, 14];
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var mapItem = document.querySelector('.map');

mapItem.classList.remove('map--faded');

var getRandomArrayElement = function (array) {
  var random = array[Math.floor(Math.random() * array.length)];
  return random;
};

var getRandomElements = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getObjMock = function (author, title, address, type, rooms, guests, features, photos, time) {
  var object = ({
    author: {
      avatar: 'img/avatars/user0' + (author + 1) + '.png'
    },
    offer: {
      title: title,
      address: getRandomArrayElement(address),
      price: getRandomElements(1000, 10000),
      type: getRandomArrayElement(type),
      rooms: getRandomArrayElement(rooms),
      guests: getRandomArrayElement(guests),
      checkin: getRandomArrayElement(time) + ':00',
      checkout: getRandomArrayElement(time) + ':00',
      features: getRandomArrayElement(features),
      description: title,
      photos: getRandomArrayElement(photos)
    },
    location: {
      x: getRandomElements(0, 100),
      y: getRandomElements(0, 100)
    }
  });
  return object;
};

var objects = [];
for (var i = 0; i < OFFER_AMOUNTS; i++) {
  objects.push(getObjMock(i, OFFER_TITLE, OFFER_ADDRESS, OFFER_TYPE, OFFER_ROOMS, OFFER_GUESTS, OFFER_FEATURES, OFFER_PHOTOS, OFFER_TIME));
}

var renderPinFromTemplate = function (coordinate) {
  var pin = pinTemplate.cloneNode(true);

  pin.style.left = coordinate.location.x + '%';
  pin.style.top = coordinate.location.y + '%';

  var pinImg = pin.querySelector('img');
  pinImg.src = coordinate.author.avatar;
  pinImg.alt = coordinate.offer.title;

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
/*
var getObjWizard = function (wizardName, wizardSurName, wizardCoat, wizardEyes) {
  return {
    name: getRandomArrayElement(wizardName),
    surName: getRandomArrayElement(wizardSurName),
    coatColor: getRandomArrayElement(wizardCoat),
    eyesColor: getRandomArrayElement(wizardEyes)
  };
};

var wizards = [];
for (var i = 0; i < WIZARDS_COUNT; i++) {
  wizards.push(getObjWizard(NAMES, SUR_NAMES, COAT_COLORS, EYES_COLORS));
}

var renderWizard = function (mage) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = mage.name + ' ' + mage.surName;
  wizardElement.querySelector('.wizard-coat').style.fill = mage.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = mage.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < wizards.length; j++) {
  fragment.appendChild(renderWizard(wizards[j]));
}
similarListElement.appendChild(fragment);

setup.querySelector('.setup-similar').classList.remove('hidden');

setupOpen.addEventListener('click', function (evt) {
  evt.preventDefault();
  setup.classList.remove('hidden');
});

setupClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  setup.classList.add('hidden');
});
*/
