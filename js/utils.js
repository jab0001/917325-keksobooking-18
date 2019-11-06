'use strict';

(function () {
  var getPhotoName = function (photo) {
    var result = photo.replace(/^.*[\\\/]/, '');
    return result;
  };

  window.utils = {
    getPhotoName: getPhotoName
  };
})();
