INSERT INTO
  department (name)
VALUES
  ("Corporate"),
  ("HR"),
  ("Foh"),
  ("Sales");


INSERT INTO
  roles (title, salary, department_id)
VALUES
  ("Ceo", 90000, 1),
  ("Secretary", 35000, 2),
  ("Management", 25000, 3),
  ("Cashier", 15000, 4);


INSERT INTO
  employees (first_name, last_name, role_id, manager_id)
VALUES
  ("Olu", "Akinyemi", 1, Null),
  ("Padong", "Xoing", 2, 1),
  ("Sam", "Flavin", 3, 2),
  ("Joe", "Smoe", 4, 2);