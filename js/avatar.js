'use strict';

(function () {
  var avatarFileChooser = document.querySelector('.ad-form-header__upload input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoFileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoPreview = document.querySelector('.ad-form__photo');

  var onPhotoChange = function (evt) {
    var fileChooser = evt.target;
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = window.const.fileTypes.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (evt.target === avatarFileChooser) {
          avatarPreview.src = reader.result;
        }
        if (evt.target === photoFileChooser) {
          photoPreview.style.background = 'url(' + reader.result + ') no-repeat';
          photoPreview.style.backgroundSize = 'cover';
        }
      });

      reader.readAsDataURL(file);
    }
  };

  avatarFileChooser.addEventListener('change', onPhotoChange);
  photoFileChooser.addEventListener('change', onPhotoChange);

  window.avatar = {
    avatarPreview: avatarPreview,
    photoPreview: photoPreview
  };
})();
