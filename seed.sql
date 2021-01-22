USE employee_tracker_db;

INSERT INTO departments (department)
VALUES ("HR"),("Finance"),("Tech");

INSERT INTO roles (title,salary,department_id)
VALUES ("Accountant", 80000,1),("Software Engineer", 100000, 2),("Technical Project Manager",120000,3),("Recruiter",50000,1);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Kevin", "Shay",1),("Kevin","Lions",2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Harry", "Potter",3,1),("Ron","Weasley",2,2);