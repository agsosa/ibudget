const { validateShape } = require("@lib/utils");
const database = require("@lib/database");
const Joi = require("joi");

const TABLE_NAME = "transactions";
const TransactionModel = {
  // TODO: Use shared limits and enums to validate
  infoSchema: Joi.object({
    amount: Joi.number(),
    category_id: Joi.number(),
    type_id: Joi.number(),
    date: Joi.date(),
    concept: Joi.string().optional(),
    notes: Joi.string().optional(),
  }),
};

TransactionModel.create = (transaction_info, user_id) => {
  const isValidInfo = TransactionModel.infoSchema.validate(transaction_info);

  console.log(JSON.stringify(isValidInfo));

  // If the info is not valid then isValidInfo.error will exist and details.message will exist

  return isValidInfo;
};

TransactionModel.delete = (id) => {
  const query = `DELETE FROM ${TABLE_NAME} WHERE \`id\` =  ?`;
  const params = [id];

  return database.execute(query, params);
};

TransactionModel.update = () => {};

module.exports = TransactionModel;
