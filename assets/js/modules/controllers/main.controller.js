/**
 * Main Controller
 **/

var Controllers = angular.module('Controllers');

Controllers.controller('mainController', ['$scope', '$location', '$http', 'Request',
    function($scope, $location, $http, Request) {

        $scope.init = function() {
            console.log("The mainController is loaded!");

            $scope.navbar = {
                name: 'navbar.html',
                url: '../views/includes/navbar.html'
            };

            $scope.footer = {
                name: 'footer.html',
                url: '../views/includes/footer.html'
            };

            $scope.manageIncludes = {
                "home": {
                    name: 'home.html',
                    url: 'views/public/home.html'
                }
            };
        };
    }
]);