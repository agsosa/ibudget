const mysql = require("mysql2");
const config = require("./config");

class Database {
  pool;
  promisePool;

  constructor() {
    this.pool = mysql.createPool(config.dbPoolConfig);
    this.promisePool = this.pool.promise();

    console.log("[Database] Initialized");

    // TODO: Listen for errors
  }

  close(cb) {
    this.pool.end(cb);
  }

  execute(query, params) {
    return this.promisePool.execute(query, params);
  }
}

module.exports = new Database(); // Instance cached on the first require()
