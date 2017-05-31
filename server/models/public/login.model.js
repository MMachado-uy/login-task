/**
 * Handling login data
 * @since March 2016
 */

// Data Objects
var User = require('../dao/user.class');
var Account = require('../dao/account.class');
var Profile = require('../dao/profile.class');

var answer = require('../../controllers/response.controller');
var db = require('../../controllers/db.controller');
var md5 = require('md5');
var bcrypt = require('bcrypt');

/**
 * Handling user form login data
 * @param data (object)
 * @param res (object)
 */
var login = function(data, res) {

    var form = data.actionData;

    // Verify it's a valid email
    if (utils.validateEmail(form.email)) {

        if (form.activation_code !== null) {
            
            var user_account = new User_Account();
            user_account.getWhere({
                'invitation_code': form.activation_code
            }, function(userAccounts) {
                
                if (userAccounts.length == 1) {
                    
                    // Verifying that the invitation code isn't expired
                    user_account.isValidInvitation(form.activation_code, function(isValid) {
                        if (isValid) {
                            // Update invitation_pending = 1
                            user_account.updateWhere({
                                'set': { 'invitation_pending': 0 },
                                'where': { 'invitation_code': form.activation_code }
                            }, function() {
                                loginFinish(data, res);
                            });
                        } else {
                            answer.error(res, 'ERR_EXPIRED_INVITATION');
                        }
                    });
                } else {
                    answer.error(res, 'ERR_INVALID_EMAIL_PASSWORD');
                }
            });
        } else {
            loginFinish(data, res);
        }

    } else {
        answer.error(res, 'ERR_INVALID_EMAIL_PASSWORD');
    }

};

var loginFinish = function(data, res) {
    var form = data.actionData;

    // Verify that the email exists and isn't an invited (not confirmed) user
    var user = new User();
    user.getWhere({
        'email': form.email
    }, function(users) {

        if (users.length > 0) {

            user = users[0];

            var userId = user.id;
            var accountId = user.account;

            // Verify user belongs (at least) to an active account
            var user_account = new User_Account();
            user_account.getByUserId(userId, function(user_accounts) {
                if (user_accounts.length > 0) {

                    // Verify is the correct password
                    user = new User();
                    user.getById(userId, function(user, success) {

                        // If the User exists
                        if (success) {
                            
                            // Verify password entered in form matches with the stored password
                            bcrypt.compare(form.password, user.password, function(err, success) {
                                
                                if (success) {
                                    // Prepare data to send
                                    userData = user;
                                    userData.accounts = user_accounts;

                                    if (form.companyId != null) {
                                        userData.company = form.companyId;

                                        var account = new Account();
                                        account.getWhere({
                                            'domain': form.companyId,
                                            'is_active': 1
                                        }, function(accounts) {
                                            if (accounts.length > 0) {
                                                var account = accounts[0];

                                                userData.account = account.id;
                                                userData.owner = account.owner;

                                                var user_account = new User_Account();
                                                user_account.getWhere({
                                                    'account': account.id,
                                                    'user': user.id,
                                                    'invitation_pending': 0
                                                }, function(userAccounts) {

                                                    if (userAccounts.length > 0) {
                                                        var userAccount = userAccounts[0];

                                                        // Verify user is active
                                                        if (userAccount.is_active == 1) {

                                                            var profile = new Profile();
                                                            profile.getById(userAccount.profile, function(profile, success) {
                                                                if (success) {
                                                                    userData.permissions = profile;

                                                                    // Send succeed with data
                                                                    answer.succeed(res, userData);
                                                                }
                                                            });
                                                        } else {
                                                            answer.error(res, 'ERR_INVALID_EMAIL_PASSWORD');
                                                        }
                                                    } else {
                                                        answer.error(res, 'ERR_INVALID_EMAIL_PASSWORD');
                                                    }
                                                });
                                            } else {
                                                answer.error(res, 'ERR_INVALID_EMAIL_PASSWORD');
                                            }
                                        });
                                    } else {
                                        // Send succeed with data
                                        answer.succeed(res, userData);
                                    }
                                } else {
                                    answer.error(res, 'ERR_INVALID_EMAIL_PASSWORD');
                                }
                            });
                        }

                    });
                } else {
                    answer.error(res, 'ERR_INVALID_EMAIL_PASSWORD');
                }

            });
        } else {
            answer.error(res, 'ERR_INVALID_EMAIL_PASSWORD');
        }
    });
};

/**
 * Collects user data after redirecting to new subdomain
 * @param data (Object)
 * @param res (Object)
 * @param cache (Object)
 */
var collectUserData = function(data, res, cache) {
    if (cache.get('userLogged') !== undefined) {
        answer.succeed(res, cache.get('userLogged'));
    } else {
        answer.error(res, 'ERR_GRAL_DEFAULT');    
    }
};

module.exports = {
    'login': login
};
