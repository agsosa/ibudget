const mysql = require("mysql2");

class Database {
  connection;

  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    });

    this.connection.connect(function (err) {
      if (err) {
        console.error("[Database] error connecting: " + err.stack);
        return;
      }

      console.log("[Database] connected successfully");
    });
  }

  close(cb) {
    this.connection.end(cb);
  }
}

module.exports = new Database();
