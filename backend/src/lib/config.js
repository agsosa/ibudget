exports.env = process.env.NODE_ENV || "development";

exports.serverPort = process.env.PORT || 4002;

exports.dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
};
