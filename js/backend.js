'use strict';

(function () {
  var createXhr = function (method, takeUrl, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === window.const.statusSuccess) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = window.const.timeout;
    xhr.open(method, takeUrl);
    return xhr;
  };

  var load = function (onLoad, onError) {
    createXhr('GET', window.const.url.LOAD, onLoad, onError)
      .send();
  };

  var save = function (data, onLoad, onError) {
    createXhr('POST', window.const.url.UPLOAD, onLoad, onError)
      .send(data);
  };

  window.backend = {
    fromServer: load,
    toServer: save,
  };
})();
