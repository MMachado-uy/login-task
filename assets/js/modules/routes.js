angular.module('app').config(function($routeProvider){
    // $routeProvider.when('')
    $routeProvider
    .when('/', {
        templateUrl: '../views/public/home.html',
        controller: 'homeController'
    });
});