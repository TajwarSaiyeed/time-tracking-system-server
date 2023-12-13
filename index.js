const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;

dotenv.config();

// Define your routes and middleware here
const { notFound, errorHandler } = require("./middleware/error.middleware");
const userRoutes = require("./routes/user.routes");
const timeEntryRoutes = require("./routes/time-entry.routes");

// middlewares

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/users", userRoutes);
app.use("/api/time-entry", timeEntryRoutes);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

/**
 * Middleware for handling 404 errors and general error handling.
 * @module error.middleware
 * @type {Object}
 * @property {function} notFound - Middleware for handling 404 errors.
 * @property {function} errorHandler - Middleware for general error handling.
 */
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
