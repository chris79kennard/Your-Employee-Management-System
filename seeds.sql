
INSERT INTO department (id,name)
VALUES
    ( 1, "Customer Service"),
    ( 2, "Human Resources");

SELECT * FROM department;


INSERT INTO role (id, tittle, salary, department_id)
VALUES
    ( 1, "Team Lead", 15.25, 02),
    ( 2, "Associate", 7.25, 01),
    ( 3, "Manager", 30.25, 03);

SELECT * FROM role;

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
    ( 1, "Christopher","Kennard" , 3, 0)
    ( 2, "Kaylee", "Kennard", 1, 3),
    ( 3, "Adonis", "Bailey", 2, 3);

SELECT * FROM employee;