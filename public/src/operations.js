// const {db} = require("../config/connection");
// // const mysqlPromise = require("mysql2/promise");
// const inquirer = require("inquirer");

// const options = async () => {
//   const response = await inquirer.prompt([
//     {
//       type: "list",
//       name: "select",
//       message: "What would you like to do ?",
//       choices: [
//         //^ Employee
//         { name: "View all Employees", value: "view_all_employee" },
//         { name: "Add Employee", value: "add_employee" },
//         { name: "Update Employee Role", value: "update_employee_role" },

//         //^ Roles
//         { name: "View all Roles", value: "view_all_roles" },
//         { name: "Add Role", value: "add_role" },

//         //^ Department
//         { name: "View all Departments", value: "view_all_department" },
//         { name: "Add Department", value: "add_department" },

//         //! DELETE options will be added
//         { name: "Delete Employee", value: "delete_employee" },
//         { name: "Delete Role", value: "delete_role" },
//         { name: "Delete Department", value: "delete_department" },

//         { name: "Exit", value: "exit" },
//       ],
//     },
    
//   ]);
  
//   const select = response.select
  
//   select === "view_all_employee"
//   ? await viewAllEmployees().then(() => options())
//   : select === "add_employee"
//   ? await addEmployee().then(() => options())
//   : select === "update_employee_role"
//   ? await updateEmployeeRole().then(() => options())
//   : //! Others need to work before this are uncommented out
//   // : select === "view_all_roles"
//   // ? await viewAllRoles().then(() => options())
//   // : select === "add_role"
//   // ? await addRole().then(() => options())
//   // : select === "view_all_department"
//   // ? await viewAllDepartments().then(() => options())
//   // : select === "add_department"
//   // ? await addDepartment().then(() => options())
//   //! ---
  
//   db.end();
  
// };


// const gR = async () => await db.promise().query("SELECT * FROM roles");

// const gD = async () => await db.promise().query("SELECT * FROM department");

// const gM = async () => await db.promise().query("SELECT first_name FROM employee WHERE role_id = 3 ");


// //^ --------- EMPLOYEE
// const viewAllEmployees = async () => {
//   let sql = await db.promise().query(
//     `SELECT employee.employee_id AS id, employee.first_name, employee.last_name, 
//     roles.title, department.name AS department, 
//     roles.salary, 
//     manager.first_name AS manager 
//     FROM employee 
//     LEFT JOIN roles on employee.role_id = roles.role_id 
//     LEFT JOIN department on roles.department_id = department.id 
//     LEFT JOIN employee AS manager on employee.manager_id = manager.employee_id`
//     );
    
//     return console.table(sql);
//   };
  
//   const addEmployee = async () => {
//     const roled = await gR();
    
//     console.log("roled", roled[0]);
    
//     let map = roled[0].map((roles) => {
//       return {
//         name: roles.title,
//         value: roles.role_id,
//       };
//     });
    
//     // console.log("mapped roles", map)
    
//     const managers = await gM();
    
//     let mapped = managers[0].map((manager) => {
//       return {
//         name: manager.first_name,
//         value: manager.role_id,
//       };
//     });
    
//     const response = await inquirer.prompt([
//       {
//         type: "input",
//         name: "first_name",
//         message: "First Name: ",
//       },
      
//       {
//         type: "input",
//         name: "last_name",
//         message: "Last Name: ",
//       },
      
//       {
//         type: "list",
//         name: "role_id",
//         message: "Role ID:",
//         choices: map,
//       },
      
//       {
//         type: "list",
//         name: "manager",
//         message: "Who is the manager?",
//         choices: [...mapped, "None"],
//       },
//     ]);
    
//     if (response.manager === "None") {
//       response.manager = null;
//     }
//     // ? (response.manager === "None") : response.manager = null;
    
//     const results = await db
//     .promise()
//     .query(
//       `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
//       [
//         response.first_name,
//         response.last_name,
//         response.role_id,
//         response.manager,
//       ],
//       (err, results) => {
//         if (err) {
//           console.log(err);
//         }
//         console.log(results);
//       }
//       );
      
//       let sql = await db.promise().query(`SELECT employee.employee_id AS id, 
//       employee.first_name, employee.last_name, 
//       roles.title, 
//       department.name AS department, roles.salary, 
//       manager.first_name AS manager 
//       FROM employee 
//       LEFT JOIN roles on (employee.role_id = roles.role_id) 
//       LEFT JOIN department on (roles.department_id = department.id) 
//       LEFT JOIN employee AS manager on (employee.manager_id = manager.employee_id)`);
      
//       console.log("==== Employee added successfully ====");
      
//       return console.table(sql);
//     };
    
//     const updateEmployeeRole = async () => {
//       const roles = await gR();
//       let map = roles[0].map((roles) => {
//         return {
//           name: roles.title,
//           value: roles.role_id,
//         };
//       });
      
//       const response = await inquirer.prompt([
//         {
//           type: "input",
//           name: "employee_first_name",
//           message: "Employee First Name: ",
//         },
        
//         {
//           type: "list",
//           name: "role_change",
//           message: "Change to what role: ",
//           choices: map,
//         },
//       ]);
      
//       const results = await db
//       .promise()
//       .query("UPDATE employee SET role_id = ? WHERE first_name = ?", [
//         response.role_change,
//         response.employee_first_name,
//       ]);
      
//       let sql2 = await db.promise().query(
//         `SELECT employee.employee_id AS id, employee.first_name, employee.last_name, 
//         roles.title, 
//         department.name AS department, roles.salary, 
//         manager.first_name AS manager 
//         FROM employee 
//         LEFT JOIN roles on (employee.role_id = roles.role_id) 
//         LEFT JOIN department on roles.department_id = department.id 
//         LEFT JOIN employee AS manager on employee.manager_id = manager.employee_id`
//         );
        
//         return console.table(sql2);
//       };
//       //^ --------- ROLE
      
//       //^ --------- DEPARTMENT

// module.exports = options;