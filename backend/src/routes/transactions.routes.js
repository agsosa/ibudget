// Docs: https://documenter.getpostman.com/view/13863838/TzCV45Ku
const express = require("express");
const router = express.Router();
const controller = require("@controllers/transaction.controller");

// Retrieve all transactions
router.get("/", controller.findAll); // TODO: Remove notes from this endpoint and create another endpoint to grab the notes for a single transaction id?

// Create a new transaction
router.post("/", controller.create);

// Update a transaction's info (full replace) with id
router.put("/:id", controller.fullUpdate);

// TODO: Implement partialUpdate (patch)

// Delete a transaction with id
router.delete("/:id", controller.delete);

module.exports = router;
