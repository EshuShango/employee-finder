const mysql = require("mysql2");

const db = mysql.createPool(
  {
    host: "127.0.0.1",
    user: "root",
    password: "S1Q23LYm",
    database: "employee_tracker_db",
    waitForConnections: true,
    connectionLimit: 10,
    port: 3306,
  },
  async () =>
    await db.connect((err) => {
      err ? console.log(err.message) : console.log(`db ${db.state}`);
    })
);

module.exports = db;

