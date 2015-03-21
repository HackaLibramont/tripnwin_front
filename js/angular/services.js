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
      read: { method: 'GET' },
    });
  }]);
