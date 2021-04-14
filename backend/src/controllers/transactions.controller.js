// Docs: https://documenter.getpostman.com/view/13863838/TzCV45Ku
const TransactionModel = require("@models/transaction.model");
const helpers = require("@controllers/helpers");

exports.delete = function (req, res) {
  TransactionModel.delete(Number(req.params.id))
    .then((result) =>
      helpers.sendSuccessResponse(
        res,
        "Transaction successfully deleted",
        result
      )
    )
    .catch((err) => helpers.sendFailedResponse(res, err, 500));
};

exports.findAll = function (req, res) {
  console.log(req);
  TransactionModel.findAll(req.user.id)
    .then((result) => {
      helpers.sendSuccessResponse(res, "Found transactions", result);
    })
    .catch((err) => {
      helpers.sendFailedResponse(res, err, 400);
    });
};

exports.create = function (req, res) {
  TransactionModel.create(req.body)
    .then((result) => {
      helpers.sendSuccessResponse(
        res,
        "Transaction successfully created",
        result
      );
    })
    .catch((err) => helpers.sendFailedResponse(res, err, 500));
};

exports.fullUpdate = function (req, res) {
  TransactionModel.fullUpdate(Number(req.params.id), req.body)
    .then((result) => {
      helpers.sendSuccessResponse(
        res,
        "Transaction successfully updated",
        result
      );
    })
    .catch((err) => helpers.sendFailedResponse(res, err, 500));
};
