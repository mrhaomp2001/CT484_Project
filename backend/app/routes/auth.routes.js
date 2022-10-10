const controller = require("../controllers")
const middlewares = require("../middlewares")
const express = require("express");

module.exports = (app) => {
  const auth = express.Router();
  auth.route("/signup").post([middlewares.verifySignUp.checkDuplicateUsernameOrEmail],controller.auth.signup);
  auth.route("/signin").post(controller.auth.signin)
  app.use("/api/auth", auth); 
};