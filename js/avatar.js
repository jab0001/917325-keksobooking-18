'use strict';

(function () {
  var avatarFileChooser = document.querySelector('.ad-form-header__upload input[type=file]');
  window.avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoFileChooser = document.querySelector('.ad-form__upload input[type=file]');
  window.photoPreview = document.querySelector('.ad-form__photo');

  var photoChanger = function (evt) {
    var fileChooser = evt.target;
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = window.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (evt.target === avatarFileChooser) {
          window.avatarPreview.src = reader.result;
        }
        if (evt.target === photoFileChooser) {
          window.photoPreview.style.background = 'url(' + reader.result + ') no-repeat';
          window.photoPreview.style.backgroundSize = 'cover';
        }
      });

      reader.readAsDataURL(file);
    }
  };

  avatarFileChooser.addEventListener('change', photoChanger);
  photoFileChooser.addEventListener('change', photoChanger);
})();
