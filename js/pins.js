'use strict';

(function () {
  window.mapPin = document.querySelector('.map__pin--main');
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var renderPinFromTemplate = function (offers) {
    var pin = pinTemplate.cloneNode(true);

    pin.style.left = offers.location.x + '%';
    pin.style.top = offers.location.y + 'px';

    var pinImg = pin.querySelector('img');
    pinImg.src = offers.author.avatar;
    pinImg.alt = offers.offer.title;

    return pin;
  };

  window.renderPins = function (arr) {
    var result = document.createDocumentFragment();
    for (var j = 0; j < arr.length; j++) {
      result.appendChild(renderPinFromTemplate(arr[j]));
    }
    return result;
  };
})();
