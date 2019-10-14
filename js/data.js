'use strict';

(function () {
  var OFFER_AMOUNTS = 8;
  window.cardTemplateError = document.querySelector('#error')
    .content
    .querySelector('.error');
  window.key = {
    ENTER: 13,
    ESC: 27
  };

  var onError = function (message) {
    var error = window.cardTemplateError.cloneNode(true);
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
