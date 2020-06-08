// require
const mysql = require("mysql");
const path = require("path");
const fs = require("fs");

// 


// define const that holds all management options
const questions = [
    {
        type: 'list',
        message: 'What type of employee are you?',
        choices: ['Manager', 'Intern', 'Engineer'],
        name: 'role',
    },
    {
        message: 'What is your name?',
        name: 'name'
    },
    {
        message: 'What is your employee ID?',
        name: 'id'
    },
    {
        message: 'What is your email?',
        name: 'email'
    }
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