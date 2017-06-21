/**
 * System routes (called from Angular)
 * @since April 2016
 */

var answer = require('./controllers/response.controller');

module.exports = function(app, cache) {
    app.post('/action/*', function(req, res) {
        console.log("Routes!");
        var requestURL = req.protocol + '://' + req.get('host');

        var data = {
            'requestURL': requestURL,
            'actionData': req.body
        };

        switch (req.originalUrl) {
            case '/action/testServer':
                console.log("Router reached");
                answer.succeed(res, data);
                break;
        }
    });
};
