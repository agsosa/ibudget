// Docs: https://documenter.getpostman.com/view/13863838/TzCV45Ku
const express = require("express");
const router = express.Router();
const UserController = require("@controllers/user.controller");

module.exports = function (passport) {
  // Create user session (login)
  router.post(
    "/session",
    passport.authenticate("local-login"),
    UserController.onLoginSuccess
  );

  // Delete user session (logout)
  router.delete("/session", UserController.logout);

  // Create user (register)

  return router;
};
