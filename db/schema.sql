DROP DATABASE IF EXISTS employee_tracker_db;


CREATE DATABASE employee_tracker_db;


USE employee_tracker_db;


CREATE TABLE
  departments_db (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
  );


CREATE TABLE
  roles_db (
    roles_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments_db(id) ON DELETE CASCADE
  );


CREATE TABLE
  employees_db (
    employee_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles_db(roles_id),
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employees_db(employee_id) ON DELETE CASCADE
  );