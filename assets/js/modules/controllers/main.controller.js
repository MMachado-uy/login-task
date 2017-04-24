/**
 * Main Controller
 **/

var Controllers = angular.module('Controllers');

Controllers.controller('mainController', ['$scope', '$location', 
    function($scope, $location) {

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