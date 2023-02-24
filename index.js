const clear = require("clear");
const figlet = require("figlet");
const inquirer = require("inquirer");
const db = require("./public/config/connection");
// const mysqlPromise = require("mysql2/promise");
const cTable = require("console.table");

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

const bgn = async () => {
  await welScreen();
  await options();
};

//^---WHEN I....---
//! WHEN I start the application
//! THEN I am presented with the following options:
//^---------
//* view all employees,
//* add an employee,
//* update an employee role
//^---------
//* view all roles,
//* add a role,

//* view all departments,
//* add a department,
//^---------

const options = async () => {
  const response = await inquirer.prompt([
    {
      type: "list",
      name: "select",
      message: "What would you like to do ?",
      choices: [
        //^ Employee
        { name: "View all Employees", value: "view_all_employee" },
        { name: "Add Employee", value: "add_employee" },
        { name: "Update Employee Role", value: "update_employee_role" },

        //^ Roles
        { name: "View all Roles", value: "view_all_roles" },
        { name: "Add Role", value: "add_role" },

        //^ Department
        { name: "View all Departments", value: "view_all_department" },
        { name: "Add Department", value: "add_department" },

        //! DELETE options will be added
        { name: "Delete Employee", value: "delete_employee" },
        { name: "Delete Role", value: "delete_role" },
        { name: "Delete Department", value: "delete_department" },

        { name: "Exit", value: "exit" },
      ],
    },
  ]);

  // const contPrompt = async () => {
  //   await inquirer.prompt([
  //     {
  //       type: "confirm",
  //       message: "Continue on ?"
  //       name:"continue"
  //     }
  //   ]);
  //   response.continue
  //   ? await options()
  //   : db.end()

  // }

  const select = response.select;

  select === "view_all_employee"
    ? await viewAllEmployees().then(() => options())
    : select === "add_employee"
    ? await addEmployee().then(() => options())
    : select === "update_employee_role"
    ? await updateEmployeeRole().then(() => options())
    : select === "view_all_roles"
    ? await viewAllRoles().then(() => options())
    : select === "add_role"
    ? await addRole().then(() => options())
    : select === "view_all_department"
    ? await viewAllDepartments().then(() => options())
    : select === "add_department"
    ? await addDepartment().then(() => options())
    : db.end();
};

const gR = async () => await db.promise().query("SELECT * FROM roles");

const gD = async () => await db.promise().query("SELECT * FROM department");

const gM = async () =>
  await db
    .promise()
    .query("SELECT first_name FROM employee WHERE role_id = 3 ");

//^ --------- EMPLOYEE
const viewAllEmployees = async () => {
  let sql = await db.promise().query(
    `SELECT employee.employee_id AS id, employee.first_name, employee.last_name, 
    roles.title, department.name AS department, 
    roles.salary, 
    manager.first_name AS manager 
    FROM employee 
    LEFT JOIN roles on employee.role_id = roles.role_id 
    LEFT JOIN department on roles.department_id = department.id 
    LEFT JOIN employee AS manager on employee.manager_id = manager.employee_id`
  );

  return console.table(sql[0]);
};

