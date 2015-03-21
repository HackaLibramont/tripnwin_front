var tripNViewControllers = angular.module('tripNViewControllers', ['tripnwin.services']);

tripNViewControllers.controller('IndexCtrl',
           ['$scope', 'Poi',
  function ( $scope ,  Poi ) {
    console.log(Poi.list());
}]);

tripNViewControllers.controller('MapCtrl', ['$scope',
  function ($scope) {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      $scope.center.lat = position.coords.latitude;
      $scope.center.lng = position.coords.longitude;
      $scope.center.zoom = 20;
      $scope.markers.push($scope.center)
    });

    angular.extend($scope, {
      center: {
        lat : null,
        lng : null,
        zoom : 10
      },
      defaults: {
          scrollWheelZoom: true
      },
      markers : {}
    });
  }

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
