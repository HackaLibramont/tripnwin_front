var tripNViewControllers = angular.module('tripNViewControllers', ['tripnwin.services']);

tripNViewControllers.controller('IndexCtrl',
           ['$scope', 'Poi',
  function ( $scope ,  Poi ) {
    console.log(Poi.list());
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