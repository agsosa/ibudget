const TransactionModel = require("@models/transaction.model");
const utils = require("@lib/utils");

exports.delete = function (req, res) {
  TransactionModel.delete(req.params.id)
    .then(() =>
      utils.sendSuccessResponse(res, "Transaction successfully deleted")
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
