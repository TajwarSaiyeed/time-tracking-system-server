const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/user.controller");

router
  .route("/")
  /**
   * Route for creating a new user.
   * @name POST /
   */
  .post(userControllers.registerUser);

router
  .route("/auth")
  /**
   * Route for authenticating a user.
   * @name POST /auth
   */
  .post(userControllers.authUser);

module.exports = router;
