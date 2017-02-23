/**
 * Main Controller
 **/

var Controllers = angular.module('Controllers');

Controllers.controller('mainController', ['$scope',
    function($scope) {

        $scope.init = function() {
            console.log("The mainController has started!");
        }
    }
]);