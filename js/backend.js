"use strict";

(function () {
  var createXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.addEventListener("load", function () {
      if (xhr.status === window.const.statusSuccess) {
        onLoad(xhr.response);
      } else {
        onError("Статус ответа: " + xhr.status + " " + xhr.statusText);
      }
    });
    xhr.addEventListener("error", function () {
      onError("Произошла ошибка соединения");
    });
    xhr.addEventListener("timeout", function () {
      onError("Запрос не успел выполниться за " + xhr.timeout + "мс");
    });
    xhr.timeout = window.const.timeout;

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = createXhr(onLoad, onError);
    xhr.open("GET", window.const.url.LOAD + "/data");
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = createXhr(onLoad, onError);
    xhr.open("POST", window.const.url.UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save,
  };
})();
