'use strict';

(function () {
  var OFFER_AMOUNTS = 8;
  var cardTemplateError = document.querySelector('#error')
    .content
    .querySelector('.error');
  window.key = {
    ENTER: 13,
    ESC: 27
  };

  window.getRenamedPhotos = function (offerPhoto) {
    var result = [];
    for (var i = 0; i < offerPhoto.length; i++) {
      result.push('<img src="' + offerPhoto[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
    }
    return result;
  };

  window.getRenamedFeatures = function (offerFeatures) {
    var result = [];
    for (var i = 0; i < offerFeatures.length; i++) {
      result.push('<li class="popup__feature popup__feature--' + offerFeatures[i] + '"></li>');
    }
    return result;
  };

  var onError = function (message) {
    var error = cardTemplateError.cloneNode(true);
    error.querySelector('.error__message').textContent = message;
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
