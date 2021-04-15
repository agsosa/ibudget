const bcrypt = require("bcrypt-nodejs");
const UserModel = require("@models/user.model");
const helpers = require("@controllers/helpers");

// passport serialize function
exports.serializeUser = function (user, done) {
  done(null, user.id);
};

// passport deserialize function
exports.deserializeUser = function (id, done) {
  UserModel.findById(id)
    .then((result) => {
      done(null, result);
    })
    .catch((err) => {
      done(err, null);
    });
};

// TODO: Implement bcrypt
exports.login = function (req, username, password, done) {
  UserModel.findByUsername(username)
    .then((result) => {
      if (!result) {
        // No rows from database for this username
        done(null, null);
      } else {
        if (password !== result.password)
          // Wrong password
          done(null, null);
        else {
          // Auth success
          done(null, result);
        }
      }
    })
    .catch((err) => done(err, null));
};

// onLoginSuccess: Called if the authentication was sucessful
// req.user will contain the authenticated user
exports.onLoginSuccess = (req, res) => {
  /* if (req.body.remember) {
    req.session.cookie.maxAge = 24 * 60 * 60 * 1000;
  } else {
    req.session.cookie.expires = false;
  } */

  helpers.sendSuccessResponse(res, "USER_AUTHENTICATED", {
    name: req.user.name,
  });
};

exports.register = function (req, username, password, done) {
  console.log("local-register callback");
};

exports.logout = function (req, res) {
  try {
    req.logout();
    helpers.sendSuccessResponse(res, "LOGOUT_SUCCESS");
  } catch (err) {
    helpers.sendFailedMessage(res, "LOGOUT_INTERNAL_ERROR", 500);
  }
};
