// TODO: Implement page/limit params to findAll() if needed

const database = require("@lib/database");
const shared = require("ibudget-shared");
const Joi = require("joi");
const dateFns = require("date-fns");

const TABLE_NAME = "transactions";
const INFO_COLUMNS = "id, amount, category_id, type_id, date, concept, notes"; // Info columns

const TransactionModel = {
  infoSchema: Joi.object({
    amount: Joi.number()
      .min(shared.Limits.AMOUNT_MIN_NUMBER)
      .max(shared.Limits.AMOUNT_MAX_NUMBER)
      .precision(shared.Limits.AMOUNT_MAX_DECIMALS)
      .required(),
    category_id: Joi.valid(...Object.values(shared.CategoryEnum)).required(),
    type_id: Joi.valid(...Object.values(shared.TransactionTypeEnum)).required(),
    date: Joi.date().required().max(dateFns.addDays(new Date(), 1)),
    concept: Joi.string()
      .max(shared.Limits.CONCEPT_MAX_CHARS)
      .optional()
      .allow("")
      .allow(null),
    notes: Joi.string()
      .max(shared.Limits.NOTES_MAX_CHARS)
      .optional()
      .allow("")
      .allow(null),
  }).unknown(),
};

function validateTransactionInfo(transaction_info, reject) {
  // Joi validation
  const isValidInfo =
    transaction_info && TransactionModel.infoSchema.validate(transaction_info);

  // Joi: If the info is not valid then isValidInfo.error will exist and details.message will exist
  if (!isValidInfo || isValidInfo.error) {
    if (reject) {
      reject(
        `The specified transaction info is not valid. ${
          isValidInfo ? isValidInfo.error : ""
        }`
      );
    }

    return false;
  }

  return true;
}

function validateTransactionId(id, reject) {
  if (id == null || Number.isNaN(id) || typeof id !== "number") {
    if (reject) reject("The specified transaction id is not valid");
    return false;
  }
  return true;
}

// Create a transaction providing a transaction_info (TransactionModel.infoSchema) and a user_id
TransactionModel.create = (transaction_info, user_id) => {
  return new Promise((resolve, reject) => {
    if (!validateTransactionInfo(transaction_info, reject)) return;

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
        resolve({ ...transaction_info, id: rows.insertId });
      })
      .catch((err) => reject(err));
  });
};

// Find all transactions by user_id
TransactionModel.findAll = (user_id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT ${INFO_COLUMNS} FROM ${TABLE_NAME} WHERE \`user_id\` =  ?`;
    const params = [user_id];

    database
      .execute(query, params)
      .then(([rows]) => resolve(rows))
      .catch((err) => reject(err));
  });
};

// Find a transaction by id
TransactionModel.find = (id) => {
  return new Promise((resolve, reject) => {
    if (!validateTransactionId(id, reject)) return;

    // TODO: Maybe add a parameter to ignore notes column, then add another method to get the notes for a transaction id
    const query = `SELECT ${INFO_COLUMNS} FROM ${TABLE_NAME} WHERE \`id\` =  ?`;
    const params = [id];

    database
      .execute(query, params)
      .then(([[rows]]) => resolve(rows))
      .catch((err) => reject(err));
  });
};

// Update full transaction info by id
// fullUpdate() requires a valid and complete transaction_info object (TransactionModel.infoSchema)
// TODO: Implement partialUpdate
TransactionModel.fullUpdate = (id, transaction_info, user_id) => {
  return new Promise((resolve, reject) => {
    if (!validateTransactionId(id, reject)) return;
    if (!validateTransactionInfo(transaction_info, reject)) return;

    const {
      amount,
      category_id,
      // Transaction type (income/expenses) should not be changed due to client specification
      // type_id,
      concept,
      notes,
      date,
    } = transaction_info;

    const query = `UPDATE ${TABLE_NAME} SET amount = ?, category_id = ?, concept = ?, notes = ?, date = ?  WHERE \`id\` =  ? AND \`user_id\` = ?`;
    const params = [
      amount,
      category_id,
      concept || null,
      notes || null,
      new Date(date),
      id,
      user_id,
    ];

    database
      .execute(query, params)
      .then(([rows]) => {
        if (rows.affectedRows === 0) reject("id not found");
        else {
          // Return the updated object from database if possible
          /* 
            This is because the client can send a modified type_id (by accident or bypassing the client-side validation) but we ignore it, 
            so if we just return the provided transaction_info it may have a incorrect type_id value and the client desync from the db.

            If we get an error on find() for some reason then return the transaction_info provided by the client as a last resort
          */
          TransactionModel.find(id)
            .then((res) => resolve(res))
            .catch(() => resolve({ ...transaction_info, id }));
        }
      })
      .catch((err) => reject(err));
  });
};

// Delete a transaction by id
TransactionModel.delete = (id, user_id) => {
  return new Promise((resolve, reject) => {
    if (!validateTransactionId(id, reject)) return;

    const query = `DELETE FROM ${TABLE_NAME} WHERE \`id\` =  ? and \`user_id\` = ?`;
    const params = [id, user_id];

    database
      .execute(query, params)
      .then(([rows]) => {
        if (rows.affectedRows === 0) reject("Transaction not found");
        else resolve({ id });
      })
      .catch((err) => reject(err));
  });
};

module.exports = TransactionModel;
