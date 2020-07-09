// require general
const inquirer = require("inquirer");

// links
// const db = require("./db");
require("console.table");

// define possible actions to take
const actions =
[
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
        name: 'choice',
    }
]

// define const that holds all management options
const allEmployees = [
    {
        type: 'list',
        message: 'You are viewing all employees.',
    },
]
const byDepartment = [
    {
        type: 'list',
        message: 'You are viewing all employees by department.',
    },
]
const byRole = [
    {
        type: 'list',
        choices: ['Assistant - 1', 'Team Member - 2', 'Manager - 3', 'Assistant Manager - 4'],
        message: 'You are viewing all employees by role.',
    },
]
const byManager = [
    {
        type: 'list',
        choices: ['Jackie Brown', 'Clarice Starling', 'Dorothy Gale', 'Scarlett O`Hara'],
        message: 'You are viewing all managers. Please select a manager to view their employees.',
    },
]
const addNewEmployee = [
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
const addNewDepartment = [
    {
        type: 'input',
        message: 'What new department would you like to add?',
        name: 'addDepartment',
    },
]
const addNewRole = [
    {
        type: 'input',
        message: 'What new role would you like to add?',
        name: 'addRole',
    },
]
const updateCurrentEmployee = [
    {
        type: 'list',
        message: 'What would you like to update about this employee?',
        choices: ['First Name', 'Last Name', 'Manager', 'Role', 'Department',],
        name: 'updateEmployee',
    },
]
const updateCurrentRole = [
    {
        type: 'list',
        message: 'What role would you like this employee to have?',
        choices: ['Leader - 1', 'Assistant - 2', 'Team Member - 3', 'Manager - 4', 'Assistant Manager - 5'],
        name: 'updateRole',
    },
]
const updateCurrentDepartment = [
    {
        type: 'list',
        message: 'What department would you like this employee to have?',
        choices: ['Sales', 'Service', 'Research', 'Janitorial'],
        name: 'updateDepartment',
    },
]
const updateCurrentManager = [
    {
        type: 'list',
        message: 'What manager would you like this employee to have?',
        choices: ['Jackie Brown', 'Clarice Starling', 'Dorothy Gale', 'Scarlett O`Hara'],
        name: 'updateManager',
    },
]
const deleteThisEmployee = [
    {
        type: 'list',
        message: 'Employee removed from database.',
        name: 'deleteEmployee',
    },
]
const deleteThisRole = [
    {
        type: 'list',
        message: 'Employee removed from database.',
        name: 'deleteRole',
    },
]
const deleteThisDepartment = [
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

async function loadPrompt() {
    // const { choice } = await inquirer.prompt(actions)
    const {choice} = await inquirer.prompt([{
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [{
            name: 'whatever',
            value: 'hey'
        },
        {
            name: '1',
            value: 'fdsaadf'
        },
        {
            name: 'whateve2r',
            value: 'fsda'
        },
        {
            name: '3',
            value: 'fds'
        },
        {
            name: '4',
            value: 'sd'
        }
    ]
    }])
    switch (choice) {
        case 'View All Employees':
            console.log("switchCase")
            return viewAllEmployees()
            break
        case 'View All Employees by Department':
            return viewByDepartment()
            break
        case 'View All Employees by Manager':
            return viewByManager()
            break
        case 'Add Employee':
            return addEmployee()
            break
        case 'Add Role':
            return addRole()
            break
        case 'Add Department':
            return addDepartment()
            break
        case 'Update Employee':
            return updateEmployee()
            break
        case 'Update Employee Roles':
            return updateRole()
            break
        case 'Update Employee Manager':
            return updateManager()
            break
        case 'Remove Employee':
            return deleteEmployee()
            break
    }
}

// view by all employees
async function viewAllEmployees() {
    const employees = await db.findAllEmployees()
    const employeeList = employees.map(({ id, name }) => ({
        name: name, value: id
    }));
    console.table(employees)
}

// view by department
async function viewByDepartment() {
    const departments = await db.findAllDepartments()
    const departmentChoices = departments.map(({ id, name }) => ({
        name: name, value: id
    }));
    const { department_id } = await inquirer.prompt([
        {
            type: 'list',
            message: 'Which department would you like to view?',
            name: 'department_id',
            choices: departmentChoices
        },
    ]);
    const employee = await db.findAllEmployeesByDepartment(department_id)
    console.table(employee)
    loadPrompt()
}

// view by assigned manager
async function viewByManager() {
    const managers = await db.findAllEmployees()
    const managerChoices = managers.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`, value: id
    }));
    const { manager_id } = await inquirer.prompt([
        {
            type: 'list',
            message: 'Which manager would you like to view?',
            name: 'manager_id',
            choices: managerChoices
        },
    ]);
    const employee = await db.findAllEmployeesByManager(manager_id)
    console.table(employee)
    loadPrompt()
}

// create / add new employee to employee table
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
    const { roleId } = await inquirer.prompt(updateEmployeeRole)
    employeeQuestion.role_id = roleId
    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));
    managerChoices.unshift({ name: "none", value: "null" })
    const { managerId } = await inquirer.prompt([
        {
            type: 'list',
            message: 'Who is the manager of the employee you want to add?',
            choices: managerChoices,
            name: 'manager_id',
        },
        employeeQuestion.manager_id = managerId
    ])
    console.table(employees)
    loadPrompt()
}

// create / add new role to role table
async function addRole() {
    const roles = await db.addRole()
    const roleChoices = roles.map(({ role_id }) => ({
        value: role_id
    }));
    const { role_id } = await inquirer.prompt([
        {
            type: 'list',
            message: 'What new role would you like to add?',
            name: 'role_id',
            choices: roleChoices
        },
    ]);
    const employee = await db.addRole(role_id)
    console.table(roles)
    loadPrompt()
}

// create / add new department to department table
async function addDepartment() {
    const department = await db.addDepartment()
    const departmentChoices = department.map(({ department_id }) => ({
        value: department_id
    }));
    const { department_id } = await inquirer.prompt([
        {
            type: 'list',
            message: 'What new department would you like to add?',
            name: 'department_id',
            choices: departmentChoices
        },
    ]);
    const employee = await db.addDepartment(department_id)
    console.table(department)
    loadPrompt()
}

// update / make changes to employee table
async function updateEmployee() {
    const employees = await db.updateEmployee()
    const employeeChoices = employee.map(({ employee_id }) => ({
        value: employee_id
    }));
    const { employee_id } = await inquirer.prompt([
        {
            type: 'list',
            message: 'Which employee would you like to update?',
            name: 'employee_id',
            choices: employeeChoices
        },
    ]);
    const employee = await db.updateEmployee(employee_id)
    console.table(employee)
    loadPrompt()
}

// update / make changes to roles table
async function updateRole() {
    const role = await db.updateRole()
    const roleChoices = role.map(({ role_id }) => ({
        value: role_id
    }));
    const { role_id } = await inquirer.prompt([
        {
            type: 'list',
            message: 'Which role would you like to update?',
            name: 'role_id',
            choices: roleChoices
        },
    ]);
    const employee = await db.updateRole(role_id)
    console.table(role)
    loadPrompt()
}

// update / make changes to department table
async function updateDepartment() {
    const department = await db.updateDepartment()
    const departmentChoices = department.map(({ department_id }) => ({
        value: department_id
    }));
    const { department_id } = await inquirer.prompt([
        {
            type: 'list',
            message: 'Which department would you like to update?',
            name: 'department_id',
            choices: departmentChoices
        },
    ]);
    const employee = await db.updateDepartment(department_id)
    console.table(department)
    loadPrompt()
}

// update assigned manager
async function updateManager() {
    const manager = await db.updateManager()
    const managerChoices = manager.map(({ manager_id }) => ({
        value: manager_id
    }));
    const { manager_id } = await inquirer.prompt([
        {
            type: 'list',
            message: 'Which manager would you like to update?',
            name: 'manager_id',
            choices: managerChoices
        },
    ]);
    const employee = await db.updateManager(manager_id)
    console.table(manager)
    loadPrompt()
}

// removes selected employee
async function deleteEmployee() {
    const employees = await db.removeEmployee()
    const employeeChoices = employee.map(({ employee_id }) => ({
        value: employee_id
    }));
    const { employee_id } = await inquirer.prompt([
        {
            type: 'list',
            message: 'Which employee would you like to remove?',
            name: 'employee_id',
            choices: employeeChoices
        },
    ]);
    const employee = await db.removeEmployee(employee_id)
    console.table(employee)
    loadPrompt()
}

// removes selected role
async function deleteRole() {
    const role = await db.removeRole()
    const roleChoices = role.map(({ role_id }) => ({
        value: role_id
    }));
    const { role_id } = await inquirer.prompt([
        {
            type: 'list',
            message: 'Which role would you like to remove?',
            name: 'role_id',
            choices: roleChoices
        },
    ]);
    const employee = await db.removeRole(role_id)
    console.table(role)
    loadPrompt()
}

// removes selected department
async function deleteDepartment() {
    const department = await db.removeDepartment()
    const departmentChoices = department.map(({ department_id }) => ({
        value: department_id
    }));
    const { department_id } = await inquirer.prompt([
        {
            type: 'list',
            message: 'Which department would you like to remove?',
            name: 'department_id',
            choices: departmentChoices
        },
    ]);
    const employee = await db.removeDepartment(department_id)
    console.table(department)
    loadPrompt()
}

// calling the init function so the app runs
loadPrompt()