const addEmployee = async () => {
  const hired = await gR();
  //? for whatever reason my data is an array within an array, this is forcing me
  //? to select the first array,from an array

  let map = hired[0].map((roles) => {
    return {
      name: roles.title,
      value: roles.role_id,
    };
  });

  const managers = await gM();

  let mapped = managers[0].map((manager) => {
    return {
      name: manager.first_name,
      value: manager.role_id,
    };
  });

  const response = await inquirer.prompt([
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

  if (response.manager === "None") {
    response.manager = null;
  }
  // ? (response.manager === "None") : response.manager = null;

  const results = await db
    .promise()
    .query(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
      [
        response.first_name,
        response.last_name,
        response.role_id,
        response.manager,
      ],
      (err, results) => {
        err ? console.log(err) : console.log(results);
      }
    );

  let sql = await db.promise().query(`SELECT employee.employee_id AS id, 
      employee.first_name, employee.last_name, 
      roles.title, 
      department.name AS department, roles.salary, 
      manager.first_name AS manager 
      FROM employee 
      LEFT JOIN roles on (employee.role_id = roles.role_id) 
      LEFT JOIN department on (roles.department_id = department.id) 
      LEFT JOIN employee AS manager on (employee.manager_id = manager.employee_id)`);

  console.log("==== 👌 Employee added successfully ====");

  return console.table(sql[0]);
};

const updateEmployeeRole = async () => {
  const emply = await gR();
  // console.log("Emply", emply[0]);
  let map = emply[0].map((roles) => {
    return {
      name: roles.title,
      value: roles.role_id,
    };
  });

  const response = await inquirer.prompt([
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

  const results = await db
    .promise()
    .query("UPDATE employee SET role_id = ? WHERE first_name = ?", [
      response.role_change,
      response.employee_first_name,
    ]);

  let sql2 = await db.promise().query(
    `SELECT employee.employee_id AS id, employee.first_name, employee.last_name, 
        roles.title, 
        department.name AS department, roles.salary, 
        manager.first_name AS manager 
        FROM employee 
        LEFT JOIN roles on (employee.role_id = roles.role_id) 
        LEFT JOIN department on roles.department_id = department.id 
        LEFT JOIN employee AS manager on employee.manager_id = manager.employee_id`
  );

  return console.table(sql2[0]);
};
//^ --------- ROLE

const viewAllRoles = async () => {
  let sql = await db.promise().query(
    `SELECT roles.role_id AS id, roles.title, roles.salary,
    department.name AS department
    FROM roles
   LEFT JOIN department ON roles.department_id = department.id`
  );
  // console.log("roles",sql[0]);
  return console.table(sql[0]);
};

const addRole = async () => {
  const add = await gD();

  let map = add[0].map((department) => {
    return {
      name: department.name,
      value: department.id,
    };
  });

  const awr = await inquirer.prompt([
    {
      type: "input",
      message: "Enter role title",
      name: "title",
    },
    {
      type: "input",
      message: "Enter role salary",
      name: "salary",
    },
    {
      type: "list",
      name: "department_id",
      message: "Which Department: ",
      choices: map,
    },
  ]);

  const sql = await db.promise().query(
    `
 INSERT INTO roles(title, salary, department_id) 
 VALUES (?,?,?)
 `,
    [awr.title, awr.salary, awr.department_id],
    (err, sql) => {
      err
        ? console.log(err)
        : console.log("==== 👌 Role added successfully ====");
    }
  );

  //? How do i use a execute() method which is built into mysql2
  //? and also display the table like the promise().query() methods ?

  let sql2 = await db.promise().query(
    `SELECT roles.role_id AS id, roles.title, roles.salary,
  department.name AS department
  FROM roles
 LEFT JOIN department ON roles.department_id = department.id`
  );

  return console.table(sql2[0]);
  //* const roled = await gR();

  // console.log("roled", roled[0]);

  //* let map = roled[0].map((roles) => {
  //   return {
  //     name: roles.title,
  //     value: roles.role_id,
  //   };
  // });

  //* const results = await db.promise().query(
  //   `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
  //   [
  //     response.first_name,
  //     response.last_name,
  //     response.role_id,
  //     response.manager,
  //   ],
  //   (err, results) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     console.log(results);
  //   }
  //*   );

  //*   let sql = await db.promise().query(`SELECT employee.employee_id AS id,
  //   employee.first_name, employee.last_name,
  //   roles.title,
  //   department.name AS department, roles.salary,
  //   manager.first_name AS manager
  //   FROM employee
  //   LEFT JOIN roles on (employee.role_id = roles.role_id)
  //   LEFT JOIN department on (roles.department_id = department.id)
  //   LEFT JOIN employee AS manager on (employee.manager_id = manager.employee_id)`);

  //   console.log("==== Employee added successfully ====");

  //   return console.table(sql);
};

//^ --------- DEPARTMENT

const viewAllDepartments = async () => {
  //? is it possible to pass a function within an execute()
  // let sql = await db.promise( console.log(gD())
  // );

  let sql = await db.promise().query(`
  SELECT * FROM department
  `);

  return console.table(sql[0]);
};
const addDepartment = async () => {
  const anwr = await inquirer.prompt([
    {
      type: "input",
      message: "Enter a Department name",
      name: "name",
    },
  ]);

  const sql = await db.promise().query(`
  INSERT INTO department (name) 
  VALUES (?)`,
    [anwr.name],
    ((err, sql) => {
      err
        ? console.log(err)
        : console.log("==== 👌 Department added successfully ====")
    })
  );

  let sql2 = await db.promise().query(
    `
  SELECT * 
  FROM department
  WHERE name = ?`,
    [anwr.name]
  );

  const dep = await db.promise().query(`
  SELECT *
  FROM department
  `);

  return console.table(dep[0]);
};

bgn();
