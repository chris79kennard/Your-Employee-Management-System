// const { response } = require("express");
// const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const Connection = require("mysql2/typings/mysql/lib/Connection");
// const { allowedNodeEnvironmentFlags } = require("process");

// const PORT = process.env.PORT || 3001;
// const app = express();

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
      switch (response.choices) {
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
        default:
          console.log("SOMETHING WENT WRONG!");
      }
    });
}

async function getAllDepartments() {
  try {
    // get the data from the query
    const rows = await query("SELECT * FROM departments;");
    // console table the data
    consoleTable(rows);
  } finally {
    Connection.end();
  }
}

answers();
