// Docs: https://documenter.getpostman.com/view/13863838/TzCV45Ku
const express = require("express");
const router = express.Router();
const controller = require("@controllers/auth.controller");

// Retrieve all transactions
//router.get("/", controller.findAll);

// Create a new transaction
//router.post("/", controller.create);

// Update a transaction's info (full replace) by id
//router.put("/:id", controller.fullUpdate);

// TODO: Implement partialUpdate (patch)

// Delete a transaction by id
//router.delete("/:id", controller.delete);

//router.post("/", controller.create);

//router.delete("/", controller.create);

module.exports = router;
