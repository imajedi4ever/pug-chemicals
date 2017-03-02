'use strict';

angular.module( 'pug-chemicals.compounds', [
    'ngRoute'
] )
.config( [ '$routeProvider', function( $routeProvider ) {
    $routeProvider
    .when( '/compounds', {
        templateUrl: 'compounds/compounds.html',
        controller: 'CompoundsController'
    } );
} ] )
.factory( 'CompoundsService', function( $http ) {
    var getSynonyms = function(ids) {
        //var synonymsURL = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/' + ids + '/synonyms/JSON';

        return $http.get('https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/' + ids + '/synonyms/JSON');
    };

    var getMolecularData = function(ids) {
        return $http.get('https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/' + ids + '/property/MolecularFormula,MolecularWeight/JSON');
    };

    return {
        getSynonyms: getSynonyms,
        getMolecularData: getMolecularData
    };
} )
.controller( 'CompoundsController', function( $scope, $http, CompoundsService ) {
    $scope.header = 'Compound(s)';
    $scope.search;
    $scope.message;
    $scope.searchCompounds = function() {
        if ( validateSearch($scope.search) ) {
            CompoundsService.getSynonyms($scope.search).then(function(response) {
                var synonymsResponse = response.data.InformationList.Information;
                var compounds = synonymsResponse.map( function(molecule) {
                    return {
                        cid: molecule.CID,
                        synonyms: [
                            molecule.Synonym.slice(0)[0],
                            molecule.Synonym.slice(-1)[0]
                        ]
                    }
                } );

                return compounds;
            }).then(function(compounds) {
                if (compounds) {
                    CompoundsService.getMolecularData($scope.search).then(function(response) {
                        var molecularDataResponse = response.data.PropertyTable.Properties;

                        return setCompoundMolecularData(compounds, molecularDataResponse);
                    }).then(function(compounds) {
                        compounds = getImageURLs(compounds);

                        $scope.compounds = compounds;
                        $scope.totalMolecularWeight = getTotalMolecularWeights(compounds).reduce(getSum);
                        $scope.message = "Your search of: " + $scope.search + " returned the following results:";
                    });
                }
            });
        } else {
            $scope.message = "Invalid ID(s)";
        }
    }

    var validateSearch = function(search) {
        var pattern = /^[1-9]+([,][1-9]+)?$/;

        if( pattern.test( search.trim() ) ) {
            return true;
        } else {
            return false;
        }
    }

    var getSum = function(total, num) {
        return total + num;
    }

    var setCompoundMolecularData = function(compounds, molecularDataResponse) {
        for (var i = 0, len = compounds.length; i < len; i++) {
            for (var i = 0, len = molecularDataResponse.length; i < len; i++) {
                if ( compounds[i].cid == molecularDataResponse[i].CID ) {
                    compounds[i].molecularFormula = molecularDataResponse[i].MolecularFormula;
                    compounds[i].molecularWeight = molecularDataResponse[i].MolecularWeight;
                }
            }
        }

        return compounds;
    }

    var getImageURLs = function(compounds) {
        for (var i = 0, len = compounds.length; i < len; i++) {
            compounds[i].imageURL = "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/" + compounds[i].cid + "/PNG";
        }

        return compounds;
    }

    var getTotalMolecularWeights = function(compounds) {
        return compounds.map( function(compound) {
            return compound.molecularWeight;
        });
    }
});
