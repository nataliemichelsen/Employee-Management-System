# **Employee-Management-System**

## **Objective**

Developers are often tasked with creating interfaces that make it easy for non-developers to view and interact with information stored in databases. Often these interfaces are known as **C**ontent **M**anagement **S**ystems. 

In this homework assignment, my challenge was to architect and build a solution for managing a company's employees using node, inquirer, and MySQL.

## **Requirements**

1. Design the following database schema containing three tables:

* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager
  
2. Build a command-line application that at a minimum allows the user to:

        ✓ Add departments, roles, employees

        ✓ View departments, roles, employees

        ✓ Update employee roles

## **Bonus**

  ✓ Update employee managers 

  ✓ View employees by manager

  ✓ Delete departments, roles, and employees 

  ✗ View the total utilized budget of a department -- ie the combined salaries of all employees in that department 

## **Video of Deployed Application**
