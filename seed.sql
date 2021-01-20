USE employee_tracker_db;

INSERT INTO department (name)
VALUES ("HR"),("Finance"),("Tech");

INSERT INTO role (title,salary,department_id)
VALUES ("Accountant", 80000,2),("Software Engineer", 100000, 3),("Technical Project Manager",120000,3),("Recruiter",50000,1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Kevin", "Shay",1),("Kevin","Lions",2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Hsieh",1,1),("Kevin","Lyons",2,2);