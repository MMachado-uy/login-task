/**
 * Handling responses
 * @since Jun, 2017
 */

var answer = {
    "succeed": function(response, data, con) {
        response.send({
            "success": true,
            "error": "",
            "data": data
        });
    },
    "error": function(response, errorType, con) {
        response.send({
            "success": false,
            "error": getError(errorType),
            "data": ""
        });
        console.log('User error: ' + getError(errorType));
    }
};

/**
 * Get an error depending on the error type
 * @param errorType (Integer)
 */
function getError(errorType) {
    var errorMessage = '';

    switch (errorType) {
        case 'ERR_GRAL_DEFAULT':
            errorMessage = "Huston, we have a situation.";
            break;
        case 'ERR_GRAL_DB':
            errorMessage = "There was a Database error";
            break;

        default:
            errorMessage = "Unrecognized error occurred";
    }

    return errorMessage;
}

module.exports = answer;
