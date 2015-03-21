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
          iconUrl : 'img/pin-yellow.png',
        },
    };

    $scope.defaults = {
      maxWidth : 80,
      minWidth : 50,
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
            message : '<h5>' + poi.name + '</h5><div class="row"><div class="col-xs-4"><img src="' + poi.photo + '" class="img-thumbnail" style="max-width: 64px; max-height: 64px;"></div><div class="col-offset-xs-5 col-xs-8"><p>' + poi.description.substring(0,100)+ '...</p></div></div><div><p><a class="btn center-block" href="#/poi/' + poi.id +'">Afficher</a></p>',
            focus: false,
            draggable: false,
            icon : local_icons.blue_icon
          }

          if(poi.nb_coupons != 0) {
            $scope.markers[poi.id].icon = local_icons.coupon_icon
          }

        });
      });
    }

    getPosition().then(function(position){

      $scope.center.lat = position.coords.latitude;
      $scope.center.lng = position.coords.longitude;

      // $scope.center.lat = 50.006055;
      // $scope.center.lng = 5.718304;

      $scope.center.zoom = 12;
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
          ['$location', '$routeParams', '$scope', 'Coupon', 'Poi',
  function( $location ,  $routeParams ,  $scope ,  Coupon ,  Poi ) {
    $scope.poi = Poi.read({ poi_id: $routeParams.poiId });
    $scope.coupons = Coupon.list({ poi_id: $routeParams.poiId, user_id: 1 });

    var params = $location.search();
    $scope.via_beacon = params.via_beacon && params.via_beacon;
}]);



tripNViewControllers.controller('PlayCtrl',
          ['$location', '$routeParams', '$scope', 'Coupon', 'CouponPlay', 'Question',
  function( $location ,  $routeParams ,  $scope , Coupon, CouponPlay ,  Question) {

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
            Coupon.read({ poi_id: $routeParams.poiId, coupon_id: $routeParams.couponId, user_id: 1 }, function(coupon){
              $scope.coupon = coupon;
            })
          } else {
            $scope.stage = 'lost';

          }
        }
      );
    };
}]);
