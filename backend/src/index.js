// API DOCUMENTATION: https://documenter.getpostman.com/view/13863838/TzCV45Ku

// TODO: Add node-rate-limiter-flexible
// TODO: Stress test
require("dotenv").config();
require("module-alias/register");
const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("@routes");
const helpers = require("@controllers/helpers");
const config = require("@lib/config");
const passport = require("passport");
const session = require("express-session");

const database = require("@lib/database");
require("@lib/passport.config").config(passport); // Configure passport

const app = express();

app.set("trust proxy", 1); // Heroku

// Add middlewares
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors(config.corsConfig));
app.use(session(config.sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
// app.use(morgan("combined")); // TODO: CHECK

// Add routes
app.use("/api/transactions", routes.transactions);
app.use("/api/user", routes.user(passport));

// Handle root path
app.get("/", (req, res) => res.send("OK"));

// Show stack trace errors on development environment
if (config.env === "development") {
  app.use(function (err, req, res, next) {
    console.error(err.stack);

    res.status(err.status || 500);

    res.json({
      error: true,
      message: err.message,
      stack: err.stack,
    });
  });
}

// Hide stack trace errors on production environment
app.use(function (err, req, res, next) {
  helpers.sendFailedResponse(res, err.message, err.status || 500);
});

// Handle 404
app.use(function (req, res, next) {
  helpers.sendFailedResponse(res, "endpoint not found", 404);
});

// Start server
app.listen(config.serverPort);
console.log("\nRunning server on port", config.serverPort);

// Graceful shutdown
// TODO: TEST
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: shutdown app");
  database.end(() => {
    console.log("Database closed");
    server.close(() => {
      console.log("HTTP server closed");
    });
  });
});
