// TODO: Add rate limit
// TODO: Stress test

const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

port = process.env.PORT || 4000;

const app = express();

// Apply middlewares
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors()); // TODO: Change before deploy!
app.use(morgan("combined"));

app.get("/", (req, res) => res.send("OK"));

app.use(function (req, res, next) {
  res.status(404).send("ERROR");
});

// Start server
app.listen(port);

console.log("Running server on port", port);
