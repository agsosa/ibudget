const database = require("@lib/database");
const shared = require("ibudget-shared");
const Joi = require("joi");
const dateFns = require("date-fns");

const TABLE_NAME = "users";
// const SELECT_COLUMNS = "id, amount, category_id, type_id, date, concept, notes";

const UserModel = {
  infoSchema: Joi.object({}).unknown(),
};

function validateUserId(id, reject) {
  if (id == null || Number.isNaN(id) || typeof id !== "number") {
    if (reject) reject("The specified user id is not valid");
    return false;
  }
  return true;
}

// Find a user by id
UserModel.findById = (id) => {
  return new Promise((resolve, reject) => {
    if (!validateUserId(id, reject)) return;

    const query = `SELECT * FROM ${TABLE_NAME} WHERE \`id\` =  ?`;
    const params = [id];

    database
      .execute(query, params)
      .then(([rows]) => resolve(rows))
      .catch((err) => reject(err));
  });
};

// Find a user by id
UserModel.findByUsername = (username) => {
  return new Promise((resolve, reject) => {
    // if (!validateUserId(id, reject)) return; TODO: Validate username param

    const query = `SELECT * FROM ${TABLE_NAME} WHERE \`username\` =  ?`;
    const params = [username];

    database
      .execute(query, params)
      .then(([[rows]]) => {
        resolve(rows);
      })
      .catch((err) => reject(err));
  });
};

module.exports = UserModel;
