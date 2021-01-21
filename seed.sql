USE employee_tracker_db;

INSERT INTO departments (department)
VALUES ("HR"),("Finance"),("Tech");

INSERT INTO roles (title,salary,department_id)
VALUES ("Accountant", 80000,2),("Software Engineer", 100000, 3),("Technical Project Manager",120000,3),("Recruiter",50000,1);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Kevin", "Shay",1),("Kevin","Lions",2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("erqwerqewr", "cdsfd",1,1),("fsdf","cfsdfsd",2,2);