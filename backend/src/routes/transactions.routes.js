const express = require("express");
const router = express.Router();
const controller = require("@controllers/transaction.controller");

// Retrieve all transactions
router.get("/", controller.findAll);

// Create a new transaction
router.post("/", controller.create);

// Retrieve a single employee with id
//router.get("/:id", controller.delete);

// Update a employee with id
//router.put("/:id", controller.delete);

// Delete a transaction with id
router.delete("/:id", controller.delete);

module.exports = router;
