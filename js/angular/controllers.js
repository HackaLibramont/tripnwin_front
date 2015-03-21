var tripNViewControllers = angular.module('tripNViewControllers', ['tripnwin.services']);

tripNViewControllers.controller('IndexCtrl',
           ['$scope', 'Poi',
  function ( $scope ,  Poi ) {
    $scope.pois = Poi.list();
}]);

tripNViewControllers.controller('MapCtrl', ['$scope', '$http', '$q', function ($scope, $http, $q) {

    var local_icons = {
        default_icon: {},
        leaf_icon: {
            iconUrl: 'examples/img/leaf-green.png',
            shadowUrl: 'examples/img/leaf-shadow.png',
             iconSize:     [38, 95], // size of the icon
            shadowSize:   [50, 64], // size of the shadow
            iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        },
        div_icon: {
            type: 'div',
            iconSize: [230, 0],
            html: 'Using <strong>Bold text as an icon</strong>: Lisbon',
            popupAnchor:  [0, 0]
        },
        orange_leaf_icon: {
            iconUrl: 'examples/img/leaf-orange.png',
            shadowUrl: 'examples/img/leaf-shadow.png',
            iconSize:     [38, 95],
            shadowSize:   [50, 64],
            iconAnchor:   [22, 94],
            shadowAnchor: [4, 62]
        }
    };


    $scope.center = {};
    $scope.markers = [];
    $scope.icons = local_icons;

    var url = 'http://hackathon-server.vm/tripnwin_api/web/index.php/pois';

    $http.get(url).success(function(data){
      data.forEach(function(poi, index, array){

        $scope.markers[poi.id] = {
          lat     : parseFloat(poi.latitude),
          lng     : parseFloat(poi.longitude),
          message : poi.name,
          focus: true,
          draggable: false,
          icon : local_icons.default_icon
        }

      });

      console.log($scope.markers);
    })

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

      $scope.center.icon = local_icons.orange_leaf_icon;

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
