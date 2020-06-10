// require general
const inquirer = require("inquirer");
const sql = require("./sql");

// to link to index.js
const index = require("./index");
// to link to server.js
const questions = require("/server");
// to link to view.js
const edit = require("./view");

// define constructor(s) to edit (update, add, delete)
// insert methods for sql statements / searches / functions
class Edit extends View {
    constructor() {
        super();
        this.updateDepartment = `
        SELECT id, department 
        FROM department`;
        this.updateEmployee = `
        UPDATE employee 
        SET first_name = ?, last_name = ?, role_id = ?, manager_id = ?, manager_status = ?  
        WHERE id = ?`;
        this.updateEmployeeRole = `
        UPDATE role 
        SET title = ?, salary = ?, department_id = ?  
        WHERE id = ?`;
        this.updateEmployeeDepartment = `
        UPDATE department
        SET department = ? 
        WHERE id = ?`;
        this.updateEmployeeManager = `
        UPDATE employee 
        SET manager_id = ?
        WHERE id = ?`;
        this.addEmployee = `
        INSERT INTO employee 
        (first_name, last_name, role_id, manager_id, manager_status) 
        VALUES (?, ?, ?, ?, ?)`;
        this.addRole = `
        INSERT INTO role 
        (title, salary, department_id) 
        VALUES (?, ?, ?)`;
        this.addDepartment = `
        INSERT INTO department 
        (department) 
        VALUES (?)`;
        this.removeEmployee = `
        DELETE FROM employee 
        WHERE id = ?`;
        this.removeRole = `
        DELETE FROM role
        WHERE id = ?`;
        this.removeDepartment = `
        DELETE FROM department
        WHERE id = ?`;
    }
  

  
   