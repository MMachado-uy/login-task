/**
 * Requests service
 * @since Jun 2017
 */
 
var Services = angular.module('Services');

Services.service('Request', ['$http', function($http) {
    
    this.request = function(action, actionData, callback) {
        console.log("actionData", actionData);
        console.log("action", action);
        $http({
            'url': '/action/' + action,
            'method': 'POST',
            'data': {
                'actionData': actionData
            }
        }).then(function(res) {
            callback('Success!');
            console.log("Right");
        }, function(res) {
            callback('Error!');
            console.log("Wrong");
        });
    };
    
}]);
