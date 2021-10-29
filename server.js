const mysql = require("mysql2");
const util = require("util");
const { Table } = require("console-table-printer");
const inquirer = require("inquirer");

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

answers();
