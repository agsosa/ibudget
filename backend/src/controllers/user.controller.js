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
      done(new Error("INTERNAL_ERROR"), null);
    });
};

// Login route
exports.login = function (req, username, password, done) {
  UserModel.findByUsernamePassword(username, password)
    .then((result) => {
      if (!result) {
        // No rows from database for this username
        done(new Error("WRONG_CREDENTIALS"), null);
      } else {
        // Auth success
        done(null, result);
      }
    })
    .catch((err) => done(err, null));
};

// onLoginSuccess: Called if the authentication was sucessful
// req.user will contain the authenticated user
exports.onLoginSuccess = (req, res) => {
  helpers.sendSuccessResponse(res, "USER_AUTHENTICATED", {
    name: req.user.name,
  });
};

// Register route
exports.register = function (req, username, password, done) {
  UserModel.findByUsername(username)
    .then((result) => {
      if (!result) {
        // No rows from database for this username, proceed with register
        UserModel.create({ username, password, name: req.body.name })
          .then((result) => {
            done(null, result);
          })
          .catch((err) => {
            done(err, null);
          });
      } else {
        // Username already registered, send error
        return done(new Error("USERNAME_TAKEN"), null);
      }
    })
    .catch((err) => done(new Error("INTERNAL_ERROR"), null));
};

// onRegisterSuccess: Called if the user creation was sucessful
// req.user will contain the authenticated user
exports.onRegisterSuccess = (req, res) => {
  helpers.sendSuccessResponse(res, "USER_CREATED", {
    name: req.user.name,
  });
};

// Logout route
exports.logout = function (req, res) {
  try {
    req.logout();
    helpers.sendSuccessResponse(res, "LOGOUT_OK");
  } catch (err) {
    helpers.sendFailedMessage(res, "LOGOUT_INTERNAL_ERROR", 500);
  }
};
