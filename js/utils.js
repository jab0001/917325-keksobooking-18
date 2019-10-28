'use strict';

(function () {
  var photoTemplateOffer = document.querySelector('template')
    .content
    .querySelector('.popup__photo');

  window.getRandomArrayElement = function (array) {
    var random = array[Math.floor(Math.random() * array.length)];
    return random;
  };

  window.getRandomElement = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.getPhotoName = function (photo) {
    var result = photo.replace(/^.*[\\\/]/, '');
    return result;
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
})();
