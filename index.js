const inquirer = require("inquirer");
const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "employee_tracker_db",
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  // run the start function after the connection is made to prompt the user
  start();
});

function start() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "start",
        choices: [
          "Add department, role, or employee",
          "View departments, roles, employees",
          "Update employee roles",
          "Quit",
        ],
      },
    ])
    .then(function ({ start }) {
      if (start === "Add department, role, or employee") {
        addSomething();
      } else if (start === "View departments, roles, employees") {
        console.log("View everything");
      } else if (start === "Update employee roles") {
        console.log("Update things");
      } else {
        console.log("Goodbye!");
        connection.end();
      }
    });
}

function addSomething() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "add",
        message: "What would you like to add?",
        choices: ["Department", "Role", "Employee"],
      },
    ])
    .then(function (ans) {
      if (ans.add === "Department") {
        console.log("department");
      } else if (ans.add === "Role") {
        console.log("role");
      } else {
        console.log("employee");
      }
    });
}
