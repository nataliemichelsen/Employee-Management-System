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

// view by all employees
async function viewAllEmployees() {
    return this.allEmployees().then((data) => {
        return this.renderAllEmployees(data);
    });
}

// view by department
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

// view by assigned manager
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
        }
        employeeQuestion.manager_id = managerId
    ])
}

// create / add new role to role table
async function addRole() {
    return this.createRole().then((data) => {
        var inputs = [data.title, data.salary, data.department_id];
        return sql.insert(this.addRole, inputs).then(function (res) {
            return res;
        });
    });
}

// create / add new department to department table
async function addDepartment() {
    return inquirer.prompt([q.department]).then((data) => {
        return sql
            .insert(this.addDepartment, [data.department])
            .then(function (res) {
                return res;
            });
    });
}

// update / make changes to employee table
async function updateEmployee() {
    return this.getEmployeeList().then((inquiry) => {
        return inquirer.prompt([inquiry]).then((data) => {
            var arr = data.answer.split(" ");
            const employeeID = parseInt(arr[0]);
            return this.createEmployee().then((data) => {
                var inputs = [
                    data.first_name,
                    data.last_name,
                    data.role_id,
                    data.manager_id,
                    data.manager_status,
                    employeeID,
                ];
                const reports = [...data.reports];
                return sql.update(this.updateEmployee, inputs).then((res) => {
                    for (let i = 0; i < reports.length; i++) {
                        sql.update(this.updateEmployeeManager, [empID, reports[i]]);
                    }
                });
            });
        });
    });
}

// update / make changes to roles table
async function updateRole() {
    return this.getRoleList().then((inquiry) => {
        return inquirer.prompt([inquiry]).then((data) => {
            var arr = data.answer.split(" ");
            const roleID = parseInt(arr[0]);
            return this.createRole().then((data) => {
                var inputs = [data.title, data.salary, data.department_id, roleID];
                return sql.update(this.updateRoleText, inputs).then((res) => {
                    return res;
                });
            });
        });
    });
}

// update / make changes to department table
async function updateDepartment() {
    return this.getDeptList().then((inquiry) => {
        return inquirer.prompt([inquiry]).then((data) => {
            var arr = data.answer.split(" ");
            const deptID = parseInt(arr[0]);
            return this.createDepartment().then((data) => {
                return sql
                    .update(this.updateDeptText, [data.department, deptID])
                    .then((res) => {
                        return res;
                    });
            });
        });
    });
}

// update assigned manager
async function updateManager()

// removes selected employee
async function deleteEmployee() {
    return this.getEmployeeList().then((inquiry) => {
        return inquirer.prompt([inquiry]).then((data) => {
            var arr = data.answer.split(" ");
            return sql
                .delete(this.deleteEmployee, [parseInt(arr[0])])
                .then((res) => {
                    return res;
                });
        });
    });
}

// removes selected role
async function deleteRole() {
    return this.getRoleList().then((inquiry) => {
        return inquirer.prompt([inquiry]).then((data) => {
            var arr = data.answer.split(" ");
            return sql.delete(this.deleteRole, [parseInt(arr[0])]).then((res) => {
                return res;
            });
        });
    });
}

// removes selected department
async function deleteDepartment() {
    return this.getDepartmentList().then((inquiry) => {
        return inquirer.prompt([inquiry]).then((data) => {
            var arr = data.answer.split(" ");
            return sql
                .delete(this.deleteDepartment, [parseInt(arr[0])])
                .then((res) => {
                    return res;
                });
        });
    });
}

// calling the init function so the app runs
init()