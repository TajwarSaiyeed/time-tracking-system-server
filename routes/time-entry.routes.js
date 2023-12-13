const express = require("express");
const router = express.Router();

const timeEntryControllers = require("../controllers/time-entry.controller");

router.route("/create").post(timeEntryControllers.createTimeEntry);
router.route("/weekly").post(timeEntryControllers.getTimeEntries);

module.exports = router;
