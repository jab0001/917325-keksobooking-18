'use strict';

(function () {
  var OFFER_AMOUNTS = 8;
  var cardTemplateError = document.querySelector('#error')
    .content
    .querySelector('.error');

  window.getRandomPhoto = function (offerPhoto) {
    var randomPhotos = [];
    for (var i = 0; i < offerPhoto.length; i++) {
      randomPhotos.push('<img src="' + offerPhoto[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
    }
    return randomPhotos;
  };

  window.getRandomFeatures = function (offerFeatures) {
    var randomFeatures = [];
    for (var i = 0; i < offerFeatures.length; i++) {
      randomFeatures.push('<li class="popup__feature popup__feature--' + window.getRandomArrayElement(offerFeatures) + '"></li>');
    }
    return randomFeatures;
  };

  window.getFeaturesSingleElement = function (randomFeaturesArray) {
    var singleFeatArray = [];
    for (var i = 0; i < randomFeaturesArray.length; i++) {
      if (singleFeatArray.indexOf(randomFeaturesArray[i]) < 0) {
        singleFeatArray.push(randomFeaturesArray[i]);
      }
    }
    return singleFeatArray;
  };


  var onError = function () {
    var error = cardTemplateError.cloneNode(true);
    document.body.insertAdjacentElement('afterbegin', error);
  };

  var onSuccess = function (data) {
    window.objects = [];
    for (var i = 0; i < OFFER_AMOUNTS; i++) {
      window.objects.push(data[i]);
    }
  };

  window.load(onSuccess, onError);
})();
