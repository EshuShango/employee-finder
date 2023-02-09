import mysql from "mysql2/promise";

//^ ---How im connecting to the MySQL database via---
const dbConnect = mysql.createPool(
  {
    host: 'localhost',
    user: 'root',
    password: 'S1Q23LYm',
    database: 'employee_tracker_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  },
  // console.log(`Connected to the courses_db database.`)
);

export { dbConnect };