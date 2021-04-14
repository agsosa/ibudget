// Docs: https://documenter.getpostman.com/view/13863838/TzCV45Ku
const express = require("express");
const router = express.Router();
const UserController = require("@controllers/user.controller");

module.exports = function (passport) {
  router.post(
    "/login",
    passport.authenticate("local-login"),
    UserController.onLoginSuccess
  );

  return router;
};
