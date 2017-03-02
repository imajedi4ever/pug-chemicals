'use strict';

describe( 'pug-chemicals.compounds module', function () {
  beforeEach( module( 'pug-chemicals.compounds' ) );

  describe( 'compounds controller', function () {

    it( 'should initialize the controller', inject( function ( $rootScope, $controller ) {
        var scope = $rootScope;
      //spec body
      var CompoundsController = $controller( 'CompoundsController', {$scope: scope} );
      expect( CompoundsController ).toBeDefined();
      expect( scope.header ).toEqual("Compound(s)");
    } ) );
  } );
} );
