-- // use db from schema.sql
USE CMS_db;

--  // define managers so "sort by manager" works
INSERT INTO employee
    (id, first_name, last_name, role_id, manager_status)
VALUES
    (1, "Jackie", "Brown", 1, TRUE),
    (2, "Clarice", "Starling", 2, TRUE),
    (3, "Dorothy", "Gale", 3, TRUE),
    (4, "Scarlett", "O`Hara", 4, TRUE);

--   // define enough for a good working list
--   // insert random data to display a functioning app
INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id, manager_status)
VALUES
    (5, "Jake", "Daring", 5, 1, FALSE),
    (6, "Sach", "Wood", 6, 2, FALSE),
    (7, "Anika", "Wilde", 7, 2, FALSE),
    (8, "Holly", "Holy", 8, 1, FALSE),
    (9, "Layla", "Love", 9, 3, FALSE);

--   // match to data above and below
INSERT INTO role
    (id, title, salary, department_id)
VALUES
    (1, "Customer Service Manager", 4000000, 3),
    (2, "Criminal Manager", 4000000, 3),
    (3, "Wizard Manager", 4000000, 3),
    (4, "Mental Health Manager", 4000000, 3),
    (5, "Customer Service Team Member", 50000, 2),
    (6, "Criminal Assistant Manager", 1000000, 4),
    (7, "General Assistant Manager", 1000000, 4),
    (8, "Customer Service Team Member", 50000, 2),
    (9, "Assistant to Dorothy Gale", 20000 1);

--   // define enough for a good working list
--   // match to choices defined on server.js
INSERT INTO department
    (id, department)
VALUES
    (1, "Assistant"),
    (2, "Team Member"),
    (3, "Manager"),
    (4, "Assistant Manager");