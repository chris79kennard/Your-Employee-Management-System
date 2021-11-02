const mysql = require("mysql2");
const util = require("util");
const { Table } = require("console-table-printer");
const inquirer = require("inquirer");
const { start } = require("repl");

// connect to database
const connection = mysql.createConnection(
  {
    host: "localhost",
    // mysql username
    user: "root",
    // sql password
    password: "Kennard79!",
    database: "batman_db",
  },
  console.log("Connected to the batman_db.")
);

const query = util.promisify(connection.query).bind(connection);

function consoleTable(rows) {
  const table = new Table();
  table.addRows(rows);
  table.printTable();
}

function answers() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "what would you like to do?",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add a employee",
          "update an employee role",
          "Quit",
        ],
      },
    ])
    .then((response) => {
      switch (response.choice) {
        case "view all departments":
          getAllDepartments();
          break;
        case "view all roles":
          getAllRoles();
          break;
        case "view all employees":
          getAllEmployees();
          break;
        case "add a department":
          addDepartment();
          break;
        case "add a role":
          addRole();
          break;
        case "add an employee":
          addEmployee();
          break;
        case "update an employee role":
          updateEmployee();
          break;
          case "Quit":
            connection.end();
            break;
        default:
          console.log("SOMETHING WENT WRONG!");
      }
    });
}

async function getAllDepartments() {
  try {
    // get the data from the query
    const rows = await query(`SELECT * FROM departments;`);
    // console table the data
    consoleTable(rows);
  } finally {
    answers();
  }
}

async function getAllRoles() {
  try {
    const rows = await query(
      `SELECT r.id, title, salary, d.department_name AS department FROM roles r JOIN departments d ON r.department_id = d.id;`);
    consoleTable(rows);
  } finally {
    answers();
  }
}

async function getAllEmployees() {
  try {
    const rows = await query(
      `SELECT e.id, e.first_name, e.last_name, r.title AS role, d.department_name AS department, r.salary, m.last_name AS manager FROM employees e LEFT JOIN roles r ON e.role_id = r.id LEFT JOIN departments d ON r.department_id = d.id LEFT JOIN employees m ON e.manager_id = m.id;`);
    consoleTable(rows);
  } finally {
    answers();
  }
}
async function addDepartment(){
  inquirer
    .prompt([
      {
          type: "input",
          name: "departmentName",
          message: "What is the name of the new department you would like to add?"
      }
    ])
    .then((response) => {
        addDepartmentQuery(response);
    })
};

async function addDepartmentQuery (res){
  const {departmentName} = res;
  try{
    await query (`INSERT INTO departments (department_name) VALUES (?);`, [departmentName]);
    const rows = await query(`SELECT * FROM departments;`);
    consoleTable(rows);
  } finally {
    answers();
  }
};

async function addRole(){
  inquirer
    .prompt([
      {
          type: "input",
          name: "NewRole",
          message: "What is the name of the new role you would like to add?"
      },
      {
        type: "input",
        name: "RoleSalary",
        message: "What is the salary of the new role you would like to add?"
    },
    {
      type: "input",
      name: "RoleDepartment",
      message: "What is the department of the new role you would like to add?"
  }
    ])
    .then((response) => {
        addRoleQuery(response);
    })
};

async function addRoleQuery (res){
  const {NewRole, RoleSalary, RoleDepartment} = res;
  const deptIdArr = await query(`SELECT id FROM departments WHERE department_name=?;`,[RoleDepartment]);
  console.log(deptIdArr);
  const deptId= deptIdArr[0].id;
  try{
    await query (`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`, [NewRole, RoleSalary, deptId]);
    const rows = await query(`SELECT r.id, title, salary, d.department_name AS department FROM roles r JOIN departments d ON r.department_id = d.id;`);
    consoleTable(rows);
  } finally {
    answers();
  }
};


async function addEmployee(){
  inquirer
    .prompt([
      {
          type: "input",
          name: "First_Name",
          message: "What is the first name of the new employee you would like to add?"
      },
      {
        type: "input",
        name: "Last_name",
        message: "What is the last name of the new employee you would like to add?"
    },
    {
      type: "input",
      name: "employeeRole",
      message: "What is the role of the new employee you would like to add?"
  },
  {
    type: "input",
    name: "employeeManager",
    message: "What is the first name of the new employees manager?"
}
    ])
    .then((response) => {
        addEmployeeQuery(response);
    })
};

async function addEmployeeQuery (res){
  const {First_Name, Last_name, employeeRole, employeeManager} = res;
  const role_id = await query(`SELECT id FROM roles WHERE title = ?;`, [employeeRole])
  const manager_id = await query(`SELECT id FROM employees WHERE first_name = ?;`, [employeeManager])

  try{
    await query (`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ? );`, [First_Name, Last_name, role_id, manager_id]);
    const rows = await query(`SELECT e.id, e.first_name, e.last_name, r.title AS role, d.department_name AS department, r.salary, m.last_name AS manager FROM employees e LEFT JOIN roles r ON e.role_id = r.id LEFT JOIN departments d ON r.department_id = d.id LEFT JOIN employees m ON e.manager_id = m.id;`);
    consoleTable(rows);
  } finally {
    answers();
  }
};
answers();