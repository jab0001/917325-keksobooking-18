'use strict';

(function () {
  var OFFER_AMOUNTS = 8;

  var getRandomPhoto = function (offerPhoto) {
    var randomPhotosLength = window.getRandomElement(1, offerPhoto);
    var randomPhotos = [];
    for (var i = 0; i < randomPhotosLength; i++) {
      randomPhotos.push('<img src="http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
    }
    return randomPhotos;
  };

  var getRandomFeatures = function (offerFeatures) {
    var randomFeaturesLength = window.getRandomElement(1, offerFeatures.length);
    var randomFeatures = [];
    for (var i = 0; i < randomFeaturesLength; i++) {
      randomFeatures.push('<li class="popup__feature popup__feature--' + window.getRandomArrayElement(offerFeatures) + '"></li>');
    }
    return randomFeatures;
  };

  var getFeaturesSingleElement = function (randomFeaturesArray) {
    var singleFeatArray = [];
    for (var i = 0; i < randomFeaturesArray.length; i++) {
      if (singleFeatArray.indexOf(randomFeaturesArray[i]) < 0) {
        singleFeatArray.push(randomFeaturesArray[i]);
      }
    }
    return singleFeatArray;
  };

  var getObjMock = function (author, title, types, rooms, guests, pictures, features, times) {
    var offerAdress = [window.getRandomElement(20, 80), window.getRandomElement(130, 630)];
    var object = ({
      author: {
        avatar: 'img/avatars/user0' + (author + 1) + '.png'
      },
      offer: {
        title: title,
        address: offerAdress.join(' ,'),
        price: window.getRandomElement(1000, 10000),
        type: window.getRandomArrayElement(Object.values(types)),
        rooms: window.getRandomArrayElement(rooms),
        guests: window.getRandomArrayElement(guests),
        checkin: window.getRandomArrayElement(times),
        checkout: window.getRandomArrayElement(times),
        features: getFeaturesSingleElement(getRandomFeatures(features)),
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

  window.objects = [];
  for (var i = 0; i < OFFER_AMOUNTS; i++) {
    window.objects.push(getObjMock(i, window.offer.TITLE, window.offer.TYPE, window.offer.ROOMS, window.offer.GUESTS, window.offer.PHOTOS, window.offer.FEATURES, window.offer.TIMES));
  }
})();
