const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/user.controller");

router.route("/").post(userControllers.registerUser);
router.route("/auth").post(userControllers.authUser);

module.exports = router;
