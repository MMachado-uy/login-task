/**
 * Permission controller
 * @since April 2016
 */

// Data object
var User = require('../models/dao/user.class');
var Profile = require('../models/dao/profile.class');
var User_Account = require('../models/dao/user_account.class');

var db = require('./db.controller');
var answer = require('./response.controller');

/**
 * Permission constructor
 */
var Permission = function() {};

/**
 * Verify user has proper permissions
 * @param author (object)
 * @param response (object)
 * @param callback (function)
 */
Permission.prototype.do = function(author, response, callback) {
    this.authorIsActive(author, function(allowed) {
        if (allowed) {
            callback(true);
        } else {
            answer.error(response, 'ERR_PERMISSION_INACTIVE_USER');
        }
    });
};

/**
 * Make sure that the author is an active user
 * @param author (object)
 * @param callback (function)
 */
Permission.prototype.authorIsActive = function(author, callback) {
    var user_account = new User_Account();
    user_account.getWhere({
        'user': author.id,
        'account': author.account
    }, function(userAccounts) {
        
        if (userAccounts.length == 1) {
            var userAccount = userAccounts[0];
            
            // If is_active == 1, allowed = true
            var isAllowed = userAccount.is_active == 1;

            callback(isAllowed);
        }

    });
};

/**
 * Verify if user has profile access to that action
 * @param
 * @param
 */
Permission.prototype.hasAccess = function(author, response, permissionNeed, callback) {
    var isAllowed = false;

    // Get user information
    var user = new User();
    user.getById(author.id, function(user, success) {
        if (success) {
            // Get profile id
            var user_account = new User_Account();
            user_account.getWhere({
                'user': author.id,
                'account': author.account
            }, function(user_accounts) {
                
                if (user_accounts.length > 0) {
                    user_account = user_accounts[0];

                    // Get profile information
                    var profile = new Profile();
                    profile.getById(user_account.profile, function(profile, success) {
                        if (success) {
                            if (permissionNeed.length) {
                                permissionNeed.forEach(function(permission) {
                                    if (profile[permission] == 1) {
                                        isAllowed = true;
                                    }
                                });
                            } else {
                                isAllowed = true;
                            }

                            if (!isAllowed) {
                                answer.error(response, 'ERR_PERMISSION_DENIED');
                            }

                            callback(isAllowed);
                        } else {
                            answer.error(response, 'ERR_PERMISSION_DENIED');
                        }
                    });
                }
            });
        } else {
            answer.error(response, 'ERR_PERMISSION_DENIED');
        }
    });
};

// Export permission class
module.exports = new Permission();
