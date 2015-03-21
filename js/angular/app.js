var tripNViewApp = angular.module('tripNViewApp', [
  'tripnwin.config',
  'ngRoute',
  'tripNViewControllers',
  'leaflet-directive',
  'monospaced.qrcode'
]);

tripNViewApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/index', {
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
      .when('/poi/:poiId/play/:couponId', {
        templateUrl: 'js/partials/play.html',
        controller: 'PlayCtrl'
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
