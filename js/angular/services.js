'use strict';

angular.module('tripnwin.services', ['ngResource'])

  /**
   * POI ngResource
   */
  .factory('Poi',
            ['$resource', 'API_BASE_URL',
    function( $resource ,  API_BASE_URL ) {

    return $resource(API_BASE_URL+'pois/:poi_id', {}, {
      list: { method: 'GET', isArray: true },
      read: { method: 'GET' }
    });
  }])


  /**
   * Coupon ngResource
   */
  .factory('Coupon',
            ['$resource', 'API_BASE_URL',
    function( $resource ,  API_BASE_URL ) {

    return $resource(API_BASE_URL+'pois/:poi_id/coupons/:coupon_id', {}, {
      list: { method: 'GET', isArray: true },
      read: { method: 'GET' }
    });
  }])


  /**
   * CouponPlay ngResource
   */
  .factory('CouponPlay',
            ['$resource', 'API_BASE_URL',
    function( $resource ,  API_BASE_URL ) {

    return $resource(API_BASE_URL+'pois/:poi_id/coupons/:coupon_id/play', {}, {
      play: { method: 'POST' }
    });
  }])


  /**
   * Question ngResource
   */
  .factory('Question',
            ['$resource', 'API_BASE_URL',
    function( $resource ,  API_BASE_URL ) {

    return $resource(API_BASE_URL+'pois/:poi_id/questions/random', {}, {
      read: { method: 'GET' }
    });
  }])


  /**
   * Page service
   */
  .factory('Page', function() {
    var title = 'Trip\'N\'win';
    return {
      title: function() { return title; },
      setTitle: function(newTitle) { title = newTitle }
    };
});
