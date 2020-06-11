  // get all necessary functions using jquery & inquirer  >>>>

  // get employee list for employee update inquirer prompt
  getEmployeeList() {
    return this.getAllEmployees().then((data) => {
      let choices = data.map((x) => `${x.id} - ${x.first_name} ${x.last_name}`);
      return this.inquiry(choices, "list", "Please make your selection:");
    });
  }

  // get manager list for inquirer prompt
  getManagerList() {
    return SQL.search(this.mgrText).then((data) => {
      let choices = data.map((x) => `${x.id} - ${x.first_name} ${x.last_name}`);
      choices.push("This employee does not report to a manager");
      return this.inquiry(
        choices,
        "list",
        "Does this employee have a manager? Select below:"
      );
    });
  }

  // get role list for inquirer prompt
  getRoleList() {
    return this.viewAllRoles().then((data) => {
      let choices = data.map((x) => `${x.id} - ${x.title}`);
      return this.inquiry(choices, "list", "Please select a role:");
    });
  }

  // perform all necessary functions using inquirer and sql >>>>

  // create / add new employee using inquirer
  createEmployee() {
    const employee = {
      first_name: "",
      last_name: "",
      role_id: 0,
      manager_id: 0,
      manager_status: false,
      reports: [],
    };
    return inquirer.prompt([q.firstName, q.lastName]).then((data) => {
      employee.first_name = data.firstName;
      employee.last_name = data.lastName;
      return this.getRoleList().then((inquiry) => {
        return inquirer.prompt([inquiry]).then((data) => {
          var arr = data.answer.split(" ");
          employee.role_id = parseInt(arr[0]);
          return this.getManagerList().then((inquiry) => {
            return inquirer.prompt([inquiry]).then((data) => {
              if (
                data.answer === "This employee does not have a manager or is a manager."
              ) {
                employee.manager_id = null;
              } else {
                var arr = data.answer.split(" ");
                employee.manager_id = parseInt(arr[0]);
              }
              return inquirer.prompt([q.managerStatus]).then((data) => {
                if (!data.managerStatus) {
                  employee.manager_status = false;
                  return employee;
                } else {
                  employee.manager_status = true;
                }
              });
            });
          });
        });
      });
    });
  }

  // create new roles
  createRole() {
    const role = {
      title: "",
      salary: 0,
      department_id: 0,
    };
    return inquirer.prompt([q.title, q.salary]).then((data) => {
      role.title = data.title;
      role.salary = data.salary;
      return this.getDepartmentList().then((inquiry) => {
        return inquirer.prompt([inquiry]).then((data) => {
          var arr = data.answer.split(" ");
          role.department_id = parseInt(arr[0]);
          return role;
        });
      });
    });
  }

  // create / add new departments
  createDepartment() {
    const department = {
      department: "",
    };
    return inquirer.prompt([q.department]).then((data) => {
      department.department = data.department;
      return department;
    });
  }

  // create / add new employee to list
  // allows for manager options too
  addEmployee() {
    return this.createEmployeeList().then((data) => {
      var inputs = [
        data.first_name,
        data.last_name,
        data.role_id,
        data.manager_id,
        data.manager_status,
      ];
      const FN = data.first_name;
      const LN = data.last_name;
      const reports = [...data.reports];
      return sql.insert(this.addEmpText, inputs).then((data) => {
        return sql
          .search(
            "SELECT id FROM employee WHERE first_name = ? AND last_name = ?",
            [FN, LN]
          )
          .then((data) => {
            for (let i = 0; i < reports.length; i++) {
              sql.update(this.updateEmployeeManager, [data[0].id, reports[i]]);
            }
          });
      });
    });
  }

  // create / add new role to role table
  addRole() {
    return this.createRole().then((data) => {
      var inputs = [data.title, data.salary, data.department_id];
      return sql.insert(this.addRole, inputs).then(function (res) {
        return res;
      });
    });
  }

  // create / add new department to department table
  addDepartment() {
    return inquirer.prompt([q.department]).then((data) => {
      return sql
        .insert(this.addDepartment, [data.department])
        .then(function (res) {
          return res;
        });
    });
  }

  // update / make changes to employee table
  updateEmployee() {
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
  updateRole() {
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
  updateDept() {
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

  // removes selected employee
  deleteEmployee() {
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
  deleteRole() {
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
  deleteDepartment() {
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
}

module.exports = new Edit();
