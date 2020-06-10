-- // remove if existing
DROP DATABASE IF EXISTS CMS_db;

-- // create & use database 
CREATE DATABASE CMS_db;
USE CMS_db;

-- // define tables 
CREATE TABLE department (
    id INT auto_increment NOT NULL,
    -- // to hold department name
    department_name VARCHAR(14) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT auto_increment NOT NULL,
    -- // to hold role title
    title VARCHAR(14) NOT NULL,
    -- // to hold role salary
    salary DECIMAL NOT NULL,
    -- // to hold reference to department role belongs to
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    -- // to hold employee first name
    first_name VARCHAR(14) NOT NULL,
    -- // to hold employee last name
    last_name VARCHAR(14) NOT NULL,
    -- // to hold reference to manager employee has (not required for submittance)
    manager VARCHAR(14) NOT NULL,
    -- // to hold reference to role employee has
    role_id INT NOT NULL,
    -- // This field may be null if the employee has no manager
    -- // to hold reference to another employee that manager of the current employee
    manager_id INT,
    PRIMARY KEY (id)
);