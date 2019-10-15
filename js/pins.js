'use strict';

(function () {
  window.mapPinOffer = window.pinContainerElem.getElementsByTagName('button');

  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var renderPinFromTemplate = function (offer) {
    var pin = pinTemplate.cloneNode(true);

    pin.style.left = offer.location.x + 'px';
    pin.style.top = offer.location.y + 'px';

    var pinImg = pin.querySelector('img');
    pinImg.src = offer.author.avatar;
    pinImg.alt = offer.offer.title;

    return pin;
  };

  window.renderPins = function (arr) {
    var result = document.createDocumentFragment();
    for (var j = 0; j < arr.length; j++) {
      result.appendChild(renderPinFromTemplate(arr[j]));
    }
    return result;
  };

  window.removePins = function (arr) {
    for (var i = 1; i < arr.length; i++) {
      arr[i].remove();
    }
  };
})();
