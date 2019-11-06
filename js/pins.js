'use strict';

(function () {
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

    pin.addEventListener('click', function () {
      makePinsUnactive();
      pin.classList.add('map__pin--active');
    });
    return pin;
  };

  var makePinsUnactive = function () {
    document.querySelectorAll('.map__pin').forEach(function (pinItem) {
      pinItem.classList.remove('map__pin--active');
    });
  };

  var renderPins = function (arr) {
    var dataLength = arr.length > window.const.offerAmounts ? window.const.offerAmounts : arr.length;
    var result = document.createDocumentFragment();
    for (var j = 0; j < dataLength; j++) {
      result.appendChild(renderPinFromTemplate(arr[j]));
    }
    return result;
  };

  var removePins = function (arr) {
    for (var i = 1; i < arr.length; i++) {
      arr[i].remove();
    }
  };

  window.pins = {
    render: renderPins,
    remove: removePins
  };
})();
