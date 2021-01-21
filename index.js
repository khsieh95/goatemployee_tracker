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
        choices: ["Add", "View", "Update Employee Roles", "Quit"],
      },
    ])
    .then(function ({ start }) {
      if (start === "Add") {
        console.log("adding");
        add();
      } else if (start === "Add Department") {
        console.log("add department");
      } else if (start === "Add Role") {
        console.log("add Role");
      } else if (start === "View Departments") {
        console.log("view department");
        viewDepartments();
      } else if (start === "View Roles") {
        viewRoles();
        console.log("view roles");
      } else if (start === "View Employees") {
        console.log("view employees");
      } else if (start === "Update Employee Roles") {
        console.log("update employee roles");
      } else {
        connection.end();
      }
    });
}

function add() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "add",
        message: "What would you like to add?",
        choices: ["Employee", "Department", "Role"],
      },
    ])
    .then(function (ans) {
      if (ans.add === "Employee") {
        addEmployee();
      }
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the first name of the employee?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the last name of the employee?",
      },
      {
        type: "list",
        name: "role",
        message: "What is the employee's role?",
        choices: [
          "Accountant",
          "Software Engineer",
          "Product Manager",
          "Recruiter",
        ],
      },
    ])
    .then(function (ans) {
      connection.query(
        "INSERT INTO employees (first_name, last_name) VALUES (?,?)",
        [ans.firstName, ans.lastName],
        function (err, res) {
          if (err) {
            throw err;
          } else {
            console.log("first name added");
          }
        }
      );
    });
}

function viewDepartments() {
  connection.query(
    "SELECT * FROM employee_tracker_db.departments;",
    function (err, res) {
      if (err) {
        throw err;
      } else console.table(res);
      start();
    }
  );
}

function viewRoles() {
  connection.query(
    "SELECT * FROM employee_tracker_db.roles;",
    function (err, res) {
      if (err) {
        throw err;
      } else {
        console.table(res);
        start();
      }
    }
  );
}

function updateEmployee() {
  const employee = connection.query(
    "SELECT * FROM employee_tracker_db.employee"
  );

  const employeeArray = [];
  employeeArray.push(employee);
  console.table(employeeArray);

  //   inquirer.prompt([
  //     {
  //       type: "list",
  //       name: "udpate",
  //       message: "Who would you like to update?",
  //       choices: employee,
  //     },
  //   ]);
}
