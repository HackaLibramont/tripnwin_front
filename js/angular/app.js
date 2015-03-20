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
	  .when('/poi/:poiID', {
        templateUrl: 'js/partials/poi.html',
        controller: 'PoiCtrl'
      })
      	  .when('/loose', {
        templateUrl: 'js/partials/loose.html',
        controller: 'LooseCtrl'
      })
      
          .when('/win', {
        templateUrl: 'js/partials/win.html',
        controller: 'WinCtrl'
      })
      .otherwise({
        redirectTo: '/index'
      });
  }]);