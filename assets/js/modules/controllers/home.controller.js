/**
 * Home Controller
 **/

var Controllers = angular.module('Controllers');

Controllers.controller('homeController', ['$scope', '$location',
    function($scope, $location) {

        $scope.init = function() {
            console.log("The homeController is loaded!");
        };

        $scope.noty = function() {
            // noty.show('Test message',"success");
        };
    }
]);