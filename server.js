// require
const mysql = require("mysql");
const path = require("path");
const fs = require("fs");

// define possible actions to take
const actions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: [ 'View All Employees', 
        'View All Employees by Department', 
        'View All Employees by Manager', 
        'Add Employee', 
        'Update Employee', 
        'Update Employee Roles', 
        'Update Employee Manager', 
        'Remove Employee' ],
        name: 'actions',
    },
]


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
        message: 'You are viewing all employees by role.',
    },
]
const addEmployee = [
    {
        type: '',
        message: '?',
        choices: ['Manager', 'Intern', 'Engineer'],
        name: 'role',
    },
]
const addDepartments = [
    {
        type: '',
        message: '?',
        choices: ['Manager', 'Intern', 'Engineer'],
        name: 'role',
    },
]
const updateEmployee = [
    {
        type: '',
        message: '?',
        choices: ['Manager', 'Intern', 'Engineer'],
        name: 'role',
    },
]
const updateEmployeeRoll = [
    {
        type: '',
        message: '?',
        choices: ['Manager', 'Intern', 'Engineer'],
        name: 'role',
    },
]
const updateEmployeeDepartment = [
    {
        type: '',
        message: '?',
        choices: ['Manager', 'Intern', 'Engineer'],
        name: 'role',
    },
]
const removeEmployee = [
    {
        type: '',
        message: 'Employee removed from database.',
        name: 'remove',
    },
]

// initializing the inquirer prompt for the starting question
// using an if statement for fs - to render and write to file
const init = async () => {
    const { newEmployee } = await inquirer.prompt({
        type: 'confirm',
        message: ' ?',
        name: ' '
    })

    if ( newEmployee ) {
        initEmployee();
    } else {
        if (employees.length > 0) {
            if (fs.existsSync(OUTPUT_DIR)) {
                return fs.writeFileSync(outputPath, render(employees), )
            } else {
                return fs.mkdir(OUTPUT_DIR, err => {
                    if(err) throw err;
    
                    return fs.writeFileSync(outputPath, render(employees))
                })
            }
        }
    }
}

// calling the init function so the app runs
init();