// require general
const inquirer = require("inquirer");
const path = require("path");

// links
const questions = require("../../server");
const db = require("../../db");

// create class with switch statement
class mainMenu {
    view(viewMenu) {
        // move this inside the function within the class
        // create cases for each required option >>>>
        switch (viewMenu) {
            case 'View All Employees':
                return constructors.viewAllEmployees().then((data) => {
                    console.log(data.result);
                    return data;
                });
                break;
            // copy from above & edit var/name only 
            case 'View All Employees by Department':
                return constructors.viewEmployeeDepartment().then((data) => {
                    console.log(data.result);
                    return data;
                });
                break;
            // copy from above & edit var/name only 
            case 'View All Employees by Manager':
                return constructors.viewEmployeeManager().then((data) => {
                    console.log(data.result);
                    return data;
                });
                break;
            // copy from above & edit var/name only 
            case 'View All Employees by Role':
                return constructors.viewEmployeeRole().then((data) => {
                    console.log(data.result);
                    return data;
                });
                break;
            // copy from above & edit var/name only 
            case 'View All Roles':
                return constructors.viewAllRoles().then((data) => {
                    console.log(data.result);
                    return data;
                });
                break;
            default:
                console.log("No Default")
        }
    }

    // move this inside class object
    // switch statements for each table function (update, add, delete - no view needed) >>>>

    // update tables (department, role, employee)
    // pull data from constructors.js
    update(updateSelected) {
        switch (updateSelected) {
            case "Update Employee":
                return constructors.updateEmployee().then((data) => {
                    return data;
                });
                break;
            case "Update Role":
                return constructors.updateRole().then((data) => {
                    return data;
                });
                break;
            case "Update Department":
                return constructors.updateDepartment().then((data) => {
                    return data;
                });
                break;
            default:
                console.log("No Default")
        }
    }

    // add tables (department, role, employee)
    // pull data from constructors.js
    add(addSelected) {
        switch (addSelected) {
            case "Add Employee":
                return constructors.addEmployee().then((data) => {
                    return data;
                });
                break;
            case "Add Role":
                return constructors.addRole().then((data) => {
                    return data;
                });
                break;
            case "Add Department":
                return constructors.addDepartment().then((data) => {
                    return data;
                });
                break;
            default:
                console.log("No Default")
        }
    }

    // delete tables (department, role, employee)
    // pull data from constructors.js
    remove(removeSelected) {
        switch (removeSelected) {
            case "Remove Employee":
                return constructors.deleteEmployee().then((data) => {
                    return data;
                });
                break;
            case "Remove Role":
                return constructors.deleteRole().then((data) => {
                    return data;
                });
                break;
            case "Remove Department":
                return constructors.deleteDepartment().then((data) => {
                    return data;
                });
                break;
            default:
                console.log("No Default")
        }
    }
}

module.exports = new mainMenu();