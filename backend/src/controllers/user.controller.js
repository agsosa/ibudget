const bcrypt = require("bcrypt-nodejs");
const UserModel = require("@models/user.model");
const helpers = require("@controllers/helpers");

// Passport-local persistent session serialize function
exports.serializeUser = function (user, done) {
  done(null, user.id);
};

// Passport-local persistent session deserialize function
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
        done(new Error("Username not found"), null);
      } else {
        if (password !== result.password)
          // Wrong password
          done(new Error("Wrong password provided"), null);
        else {
          // Auth success
          done(null, result);
        }
      }
    })
    .catch((err) => done(err));
};

// onLoginSuccess: Called if the authentication was sucessful
// req.user will contain the authenticated user
exports.onLoginSuccess = (req, res) => {
  /* if (req.body.remember) {
    req.session.cookie.maxAge = 24 * 60 * 60 * 1000;
  } else {
    req.session.cookie.expires = false;
  } */

  helpers.sendSuccessResponse(res, "Authenticated", { name: req.user.name });
};

exports.register = function (req, username, password, done) {
  console.log("local-register callback");
};
