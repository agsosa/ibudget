// Docs: https://documenter.getpostman.com/view/13863838/TzCV45Ku
const TransactionModel = require("@models/transaction.model");
const utils = require("@lib/utils");

exports.delete = function (req, res) {
  TransactionModel.delete(Number(req.params.id))
    .then((result) =>
      utils.sendSuccessResponse(res, "Transaction successfully deleted", result)
    )
    .catch((err) => utils.sendFailedResponse(res, err, 500));
};

exports.findAll = function (req, res) {
  // TODO: Replace findAll 0 parameter with current auth user_id
  TransactionModel.findAll(0)
    .then((result) => {
      utils.sendSuccessResponse(res, "Found transactions", result);
    })
    .catch((err) => {
      utils.sendFailedResponse(res, err, 400);
    });
};

exports.create = function (req, res) {
  TransactionModel.create(req.body)
    .then((result) => {
      utils.sendSuccessResponse(
        res,
        "Transaction successfully created",
        result
      );
    })
    .catch((err) => utils.sendFailedResponse(res, err, 500));
};

exports.fullUpdate = function (req, res) {
  TransactionModel.fullUpdate(Number(req.params.id), req.body)
    .then((result) => {
      utils.sendSuccessResponse(
        res,
        "Transaction successfully updated",
        result
      );
    })
    .catch((err) => utils.sendFailedResponse(res, err, 500));
};
