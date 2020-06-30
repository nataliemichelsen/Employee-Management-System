const connection = require("./connection");

// consolidating class & functions
class DB {
    constructor(connection) {
        this.connection = connection
    }
    addEmployee(employee) {
        return this.connection.query("INSERT INTO employee SET ? ", employee)
    }
    addRole(role) {
        return this.connection.query("INSERT INTO role SET ? ", role)
    }
    addDepartment(department) {
        return this.connection.query("INSERT INTO department SET ? ", department)
    }
    removeRole(role_id) {
        return this.connection.query("DELETE FROM role WHERE id=?", role_id)
    }
    removeDepartment(department_id) {
        return this.connection.query("DELETE FROM role WHERE id=?", department_id)
    }
    removeEmployee(employee_id) {
        return this.connection.query("DELETE FROM employee WHERE id=?", employee_id)
    }
    updateEmployeeRole(employee_id, role_id) {
        return this.connection.query("UPDATE employee SET role_id=? WHERE id=?", [ role_id, employee_id ])
    }
    updateEmployeeManager(employee_id, manager_id) {
        return this.connection.query("UPDATE employee SET manager_id=? WHERE id=?", [ manager_id, employee_id ])
    }
    updateEmployeeDepartment(employee_id, department_id) {
        return this.connection.query("UPDATE employee SET department_id=? WHERE id=?", [ department_id, employee_id ])
    }
    findAllEmployees() {
        return this.connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department, role.salary AS manager FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department ON role.department_id=department.id")
    }
    findAllDepartments() {
        return this.connection.query("SELECT department.id, department.name, SUM (role.salary) AS utilize_budget FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department ON role.department_id=department_id GROUP BY department.id, department.department_name")
    }
    findAllEmployeesByDepartment(department_id) {
        return this.connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department department ON role.department_id=department.id WHERE department.id= ?", department_id)
    }
    findAllEmployeesByManager(manager_id) {
        return this.connection.query("SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role ON role.id=employee.role_id LEFT JOIN department ON department.id=role.department_id WHERE manager_id= ?", manager_id)
    }
    findAllRoles() {
        return this.connection.query("SELECT role.id, role.title, department.department_name AS department, role.salary FROM role LEFT JOIN department ON role.department_id=department.id")
    }
}

module.exports = new DB(connection)