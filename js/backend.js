'use strict';

(function () {
  var url = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking'
  };

  var createXhr = function (method, takeUrl, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
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
    xhr.open(method, takeUrl);
    return xhr;
  };

  window.load = function (onLoad, onError) {
    createXhr('GET', url.LOAD, onLoad, onError)
    .send();
  };

  window.save = function (data, onLoad, onError) {
    createXhr('POST', url.UPLOAD, onLoad, onError)
    .send(data);
  };
})();
