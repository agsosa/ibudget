const database = require("@lib/database");
const shared = require("ibudget-shared");
const Joi = require("joi");

const TABLE_NAME = "transactions";
const TransactionModel = {
  infoSchema: Joi.object({
    amount: Joi.number()
      .min(shared.Limits.AMOUNT_MIN_NUMBER)
      .max(shared.Limits.AMOUNT_MAX_NUMBER)
      .precision(shared.Limits.AMOUNT_MAX_DECIMALS)
      .required(),
    category_id: Joi.valid(...Object.values(shared.CategoryEnum)).required(),
    type_id: Joi.valid(...Object.values(shared.TransactionTypeEnum)).required(),
    date: Joi.date().required().max(new Date()),
    concept: Joi.string()
      .max(shared.Limits.CONCEPT_MAX_CHARS)
      .optional()
      .allow(""),
    notes: Joi.string().max(shared.Limits.NOTES_MAX_CHARS).optional().allow(""),
  }),
};

TransactionModel.create = (transaction_info) => {
  return new Promise((resolve, reject) => {
    // Joi validation
    const isValidInfo =
      transaction_info &&
      TransactionModel.infoSchema.validate(transaction_info);
    // Joi: If the info is not valid then isValidInfo.error will exist and details.message will exist

    if (!isValidInfo || isValidInfo.error)
      reject(
        `The specified transaction info is not valid. ${
          isValidInfo ? isValidInfo.error : ""
        }`
      );

    const user_id = 0; // TODO: Add user_id param, validate user_id

    const {
      amount,
      category_id,
      type_id,
      concept,
      notes,
      date,
    } = transaction_info;

    const query = `INSERT INTO ${TABLE_NAME} (amount, category_id, type_id, concept, notes, user_id, date) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const params = [
      amount,
      category_id,
      type_id,
      concept || null,
      notes || null,
      user_id,
      new Date(date),
    ];

    database
      .execute(query, params)
      .then(([rows]) => {
        resolve({ ...transaction_info, user_id, id: rows.insertId });
      })
      .catch((err) => reject(err));
  });
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
