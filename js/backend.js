'use strict';

(function () {
  var timeout = 10000;
  var statusSuccess = 200;

  var createXhr = function (method, takeUrl, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === statusSuccess) {
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
    xhr.timeout = timeout;
    xhr.open(method, takeUrl);
    return xhr;
  };

  window.load = function (onLoad, onError) {
    createXhr('GET', window.Url.LOAD, onLoad, onError)
    .send();
  };

  window.save = function (data, onLoad, onError) {
    createXhr('POST', window.Url.UPLOAD, onLoad, onError)
    .send(data);
  };
})();
