/**
 * Main Controller
 **/

var Controllers = angular.module('Controllers');

Controllers.controller('mainController', ['$scope', 'Server', '$location',
    function($scope, Server, $location) {

        $scope.initialize = function() {

            $scope.navbar = {
                name: 'navbar.html',
                url: 'views/includes/navbar.html'
            };

            $scope.footer = {
                name: 'footer.html',
                url: 'views/includes/footer.html'
            };

            $scope.manageIncludes = {
                
            }            
        }
}]);