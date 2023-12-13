const express = require("express");
const router = express.Router();

const timeEntryControllers = require("../controllers/time-entry.controller");

router
  .route("/create")
  /**
   * Route for creating a new time entry.
   * @name POST /create
   */
  .post(timeEntryControllers.createTimeEntry);

router
  .route("/weekly")
  /**
   * Route for retrieving weekly time entries.
   * @name POST /weekly
   */
  .post(timeEntryControllers.getTimeEntries);

module.exports = router;
