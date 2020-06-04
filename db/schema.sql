-- // remove if existing
DROP DATABASE IF EXISTS CMS;

-- // create & use database 
CREATE DATABASE CMS;
USE CMS;

-- // define tables 
CREATE TABLE department (
    -- // to hold department name
    name VARCHAR(30) 
    PRIMARY KEY (id)
);



CREATE TABLE role (
    -- // to hold role title
    title VARCHAR(30),
    -- // to hold role salary
    salary DECIMAL,
    -- // to hold reference to department role belongs to
    department_id INT,
    PRIMARY KEY (id)
);


CREATE TABLE employee (
    -- // to hold employee first name
    first_name VARCHAR(30) ,
    -- // to hold employee last name
    last_name VARCHAR(30) ,
    -- // to hold reference to role employee has
    role_id INT ,
    -- // This field may be null if the employee has no manager
    -- // to hold reference to another employee that manager of the current employee
    manager_id INT ,
    PRIMARY KEY (id)
);


NOT NULL AUTO_INCREMENT