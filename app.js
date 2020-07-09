const inquirer = require('inquirer');

const {choice} = inquirer.prompt([{
    type: 'list',
    name: 'choice',
    message: 'what would you like to do?',
    choices: [{
        name: 'whatever',
        value: 'hey'
    }]
}])