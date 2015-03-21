var tripNViewApp = angular.module('tripNViewApp', [
  'tripnwin.config',
  'ngRoute',
  'tripNViewControllers',
  'leaflet-directive'
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
	  .when('/poi/:poiId', {
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

tripNViewApp.run(
            ['$http',
    function( $http ) {
        $http.defaults.headers.common['Authorization'] = 'Basic bmljb2xhcy5jaGFybG90QGdtYWlsLmNvbTpzZWNyZXQ=';
    }]);
