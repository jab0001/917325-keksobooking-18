'use strict';

(function () {
  var getRandomArrayElement = function (array) {
    var random = array[Math.floor(Math.random() * array.length)];
    return random;
  };

  var getRandomElement = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getPhotoName = function (photo) {
    var result = photo.replace(/^.*[\\\/]/, '');
    return result;
  };

  window.utils = {
    randomArray: getRandomArrayElement,
    randomElement: getRandomElement,
    photoName: getPhotoName
  };
})();
