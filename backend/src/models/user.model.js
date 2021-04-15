const database = require("@lib/database");
const shared = require("ibudget-shared");
const Joi = require("joi");
const dateFns = require("date-fns");
const shared = require("ibudget-shared");
var bcrypt = require("bcrypt-nodejs");

const saltRounds = 10;
const TABLE_NAME = "users";
// const SELECT_COLUMNS = "id, amount, category_id, type_id, date, concept, notes";

const UserModel = {
  userSchema: Joi.object({
    password: Joi.string()
      .min(shared.Limits.PASSWORD_MIN_CHARS)
      .max(shared.Limits.PASSWORD_MAX_CHARS)
      .required(),
    username: Joi.string().email().required(),
    name: Joi.string()
      .min(shared.Limits.USER_NICK_MIN_CHARS)
      .max(shared.Limits.USER_NICK_MAX_CHARS)
      .required(),
  }).unknown(),
};

function validateUserInfo(userInfo, reject) {
  // Joi validation
  const isValidInfo = userInfo && UserModel.userSchema.validate(userInfo);

  // Joi: If the info is not valid then isValidInfo.error will exist and details.message will exist
  if (!isValidInfo || isValidInfo.error) {
    if (reject) {
      reject(
        `The specified user information is not valid. ${
          isValidInfo ? isValidInfo.error : ""
        }`
      );
    }

    return false;
  }

  return true;
}

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
      .then(([[rows]]) => resolve(rows))
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

/* 
  Create a new user

  NOTE: THE PASSWORD WILL BE ENCRYPTED BEFORE INSERTING IT INTO THE DATABASE
*/
UserModel.create = (userInfo) => {
  return new Promise((resolve, reject) => {
    if (!validateUserInfo(userInfo, reject)) return;
    const { name, username, password } = userInfo;

    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (!err) {
        const query = `INSERT INTO ${TABLE_NAME} (name, username, password) VALUES (?, ?, ?)`;
        const params = [name, username, hash];

        database
          .execute(query, params)
          .then(([[rows]]) => {
            resolve({ ...userInfo, id: rows.id });
          })
          .catch((err) => reject(err));
      } else reject(err);
    });
  });
};

module.exports = UserModel;
