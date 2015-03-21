var tripNViewControllers = angular.module('tripNViewControllers', ['tripnwin.services']);

tripNViewControllers.controller('IndexCtrl',
           ['$scope', 'Poi',
  function ( $scope ,  Poi ) {
}]);

tripNViewControllers.controller('MapCtrl', ['$scope', '$http', '$q', 'Poi', function ($scope, $http, $q, Poi) {

    var local_icons = {
        default_icon: {},
        div_icon: {
            type: 'div',
            iconSize: [230, 0],
            html: 'Using <strong>Bold text as an icon</strong>: Lisbon',
            popupAnchor:  [0, 0]
        },
    };


    $scope.center = {};
    $scope.markers = [];
    $scope.icons = local_icons;

    Poi.list(function(data){

      console.log(data);

      data.forEach(function(poi, index, array){

        $scope.markers[poi.id] = {
          lat     : parseFloat(poi.latitude),
          lng     : parseFloat(poi.longitude),
          message : '<h5>' + poi.name + '</h5><p>' + poi.description.substring(0,40)+ '... <a href="#/poi/' + poi.id +'">Plus...</a></p>',
          focus: true,
          draggable: false,
          icon : local_icons.default_icon
        }

      });
    });

    var getPosition = function(){

      var deferred = $q.defer();

      if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function(position){

          deferred.resolve(position);

        });

      }

      return deferred.promise;

    }

    getPosition().then(function(position){

      // $scope.center.lat = position.coords.latitude;
      // $scope.center.lng = position.coords.longitude;

      $scope.center.lat = 50.000190;
      $scope.center.lng = 5.715686;

      $scope.center.zoom = 15;
      $scope.center.focus = true;
      $scope.center.draggable= false;

      $scope.center.icon = local_icons.div_icon;

      $scope.markers[0] = $scope.center

    });

}]);

tripNViewControllers.controller('LoginCtrl', ['$scope',
  function ($scope) {

}]);

tripNViewControllers.controller('PoiCtrl', ['$scope',
  function ($scope) {

}]);

tripNViewControllers.controller('LooseCtrl', ['$scope',
  function ($scope) {

}]);

tripNViewControllers.controller('WinCtrl', ['$scope',
  function ($scope) {

}]);
