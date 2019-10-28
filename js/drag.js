'use strict';


(function () {
  window.mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var StartCoord = {
      X: evt.clientX,
      Y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var Shift = {
        X: StartCoord.X - moveEvt.clientX,
        Y: StartCoord.Y - moveEvt.clientY
      };

      StartCoord = {
        X: moveEvt.clientX,
        Y: moveEvt.clientY
      };

      var Mark = {
        coordinateX: window.mapPinMain.offsetLeft - Shift.X,
        coordinateY: window.mapPinMain.offsetTop - Shift.Y
      };

      if (Mark.coordinateX >= window.Limit.Xmin && Mark.coordinateX <= window.Limit.Xmax - window.mapPinMain.offsetWidth) {
        window.mapPinMain.style.left = Mark.coordinateX + 'px';
      }
      if (Mark.coordinateY >= window.Limit.Ymin - (window.mapPinMain.offsetHeight + window.PIN_HEIGHT) && Mark.coordinateY <= window.Limit.Ymax - (window.mapPinMain.offsetHeight + window.PIN_HEIGHT)) {
        window.mapPinMain.style.top = Mark.coordinateY + 'px';
      }

      window.getAdressOfMark();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          window.mapPinMain.removeEventListener('click', onClickPreventDefault);
        };
        window.mapPinMain.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
