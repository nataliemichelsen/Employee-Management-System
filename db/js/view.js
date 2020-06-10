// require general
const inquirer = require("inquirer");
const sql = require("./sql");

// to link to index.js
const index = require("./index");
// to link to server.js
const questions = require("/server");
// to link to edit.js
const edit = require("./edit");

// define constructor(s) for viewing menu options
// insert methods for sql statements / searches / functions
    class viewMenu {
        constructor() {
           this.allEmployees = `
           SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title, role.salary, department.department 
           FROM employee 
           INNER JOIN role 
           ON (employee.role_id = role.id) 
           INNER JOIN department 
           ON (role.department_id = department.id)`;
           this.employeesByDepartment = `
           SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title, role.salary, department.department 
           FROM employee 
           INNER JOIN role 
           ON (employee.role_id = role.id) 
           INNER JOIN department 
           ON (role.department_id = department.id) 
           WHERE department.id = ?`;
           this.employeesByRole = `
           SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title, role.salary, department.department 
           FROM employee 
           INNER JOIN role 
           ON (employee.role_id = role.id) 
           INNER JOIN department 
           ON (role.department_id = department.id) 
           WHERE manager_id = ?`;
           this.allDepartments = `
           SELECT id, department 
           FROM department`;
           this.allManagers = `
           SELECT id, first_name, last_name 
           FROM employee 
           WHERE manager_status = true`;
           this.allRoles = `
           SELECT id, title 
           FROM role`;
        }

        // create functions for each table operation
        // match functions to consts defined on server.js
        // keep these off of index.js for organization

        // builds inquirer prompt objects 
        // utilizes information from server.js to feed data
       inquiry(choices, type, message) {
        return {
            name: "answer",
            type: type,
            message: message,
            choices: [...choices]
        };
    }

    // returns all employees and associated data from SQL search
    allEmployees() {
        return sql.search(this.viewAllEmployees);
    }

    // use inquirer prompts to get data from schema.sql
    allDepartments() {
        return sql.search(this.allDepartments).then((data) => {
            let choices = data.map(x => `${x.id} - ${x.department}`);
            return this.inquiry(choices, "list", "Please select a department:");
        });
    }

    // use inquirer prompts to get data from schema.sql
    allManagers() {
        return sql.search(this.allManagers).then((data) => {
            let choices = data.map(x => `${x.id} - ${x.first_name} ${x.last_name}`);
            return this.inquiry(choices, "list", "Which manager would you like to view?");
        });
    }

    // pulling const from server.js & adding return functionality for data
    viewAllEmployees() {
        return this.allEmployees().then((data) => {
            return this.renderAllEmployees(data);
        });
    }

    // pulling const from server.js & adding return functionality for data
    viewByDepartment() {
        return this.viewByDepartment().then((inquiry) => {
            return inquirer.prompt([inquiry]).then((data) => {
                var arr = data.answer.split(" ");
                return sql.search(this.viewByDepartment, [parseInt(arr[0])]).then((data) => {
                    return this.renderAllEmployees(data);
                });
            });
        });
    }

    // pulling const from server.js & adding return functionality for data
    viewByManager() {
        return this.allManagers().then((inquiry) => {
            return inquirer.prompt([inquiry]).then((data) => {
                var arr = data.answer.split(" ");
                return sql.search(this.allManagers, [parseInt(arr[0])]).then((data) => {
                    return this.renderAllEmployees(data);
                });
            });
        });
    }

    // returns list of all roles
    viewAllRoles() {
        return SQL.search(this.allRolesText);
    }
}

module.exports = viewMenu;