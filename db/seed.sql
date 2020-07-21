-- // use db from schema.sql
USE CMS_db;

--  // define managers so "sort by manager" works
INSERT INTO department (name)
VALUES 
("Sales"), 
("Finance"), 
("Engineering"), 
("Legal");

INSERT INTO role (title, salary, department_id)
VALUES 
("Sales", 100000, 1), 
("Accountant", 125000, 2), 
("Engineering", 150000, 3), 
("Legal", 250000, 4), 
("Management", 190000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Pheobe", "Buffet", 4, null), 
("Joey", "Tribbiani", 2, null), 
("Rachel", "Green", 3, null), 
("Ross", "Geller", 1, null), 
("Monica", "Geller", 1, null), 
("Chandler", "Bing", 5, null);
