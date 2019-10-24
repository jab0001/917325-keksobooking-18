'use strict';


(function () {
  window.mapPin.addEventListener('mousedown', function (evt) {
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
        coordinateX: window.mapPin.offsetLeft - Shift.X,
        coordinateY: window.mapPin.offsetTop - Shift.Y
      };

      if (Mark.coordinateX >= window.Limit.Xmin && Mark.coordinateX <= window.Limit.Xmax - window.mapPin.offsetWidth) {
        window.mapPin.style.left = Mark.coordinateX + 'px';
      }
      if (Mark.coordinateY >= window.Limit.Ymin - (window.mapPin.offsetHeight + window.PIN_HEIGHT) && Mark.coordinateY <= window.Limit.Ymax - (window.mapPin.offsetHeight + window.PIN_HEIGHT)) {
        window.mapPin.style.top = Mark.coordinateY + 'px';
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
          window.mapPin.removeEventListener('click', onClickPreventDefault);
        };
        window.mapPin.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
