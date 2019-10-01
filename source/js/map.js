ymaps.ready(function () {
  var myMap = new ymaps.Map('map', {
          center: [59.938576, 30.322858],
          zoom: 17
      }, {
          searchControlProvider: 'yandex#search'
      }),

      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      ),

      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
          hintContent: 'Собственный значок метки Мишки',
          balloonContent: 'Это красивая метка Мишки'
      }, {
          iconLayout: 'default#image',
          iconImageHref: 'img/icon-map-pin.svg',
          iconImageSize: [67, 100],
          iconImageOffset: [-22, -85]
      });

  myMap.geoObjects
      .add(myPlacemark)
});
