USE batman_db;
INSERT INTO departments (department_name)
VALUES
    ("Customer Service"),
    ("Human Resources"),
    ("Management");




INSERT INTO roles (title, salary, department_id)
VALUES
    ( "Team Lead", 15.25, 2),
    (  "Associate", 7.25, 1),
    (  "Manager", 30.25, 3);



INSERT INTO employees (first_name, last_name, role_id)
VALUES
    ( "Christopher","Kennard", 3),
    ( "Kaylee", "Kennard", 1),
    ( "Adonis", "Bailey", 2);

UPDATE employees
SET manager_id = 1
WHERE id IN (2,3)