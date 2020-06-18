// require general
const inquirer = require("inquirer");

// links
const db = require("./db");
require("console.table");

// define possible actions to take
const actions =
{
    type: 'list',
    choices: ['View All Employees',
        'View All Employees by Department',
        'View All Employees by Manager',
        'Add Employee',
        'Add Role',
        'Add Department',
        'Update Employee',
        'Update Employee Roles',
        'Update Employee Manager',
        'Remove Employee'],
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
        choices: ['Assistant - 1', 'Team Member - 2', 'Manager - 3', 'Assistant Manager - 4'],
        message: 'You are viewing all employees by role.',
    },
]
const viewByManager = [
    {
        type: 'list',
        choices: ['Jackie Brown', 'Clarice Starling', 'Dorothy Gale', 'Scarlett O`Hara'],
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
        choices: ['Leader - 1', 'Assistant - 2', 'Team Member - 3', 'Manager - 4', 'Assistant Manager - 5'],
        name: 'role_id',
    },
    {
        type: 'list',
        message: 'What is the department of the employee you want to add?',
        choices: ['Sales', 'Service', 'Research', 'Janitorial'],
        name: 'department_id',
    },
    {
        type: 'list',
        message: 'Who is the manager of the employee you want to add?',
        choices: ['Jackie Brown', 'Clarice Starling', 'Dorothy Gale', 'Scarlett O`Hara'],
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
const updateDepartment = [
    {
        type: 'list',
        message: 'What would you like to update about this employee?',
        choices: ['First Name', 'Last Name', 'Manager', 'Role', 'Department',],
        name: 'updateEmployee',
    },
]
const updateRole = [
    {
        type: 'list',
        message: 'What would you like to update about this employee?',
        choices: ['First Name', 'Last Name', 'Manager', 'Role', 'Department',],
        name: 'updateEmployee',
    },
]
const updateEmployee = [
    {
        type: 'list',
        message: 'What would you like to update about this employee?',
        choices: ['First Name', 'Last Name', 'Manager', 'Role', 'Department',],
        name: 'updateEmployee',
    },
]
const updateRole = [
    {
        type: 'list',
        message: 'What role would you like this employee to have?',
        choices: ['Leader - 1', 'Assistant - 2', 'Team Member - 3', 'Manager - 4', 'Assistant Manager - 5'],
        name: 'updateRole',
    },
]
const updateDepartment = [
    {
        type: 'list',
        message: 'What department would you like this employee to have?',
        choices: ['Sales', 'Service', 'Research', 'Janitorial'],
        name: 'updateDepartment',
    },
]
const updateManager = [
    {
        type: 'list',
        message: 'What manager would you like this employee to have?',
        choices: ['Jackie Brown', 'Clarice Starling', 'Dorothy Gale', 'Scarlett O`Hara'],
        name: 'updateManager',
    },
]
const deleteEmployee = [
    {
        type: 'list',
        message: 'Employee removed from database.',
        name: 'deleteEmployee',
    },
]
const deleteRole = [
    {
        type: 'list',
        message: 'Employee removed from database.',
        name: 'deleteRole',
    },
]
const deleteDepartment = [
    {
        type: 'list',
        message: 'Employee removed from database.',
        name: 'deleteDepartment',
    },
]

// initializing the inquirer prompt for the starting question
// using an if statement for fs - to render and write to file
const init = async () => {
    loadPrompt()
}

loadPrompt = async () => {
    const { choice } = await inquirer.prompt(actions)
    switch (choice) {
        case 'View All Employees':
            return viewAllEmployees()
            break;
        case 'View All Employees by Department':
            return viewByDepartment()
            break;
        case 'View All Employees by Manager':
            return viewByManager()
            break;
        case 'Add Employee':
            return addEmployee()
            break;
        case 'Add Role':
            return addEmployee()
            break;
        case 'Add Department':
            return addEmployee()
            break;
        case 'Update Employee':
            return updateEmployee()
            break;
        case 'Update Employee Roles':
            return updateRole()
            break;
        case 'Update Employee Manager':
            return updateDept()
            break;
        case 'Remove Employee':
            return deleteEmployee()
            break;
    }
}

// pulling const from server.js & adding return functionality for data
async function viewAllEmployees() {
    return this.allEmployees().then((data) => {
        return this.renderAllEmployees(data);
    });
}

async function viewByDepartment() {
    return this.viewByDepartment().then((inquiry) => {
        return inquirer.prompt([inquiry]).then((data) => {
            var arr = data.answer.split(" ");
            return sql
                .search(this.viewByDepartment, [parseInt(arr[0])])
                .then((data) => {
                    return this.renderAllEmployees(data);
                });
        });
    });
}

async function viewByManager() {
    return this.allManagers().then((inquiry) => {
        return inquirer.prompt([inquiry]).then((data) => {
            var arr = data.answer.split(" ");
            return sql.search(this.allManagers, [parseInt(arr[0])]).then((data) => {
                return this.renderAllEmployees(data);
            });
        });
    });
}

async function addEmployee() {
    const roles = await db.findAllRoles()
    const employees = await db.findAllEmployees()
    const employeeQuestion = await inquirer.prompt([
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
    ])
    const roleChoices = roles.map(({ id, title }) => ({
        name: title, 
        value: id
    }));
    const {roleId} = await inquirer.prompt(updateEmployeeRole)
    employeeQuestion.role_id = roleId
    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));
    managerChoices.unshift({ name:"none", value: "null" })
    const {managerId} = await inquirer.prompt([
        {
            type: 'list',
            message: 'Who is the manager of the employee you want to add?',
            choices: managerChoices,
            name: 'manager_id',
        }
        employeeQuestion.manager_id = managerId
    ])
}

async function addRole()

async function addDepartment()

async function updateEmployee()

async function updateRole()

async function updateDepartment()

async function updateManager()

async function deleteEmployee()

async function deleteRole()

async function deleteDepartment()

async function deleteEmployee()


// calling the init function so the app runs
init()