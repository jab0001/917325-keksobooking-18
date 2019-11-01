'use strict';

(function () {
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
})();
