/**
 * Home Controller
 **/

var Controllers = angular.module('Controllers');

Controllers.controller('homeController', ['$scope', '$location', '$http', 'Request',
    function($scope, $location, $http, Request) {

        $scope.init = function() {
            console.log("The homeController is loaded!");
        };

        $scope.login = function() {
            if ($('#_registerForm').hasClass('form-tile--open')) {
                $('#_registerForm').toggleClass('form-tile--closed');
                $('#_registerForm').toggleClass('form-tile--open');  
            }

            $('#_loginForm').toggleClass('form-tile--closed');
            $('#_loginForm').toggleClass('form-tile--open');
        };

        $scope.register = function() {
            if ($('#_loginForm').hasClass('form-tile--open')) {
                $('#_loginForm').toggleClass('form-tile--closed');
                $('#_loginForm').toggleClass('form-tile--open');  
            }

            $('#_registerForm').toggleClass('form-tile--closed');
            $('#_registerForm').toggleClass('form-tile--open');
        };

        $scope.testServer = function() {
            console.log("Button clicked!");
            Request.request('testServer', 'I\'m a packet!', function(res) {
                console.log("res - Callback", res);
                if (res.success !== undefined && res.success) {
                    console.log("Callback");
                }
            });
        };
    }
]);