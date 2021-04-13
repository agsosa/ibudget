const mysql = require("mysql2");
const config = require("./config");

class Database {
  connection;

  constructor() {
    this.connection = mysql.createConnection(config.dbConfig);

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

  execute(query, params) {
    return this.connection.promise().execute(query, params);
  }
}

module.exports = new Database();
