const clear = require("clear");
const figlet = require("figlet");
const cTable = require("console.table");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const mysqlPromise = require("mysql2/promise");
// const options = require('./public/src/options.js');
// const procedure = require('./public/src/operations.js');
// const procedure = require('./public/src/operation.js');
// import clear from "clear";
// import figlet from "figlet";
// import options  from './public/src/options.js';

const welScreen = async () => {
  clear();
  console.log("\n");
  console.log(
    "-----------------------------------------------------------------"
  );
  console.log(
    figlet.textSync("Employee", {
      font: "Standard",
      horizontalLayout: "default",
      verticalLayout: "default",
    })
  );
  console.log(
    figlet.textSync("Finder", {
      font: "Standard",
      horizontalLayout: "default",
      verticalLayout: "default",
    })
  );
  console.log(
    "-----------------------------------------------------------------"
  );
};

const dbConnect = mysql.createPool(
  {
    host: "127.0.0.1",
    user: "root",
    password: "S1Q23LYm",
    database: "employee_tracker_db",
    // waitForConnections: true,
    connectionLimit: 10,
    // queueLimit: 0,
    // port: 3306,
  },
  async () =>
    await dbConnect.connect((err) => {
      err ? console.log(err.message) : console.log(`db ${dbConnect.state}`);
    })
);

const bgn = async () => {
  await welScreen();
  await options();
  // await procedure();
};

const options = async () => {
  const response = await inquirer.prompt([
    {
      type: "list",
      name: "select",
      message: "What would you like to do ?",
      choices: [
        //^ Employees
        { name: "View all Employees", value: "view_all_employee" },
        { name: "Add Employee", value: "add_employee" },
        { name: "Update Employee Role", value: "update_employee_role" },

        //^ Roles
        { name: "View all Roles", value: "view_all_roles" },
        { name: "Add Role", value: "add_role" },

        //^ Departments
        { name: "View all Departments", value: "view_all_department" },
        { name: "Add Department", value: "add_department" },

        //! DELETE options will be added
        { name: "Delete Employee", value: "delete_employee" },
        { name: "Delete Role", value: "delete_role" },
        { name: "Delete Department", value: "delete_department" },

        { name: "Exit", value: "exit" },
      ],
      // name: 'select',
    },
  ]);

  const select = response.select;

  //*EMPLS
      select === "view_all_employee"
    ? await viewAllEmployees().then(() => options())
    : select === "add_employee"
    ? await addEmployee().then(() => options())
    : select === "update_employee_role"
    ? await updateEmployeeRole().then(() => options())
    
    //! Others need to work before this are uncommented out
    // : select === "view_all_roles"
    // ? await viewAllRoles().then(() => options())
    // : select === "add_role"
    // ? await addRole().then(() => options())
    // : select === "view_all_department"
    // ? await viewAllDepartments().then(() => options())
    // : select === "add_department"
    // ? await addDepartment().then(() => options())
    //! ---
    
    : dbConnect.end();
};




const gR = async () => {
  const [fields] = await dbConnect
  .promise()
  .query("SELECT * FROM roles");
  return fields;
};
const gD = async () => {
  const [fields] = await dbConnect
  .promise()
  .query("SELECT * FROM department");
  return fields;
};
const gM = async () => {
  const [fields] = await dbConnect
    .promise()
    .query("SELECT first_name FROM employee WHERE role_id = 3 ");
  return fields;
};

const viewAllEmployees = async () => {
  let [sql] = await dbConnect.promise().query(
    `SELECT employee.employee_id AS id, employee.first_name, employee.last_name, 
  roles.title, department.name AS department, 
  roles.salary, 
  manager.first_name AS manager 
  FROM employee 
  LEFT JOIN roles on employee.role_id = roles.role_id 
  LEFT JOIN department on roles.department_id = department.id 
  LEFT JOIN employee AS manager on employee.manager_id = manager.employee_id`
  );

  // const [rows, fields] = sql;
  // console.table(rows);
  return console.table(sql);
};

const addEmployee = async () => {
  const roled = await gR();
  //* const gR = async () => {
  //   const [fields] = await dbConnect.promise().query('SELECT * FROM roles');
  //   return fields;
  //* };

  const managers = await gM();

  let map = roled.map((roles) => {
    return {
      name: roles.title,
      value: roles.role_id,
    };
  });

  let mapped = managers.map((manager) => {
    return {
      name: manager.first_name,
      value: manager.role_id,
    };
  });
  
  // const [rows, fields] = await dbConnection.execute(gR());
  // const roles = rows.map((role) => {
  //   return { name: role.title, value: role.id };
  // });

  
  // const [rows2, fields2] = await dbConnection.execute(gM());
  // const managers = rows2.map((manager) => {
  //   return { name: manager.first_name, value: manager.id };
  // });

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "First Name: ",
    },

    {
      type: "input",
      name: "last_name",
      message: "Last Name: ",
    },

    {
      type: "list",
      name: "role_id",
      message: "Role ID:",
      choices: map,
    },

    {
      type: "list",
      name: "manager",
      message: "Who is the manager?",
      choices: [...mapped, "None"],
    },
  ]);
  if (answers.manager === "None") {
    answers.manager = null;
  }

  const [results] = await dbConnect
    .promise()
    .query(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
      [answers.first_name, answers.last_name, answers.role_id, answers.manager],
      (err, results) => {
        if (err) {
          console.log(err);
        }
        console.log(results);
      }
    );


  let [sql] = await db.promise().query(`SELECT employee.employee_id AS id, 
  employee.first_name, employee.last_name, 
  roles.title, 
  department.name AS department, roles.salary, 
  manager.first_name AS manager 
  FROM employee 
  LEFT JOIN roles on (employee.role_id = roles.role_id) 
  LEFT JOIN department on (roles.department_id = department.id) 
  LEFT JOIN employee AS manager on (employee.manager_id = manager.employee_id)`);

  console.log("==== Employee added successfully ====");

  return console.table(sql);
  
};

const updateEmployeeRole = async () => {
  const roles = await gR();
  let map = roles.map((roles) => {
    return {
      name: roles.title,
      value: roles.role_id,
    };
  });

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "employee_first_name",
      message: "Employee First Name: ",
    },

    {
      type: "list",
      name: "role_change",
      message: "Change to what role: ",
      choices: map,
    },
  ]);

  const results = await dbConnect
    .promise()
    .query("UPDATE employee SET role_id = ? WHERE first_name = ?", [
      answers.role_change,
      answers.employee_first_name,
    ]);

  let [sql2] = await dbConnect
    .promise()
    .query(
      `SELECT employee.employee_id AS id, employee.first_name, employee.last_name, 
      roles.title, 
      department.name AS department, roles.salary, 
      manager.first_name AS manager 
      FROM employee 
      LEFT JOIN roles on (employee.role_id = roles.role_id) 
      LEFT JOIN department on roles.department_id = department.id 
      LEFT JOIN employee AS manager on employee.manager_id = manager.employee_id`
    );

  return console.table(sql2);
};

bgn();
