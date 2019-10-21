'use strict';


(function () {
  window.mapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mark = {
        coordinateX: window.mapPin.offsetLeft - shift.x,
        coordinateY: window.mapPin.offsetTop - shift.y
      };

      if (mark.coordinateX >= window.limit.Xmin && mark.coordinateX <= window.limit.Xmax - window.mapPin.offsetWidth) {
        window.mapPin.style.left = mark.coordinateX + 'px';
      }
      if (mark.coordinateY >= window.limit.Ymin - (window.mapPin.offsetHeight + window.PIN_HEIGHT) && mark.coordinateY <= window.limit.Ymax - (window.mapPin.offsetHeight + window.PIN_HEIGHT)) {
        window.mapPin.style.top = mark.coordinateY + 'px';
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
