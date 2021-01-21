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
          "Add department, role, and employee",
          "View departments, roles, employees",
          "Update employee roles",
          "Quit",
        ],
      },
    ])
    .then(function ({ start }) {
      if (start === "Add department, role, and employee") {
        console.log("adding");
        addSomething();
      } else if (start === "View departments, roles, employees") {
        viewEverything();
      } else if (start === "Update employee roles") {
        updateEmployee();
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
        type: "input",
        name: "firstName",
        message: "What is the first name of the employee?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the last name of the employee?",
      },
      //   {
      //     type: "input",
      //     name: "role",
      //     message: "What is the role of the employee?",
      //   },
      {
        type: "input",
        name: "department",
        message: "What department is the employee in?",
      },
    ])
    .then(function (ans) {
      const namesArray = [];
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

      //   connection.query(
      //     "INSERT INTO employees (last_name) VALUES (?)",
      //     ans.lastName,
      //     function (err, res) {
      //       if (err) {
      //         throw err;
      //       } else {
      //         console.log("last name added");
      //       }
      //     }
      //   );

      //   connection.query(
      //     "INSERT INTO roles (title) VALUES (?)",
      //     [ans.role],
      //     function (err, res) {
      //       if (err) {
      //         throw err;
      //       } else {
      //         console.log("Role Added!");
      //       }
      //     }
      //   );
      connection.query(
        "INSERT INTO departments (department) VALUES (?)",
        [ans.department],
        function (err, res) {
          if (err) {
            throw err;
          } else {
            console.log("Department Added!");
            start();
          }
        }
      );
    });
}

function viewEverything() {
  connection.query(
    "SELECT employees.first_name, employees.last_name, roles.title, departments.department, roles.salary FROM employees JOIN roles ON employees.role_id=roles.id JOIN departments ON roles.department_id=departments.id",
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
