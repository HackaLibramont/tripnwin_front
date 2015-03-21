var tripNViewControllers = angular.module('tripNViewControllers', ['tripnwin.services']);

tripNViewControllers.controller('IndexCtrl',
           ['$scope',
  function ( $scope ) {
}]);

tripNViewControllers.controller('MapCtrl', ['$scope', '$http', '$q', 'Poi', 'leafletData', function ($scope, $http, $q, Poi, leafletData) {

    var local_icons = {
        default_icon: {},
        user_icon: {
          iconUrl : 'img/pin-green.png',
        },
        blue_icon: {
          iconUrl : 'img/pin-blue.png',
          popupAnchor:  [15, 0]
        },
        coupon_icon: {
          iconUrl : 'img/pin-blue-coupon.png',
        },
    };

    $scope.defaults = {
      maxZoom : 20,
      minZoom : 10,
      tileLayerOptions: {
          opacity: 0.9,
          detectRetina: true,
          reuseTiles: true,
      },
      scrollWheelZoom: false
    };

    $scope.events = {
      map : {
        enable : ['dragend'],
        logic : 'emit'
      }
    }

    $scope.$on('leafletDirectiveMap.dragend', function(event){
        $scope.eventDetected = "MouseMove";
        leafletData.getMap().then(function(map){
          var bounds = map.getBounds();
          var latitude = bounds.getCenter().lat;
          var longitude = bounds.getCenter().lng;

          getMarkers(latitude,longitude);

        });
    });

    $scope.center = {};
    $scope.markers = [];
    $scope.icons = local_icons;

    var getPosition = function(){

      var deferred = $q.defer();

      if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function(position){

          deferred.resolve(position);

        });

      }

      return deferred.promise;

    }

    var getMarkers = function(latitude, longitude) {
      Poi.list({ latitude : latitude , longitude : longitude, radius : 30 }, function(data){

        // http://hackathon-server.vm/tripnwin_api/web/index.php/pois?latitude=50.47450000000000&longitude=4.10908000000000&radius=20

        $scope.markers = {};

        data.forEach(function(poi, index, array){

          $scope.markers[poi.id] = {
            lat     : parseFloat(poi.latitude),
            lng     : parseFloat(poi.longitude),
            message : '<h5>' + poi.name + '</h5><p>' + poi.description.substring(0,40)+ '... <a href="#/poi/' + poi.id +'">Plus...</a></p>',
            focus: false,
            draggable: false,
            icon : local_icons.blue_icon
          }

        });
      });
    }

    getPosition().then(function(position){

      // $scope.center.lat = position.coords.latitude;
      // $scope.center.lng = position.coords.longitude;

      $scope.center.lat = 50.006055;
      $scope.center.lng = 5.718304;

      $scope.center.zoom = 10;
      $scope.center.focus = true;
      $scope.center.draggable= false;

      $scope.center.icon = local_icons.user_icon;

      $scope.markers[0] = $scope.center

      getMarkers($scope.center.lat, $scope.center.lng);

    });

}]);

tripNViewControllers.controller('LoginCtrl', ['$scope',
  function ($scope) {

}]);



tripNViewControllers.controller('PoiCtrl',
          ['$routeParams', '$scope', 'Coupon', 'Poi',
  function( $routeParams ,  $scope ,  Coupon ,  Poi ) {
    $scope.poi = Poi.read({ poi_id: $routeParams.poiId });
    $scope.coupons = Coupon.list({ poi_id: $routeParams.poiId, user_id: 1 });
}]);



tripNViewControllers.controller('PlayCtrl',
          ['$location', '$routeParams', '$scope', 'CouponPlay', 'Question',
  function( $location ,  $routeParams ,  $scope ,  CouponPlay ,  Question ) {

    // Init
    $scope.init = function() {
      // 1st stage
      $scope.stage = 'play';

      // Retrieve random question
      $scope.question = Question.read({ poi_id: $routeParams.poiId });
    };
    $scope.init();

    // Play!
    $scope.play = function(choice) {
      CouponPlay.play(
        { poi_id: $routeParams.poiId, coupon_id: $routeParams.couponId, user_id: 1 },
        { question_id: $scope.question.id, answer: $scope.question.choices[choice] },
        function(response) {
          if (response.result == 'won') {
            $scope.stage = 'won';
          } else {
            $scope.stage = 'lost';

          }
        }
      );
    };
}]);
