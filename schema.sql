-- // remove if existing
DROP DATABASE IF EXISTS CMS_db;

-- // create & use database 
CREATE DATABASE CMS_db;
USE CMS_db;

-- // define tables 
CREATE TABLE department
(
    id INT
    auto_increment NOT NULL,
    -- // to hold department name
    department_name VARCHAR
    (14) NOT NULL,
    PRIMARY KEY
    (id)
);

    CREATE TABLE role
    (
        id INT
        auto_increment NOT NULL,
    -- // to hold role title
    title VARCHAR
        (14) NOT NULL,
    -- // to hold role salary
    salary DECIMAL NOT NULL,
    -- // to hold reference to department role belongs to
    department_id INT NOT NULL,
    PRIMARY KEY
        (id)
);

        CREATE TABLE employee
        (
            id INT
            auto_increment NOT NULL,
    -- // to hold employee first name
    first_name VARCHAR
            (14) NOT NULL,
    -- // to hold employee last name
    last_name VARCHAR
            (14) NOT NULL,
    -- // to hold reference to manager employee has (not required for submittance)
    manager VARCHAR
            (14) NOT NULL,
    -- // to hold reference to role employee has
    role_id INT NOT NULL,
    -- // This field may be null if the employee has no manager
    -- // to hold reference to another employee that manager of the current employee
    manager_id INT,
    PRIMARY KEY
            (id)
);

            --  // define managers so "sort by manager" works
            INSERT INTO department
                (name)
            VALUES
                ("Sales"),
                ("Finance"),
                ("Engineering"),
                ("Legal");

            INSERT INTO role
                (title, salary, department_id)
            VALUES
                ("Sales", 100000, 1),
                ("Accountant", 125000, 2),
                ("Engineering", 150000, 3),
                ("Legal", 250000, 4),
                ("Management", 190000, 5);

            INSERT INTO employee
                (first_name, last_name, role_id, manager_id)
            VALUES
                ("Pheobe", "Buffet", 4, null),
                ("Joey", "Tribbiani", 2, null),
                ("Rachel", "Green", 3, null),
                ("Ross", "Geller", 1, null),
                ("Monica", "Geller", 1, null),
                ("Chandler", "Bing", 5, null);
