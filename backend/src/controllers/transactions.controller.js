// Docs: https://documenter.getpostman.com/view/13863838/TzCV45Ku
const TransactionModel = require("@models/transaction.model");
const helpers = require("@controllers/helpers");

exports.delete = function (req, res) {
  TransactionModel.delete(Number(req.params.id), req.user.id)
    .then((result) =>
      helpers.sendSuccessResponse(res, "TRANSACTION_DELETED", result)
    )
    .catch((err) => helpers.sendFailedResponse(res, err, 500));
};

exports.findAll = function (req, res) {
  TransactionModel.findAll(req.user.id)
    .then((result) => {
      /* 
      TODO: Optimize removing the "notes" property 
      from the transactions and creating another endpoint to get the notes 
      for a single transaction. Doing this will allow the client to only get the notes if needed
      */
      helpers.sendSuccessResponse(res, "TRANSACTIONS_FOUND", result);
    })
    .catch((err) => {
      helpers.sendFailedResponse(res, err, 400);
    });
};

exports.create = function (req, res) {
  TransactionModel.create(req.body, req.user.id)
    .then((result) => {
      helpers.sendSuccessResponse(res, "TRANSACTION_CREATED", result);
    })
    .catch((err) => helpers.sendFailedResponse(res, err, 500));
};

exports.fullUpdate = function (req, res) {
  TransactionModel.fullUpdate(Number(req.params.id), req.body, req.user.id)
    .then((result) => {
      helpers.sendSuccessResponse(res, "TRANSACTION_UPDATED", result);
    })
    .catch((err) => helpers.sendFailedResponse(res, err, 500));
};
