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

TransactionModel.create = (user_id, transaction_info) => {
  // TODO: Validate user_id

  const isValidInfo = TransactionModel.infoSchema.validate(transaction_info);

  console.log(JSON.stringify(isValidInfo));

  // If the info is not valid then isValidInfo.error will exist and details.message will exist

  return isValidInfo;
};

TransactionModel.delete = (id) => {
  // TODO: Check user_id permission!!!
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM ${TABLE_NAME} WHERE \`id\` =  ?`;
    const params = [id];

    database
      .execute(query, params)
      .then(([rows]) => {
        if (rows.affectedRows === 0) reject("id not found");
        else resolve();
      })
      .catch((err) => reject(err));
  });
};

TransactionModel.findAll = async (user_id) => {
  return new Promise((resolve, reject) => {
    // TODO: Validate user_id?
    if (user_id == null || typeof user_id !== "number")
      reject("Specified user_id is not valid");

    const query = `SELECT id, amount, category_id, type_id, date, concept, notes FROM ${TABLE_NAME} WHERE \`user_id\` =  ?`;
    const params = [user_id];

    database
      .execute(query, params)
      .then(([rows]) => resolve(rows))
      .catch((err) => reject(err));
  });
};

TransactionModel.update = () => {};

module.exports = TransactionModel;
