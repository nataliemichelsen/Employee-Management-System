// require
const mysql = require("mysql");
const path = require("path");
const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");

// define possible actions to take
const actions = 
    {
        type: 'list',
        choices: [ 'View All Employees', 
        'View All Employees by Department', 
        'View All Employees by Manager', 
        'Add Employee', 
        'Update Employee', 
        'Update Employee Roles', 
        'Update Employee Manager', 
        'Remove Employee' ],
        name: 'actions',
    }

// define const that holds all management options
const viewAllEmployees = [
    {
        type: 'list',
        message: 'You are viewing all employees.',
    },
]
const viewByDepartment = [
    {
        type: 'list',
        message: 'You are viewing all employees by department.',
    },
]
const viewByRole = [
    {
        type: 'list',
        choices: [ 'Assistant - 1', 'Team Member - 2', 'Manager - 3', 'Assistant Manager - 4' ],
        message: 'You are viewing all employees by role.',
    },
]
const viewByManager = [
    {
        type: 'list',
        choices: [ 'Jackie Brown', 'Clarice Starling', 'Dorothy Gale', 'Scarlett O`Hara' ],
        message: 'You are viewing all managers. Please select a manager to view their employees.',
    },
]
const addEmployee = [
    {
        type: 'input',
        message: 'What is the first name of the employee you want to add?',
        name: 'first_name',
    },
    {
        type: 'input',
        message: 'What is the last name of the employee you want to add?',
        name: 'last_name',
    },
    {
        type: 'input',
        message: 'What is the title of the employee you want to add?',
        name: 'title',
    },
    {
        type: 'list',
        message: 'What is the role of the employee you want to add?',
        choices: [ 'Leader - 1', 'Assistant - 2', 'Team Member - 3', 'Manager - 4', 'Assistant Manager - 5' ],
        name: 'role_id',
    },
    {
        type: 'list',
        message: 'What is the department of the employee you want to add?',
        choices: [ 'Sales', 'Service', 'Research', 'Janitorial' ],
        name: 'department_id',
    },
    {
        type: 'list',
        message: 'Who is the manager of the employee you want to add?',
        choices: [ 'Jackie Brown', 'Clarice Starling', 'Dorothy Gale', 'Scarlett O`Hara' ],
        name: 'manager_id',
    },
    {
        type: 'input',
        message: 'What is the salary of the employee you want to add?',
        name: 'salary',
    },
]
const addDepartment = [
    {
        type: 'input',
        message: 'What new department would you like to add?',
        name: 'addDepartment',
    },
]
const addRole = [
    {
        type: 'input',
        message: 'What new role would you like to add?',
        name: 'addRole',
    },
]
const updateEmployee = [
    {
        type: 'list',
        message: 'What would you like to update about this employee?',
        choices: [ 'First Name', 'Last Name', 'Manager', 'Role', 'Department', ],
        name: 'updateEmployee',
    },
]
const updateEmployeeRole = [
    {
        type: 'list',
        message: 'What role would you like this employee to have?',
        choices: [ 'Leader - 1', 'Assistant - 2', 'Team Member - 3', 'Manager - 4', 'Assistant Manager - 5' ],
        name: 'updateEmployeeRole',
    },
]
const updateEmployeeDepartment = [
    {
        type: 'list',
        message: 'What department would you like this employee to have?',
        choices: [ 'Sales', 'Service', 'Research', 'Janitorial' ],
        name: 'updateEmployeeDepartment',
    },
]
const updateEmployeeManager = [
    {
        type: 'list',
        message: 'What manager would you like this employee to have?',
        choices: [ 'Jackie Brown', 'Clarice Starling', 'Dorothy Gale', 'Scarlett O`Hara' ],
        name: 'updateEmployeeManager',
    },
]
const removeEmployee = [
    {
        type: 'list',
        message: 'Employee removed from database.',
        name: 'removeEmployee',
    },
]

// initializing the inquirer prompt for the starting question
// using an if statement for fs - to render and write to file
const init = async () => {
    await inquirer.prompt(actions)
}

// calling the init function so the app runs
init()