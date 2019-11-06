'use strict';


(function () {
  window.map.pinMain.addEventListener('mousedown', function (evt) {
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
        coordinateX: window.map.pinMain.offsetLeft - Shift.X,
        coordinateY: window.map.pinMain.offsetTop - Shift.Y
      };

      if (Mark.coordinateX >= window.const.limit.Xmin && Mark.coordinateX <= window.const.limit.Xmax - window.map.pinMain.offsetWidth) {
        window.map.pinMain.style.left = Mark.coordinateX + 'px';
      }
      if (Mark.coordinateY >= window.const.limit.Ymin - (window.map.pinMain.offsetHeight + window.const.pinHeight) && Mark.coordinateY <= window.const.limit.Ymax - (window.map.pinMain.offsetHeight + window.const.pinHeight)) {
        window.map.pinMain.style.top = Mark.coordinateY + 'px';
      }

      window.map.adressOfMark();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          window.map.pinMain.removeEventListener('click', onClickPreventDefault);
        };
        window.map.pinMain.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
