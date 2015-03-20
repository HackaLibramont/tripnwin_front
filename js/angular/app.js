var tripNViewApp = angular.module('tripNViewApp', [
  'ngRoute',
  'tripNViewControllers'
]);

tripNViewApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/index', {
        templateUrl: 'js/partials/index.html',
        controller: 'IndexCtrl'
      })
	  .when('/login', {
        templateUrl: 'js/partials/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/index'
      });
  }]);