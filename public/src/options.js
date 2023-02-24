// const inquirer = require("inquirer");

// const options = async () => {
//   const response = await inquirer.prompt([
//     {
//       type: "list",
//       name: "select",
//       message: "What would you like to do ?",
//       choices: [
//         //^ Employees
//         { name: "View all Employees", value: "view_all_employee" },
//         { name: "Add Employee", value: "add_employee" },
//         { name: "Update Employee Role", value: "update_employee_role" },

//         //^ Roles
//         { name: "View all Roles", value: "view_all_roles" },
//         { name: "Add Role", value: "add_role" },

//         //^ Departments
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

//   module.exports = options;