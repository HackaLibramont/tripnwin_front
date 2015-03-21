var tripNViewControllers = angular.module('tripNViewControllers', ['tripnwin.services']);

tripNViewControllers.controller('IndexCtrl',
           ['$scope', 'Poi',
  function ( $scope ,  Poi ) {
    $scope.pois = Poi.list();
}]);

tripNViewControllers.controller('MapCtrl', ['$scope', '$q', function ($scope, $q) {

    $scope.center = {};
    $scope.markers = {};

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

      $scope.center.lat = position.coords.latitude;
      $scope.center.lng = position.coords.longitude;
      $scope.center.zoom = 20;
      $scope.center.focus = true;
      $scope.center.draggable= false;

      $scope.markers = {
        center : $scope.center
      }

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
