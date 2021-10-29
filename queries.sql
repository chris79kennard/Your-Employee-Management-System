-- all departments
SELECT * FROM departments;

-- all Roles
SELECT r.id, title, salary, d.department_name AS department
FROM role 
JOIN departments d ON r.department_id = d.id;

-- all employees
SELECT e.id, e.first_name, e.last_name, r.title AS role, d.department_name AS department, r.salary, m.last_name AS manager
FROM employees e
LEFT JOIN roles r ON e role_id = r.id
LEFT JOIN departments d ON r.department_id = d.id;
LEFT JOIN employees m ON e.manager_id = m.id;

-- all managers
SELECT e.first_name, e.last_name, m.last_name AS manager
FROM employees e
JOIN employee m ON e.manager_id = m.id;

-- add departments 
INSERT INTO departments (department_name)
VALUES ("new department");

-- add role
INSERT INTO role (title, salary, department_id)
VALUES ("new role title", ?, ?);

-- add employee
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("first name", "last name", ? );