var tripNViewControllers = angular.module('tripNViewControllers', []);

tripNViewControllers.controller('IndexCtrl', ['$scope',
  function ($scope) {
}]);

tripNViewControllers.controller('LoginCtrl', ['$scope',
  function ($scope) {
	$scope.username = "toto";
	$scope.password = "tata";
}]);