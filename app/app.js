'use strict';

// Declare app level module which depends on views, and components
angular.module( 'pug-chemicals', [
  'ngRoute',
  'pug-chemicals.compounds'
] ).
config( [ '$locationProvider', '$routeProvider', function ( $locationProvider, $routeProvider ) {
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({ redirectTo: '/compounds' });
} ] );
