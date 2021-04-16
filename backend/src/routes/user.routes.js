// Docs: https://documenter.getpostman.com/view/13863838/TzCV45Ku
const express = require("express");
const router = express.Router();
const UserController = require("@controllers/user.controller");

module.exports = function (passport) {
  // Create user session (login)
  // TODO: Implement brute force protection
  router.post(
    "/session",
    passport.authenticate("local-login", { failWithError: true }), // IMPORTANT: failWithError is needed to return a json response on error
    UserController.onLoginSuccess
  );

  // Delete user session (logout)
  router.delete("/session", UserController.logout);

  // Create user (register)
  router.post(
    "/",
    passport.authenticate("local-register", { failWithError: true }), // IMPORTANT: failWithError is needed to return a json response on error
    UserController.onRegisterSuccess
  );

  return router;
};
