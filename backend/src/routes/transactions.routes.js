// Docs: https://documenter.getpostman.com/view/13863838/TzCV45Ku
const express = require("express");
const router = express.Router();
const controller = require("@controllers/transactions.controller");
const helpers = require("@controllers/helpers");

// Retrieve all transactions
router.get("/", helpers.isLoggedIn, controller.findAll);

// Create a new transaction
router.post("/", helpers.isLoggedIn, controller.create);

// Update a transaction's info (full replace) by id
// TODO: Implement partialUpdate (patch)
router.put("/:id", helpers.isLoggedIn, controller.fullUpdate);

// Delete a transaction by id
router.delete("/:id", helpers.isLoggedIn, controller.delete);

module.exports = router;
