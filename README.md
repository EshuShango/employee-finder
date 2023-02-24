#  Employee Finder App

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


## Links

- The repo of the note app: [Source Code](https://github.com/EshuShango/employee-finder)
- Here is the link of live demo [Demo](coming soon)


## Description 🔎

 A command-line application to manage a company's employee database, using Node.js, Inquirer, and MySQL

## Table of Contents 📖
- [Usage](#usage-🔑) 
- [License](#license-📝)
- [Mock up](#mock-up) 
- [Things I Learned](#things-i-learned-📚)
- [RoadMap](#roadmap-🧭)

## Usage 🔑
```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## License 📝
'click the license badge at the beginning of the document to get more info'

## Mock-Up 
![mock up]()


## Things I Learned (still learning) 📚
* `Wow this one was a challenge, but i learned a lot and oddly I've grown a liking to MySQL `
* `More understanding of the power of functions and utilizing them`
* `How to manipulate and work with DataBase`
* `How to work with inquirer and its' built in methods like: prompt`
* `How to work with and how mysql2 and it's built in methods  like: (wrapping my head around this still, but i've made some distance 😓) createPool(), createConnection(), and execute() vs the promise().query() , seem to work`
* `Must Seed after creating the Database and it's tables !!!`


## RoadMap 🧭
 
 * `Refactor code to be more clean and efficient` 
### BONUS:
 * `add the function to Delete departments, roles, and employees`
 * `add the function to Update employee managers `
 * `add the function to View employees by manager `
 * `add the function to View employees by department`
 * `add the function to View the total utilized budget of a department&mdash;in other words, the combined salaries of all employees in that department `
