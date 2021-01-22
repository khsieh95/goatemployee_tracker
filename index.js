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
        choices: ["Add Employee", "View", "Update Employee Roles", "Quit"],
      },
    ])
    .then(function ({ start }) {
      if (start === "Add Employee") {
        console.log("adding");
        addEmployee();
      } else if (start === "View") {
        view();
      } else if (start === "Update Employee Roles") {
        updateEmployee();
      } else {
        connection.end();
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
        message: "Select the role",
        choices: [
          "Accountant",
          "Software Engineer",
          "Product Manager",
          "Recruiter",
        ],
      },
      {
        type: "list",
        name: "department",
        message: "Select the department",
        choices: ["HR", "Finance", "Tech"],
      },
      {
        type: "number",
        name: "salary",
        message: "What is the employees salary?",
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
            console.log("name added");
          }
        }
      );

      connection.query(
        "INSERT INTO departments (department) VALUES (?)",
        [ans.department],
        function (err, res) {
          if (err) {
            throw err;
          } else {
            console.log("department added");
          }
        }
      );

      connection.query(
        "INSERT INTO roles (title, salary) VALUES (?,?)",
        [ans.role, ans.salary],
        function (err, res) {
          if (err) {
            throw err;
          } else {
            console.log("role added");
          }
        }
      );
    });
}

function view() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "view",
        message: "What would you like to view?",
        choices: ["Employees", "Departments", "Roles", "All"],
      },
    ])
    .then(function (ans) {
      if (ans.view === "Departments") {
        viewDepartments();
      } else if (ans.view === "Roles") {
        viewRoles();
      } else if (ans.view === "Employees") {
        viewEmployees();
      } else {
        viewAll();
      }
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

function viewEmployees() {
  connection.query(
    "SELECT * FROM employee_tracker_db.employees",
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

function viewAll() {
  connection.query(
    "SELECT employees.first_name, employees.last_name, roles.title, departments.department,roles.salary FROM employees JOIN roles ON employees.role_id=roles.id JOIN departments ON roles.department_id=departments.id",
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
  const emptyNamesArray = [];
  let emptyInfoArray;
  const titleArray = [];
  let roleInfoArray;
  connection.query("SELECT title FROM roles", function (err, res) {
    if (err) {
      throw err;
    } else {
      for (i = 0; i < res.length; i++) {
        titleArray.push(res[i].title);
      }
      console.log(titleArray);
    }
  });

  connection.query(
    "SELECT first_name, last_name FROM employees",
    function (err, res) {
      if (err) {
        throw err;
      } else {
        for (i = 0; i < res.length; i++) {
          emptyNamesArray.push(res[i].title);
        }
        console.log(emptyNamesArray);
      }
    }
  );
}
