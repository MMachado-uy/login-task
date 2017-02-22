/**
 * AngularJS app definition
 *
 * @since Feb, 2017
 **/
var app = angular.module('app', ['ngRoute', 'ui.bootstrap', 'Controllers', 'Directives']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    routes = new Array({
        "folder": "public",
        "pages": ['login', 'register']
    }, {
        "folder": "private",
        "pages": ['manage']
    });

    $routeProvider.when('/', {
        templateUrl: '../../views/public/home.html',
        controller: 'loginController'
    });

    var controllerName = '';
    routes.forEach(function(item) {
        item.pages.forEach(function(page) {
            $routeProvider.when('/' + (item.folder == 'public' ? '' : 'private/') + page, {
                templateUrl: 'views/' + item.folder + '/' + page + '.html',
                controller: page.replace('-', '') + 'Controller'
            })
        })
    })

    $routeProvider.otherwise({
        templateUrl: 'views/404.html'
    })

}]);
 