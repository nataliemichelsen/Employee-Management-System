  // builds inquirer prompt objects
  // utilizes information from server.js to feed data
  inquiry(choices, type, message) {
    return {
      name: "answer",
      type: type,
      message: message,
      choices: [...choices],
    };
  }

  // returns all employees and associated data from SQL search
  allEmployees() {
    return sql.search(this.viewAllEmployees);
  }

  // use inquirer prompts to get data from schema.sql
  allDepartments() {
    return sql.search(this.allDepartments).then((data) => {
      let choices = data.map((x) => `${x.id} - ${x.department}`);
      return this.inquiry(choices, "list", "Please select a department:");
    });
  }

  // use inquirer prompts to get data from schema.sql
  allManagers() {
    return sql.search(this.allManagers).then((data) => {
      let choices = data.map((x) => `${x.id} - ${x.first_name} ${x.last_name}`);
      return this.inquiry(
        choices,
        "list",
        "Which manager would you like to view?"
      );
    });
  }
  
  // returns list of all roles
  viewAllRoles() {
    return SQL.search(this.allRolesText);
  }
}

module.exports = viewMenu;
