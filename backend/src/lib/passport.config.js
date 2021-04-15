const LocalStrategy = require("passport-local").Strategy;
const UserController = require("@controllers/user.controller");

// Configure passport-local strategy & serialize/deserialize
class PassportConfig {
  constructor() {}

  config(passport) {
    // Setup passport serialize/deserialize
    passport.serializeUser(UserController.serializeUser);
    passport.deserializeUser(UserController.deserializeUser);

    // Setup passport-local login strategy
    passport.use(
      "local-login",
      new LocalStrategy(
        {
          usernameField: "username",
          passwordField: "password",
          passReqToCallback: true,
        },
        UserController.login // Pass callback to user controller
      )
    );

    // Setup passport-local register strategy
    passport.use(
      "local-register",
      new LocalStrategy(
        {
          usernameField: "username",
          passwordField: "password",
          passReqToCallback: true,
        },
        UserController.register
      )
    );

    console.log("[Passport] Initialized");
  }
}

module.exports = new PassportConfig();
