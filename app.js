const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql");

const connection = require('./db/connection');

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    init();
});

async function init() {
    try {
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'employeeChoice',
                message: 'What would you like to do?',
                choices: ['view employees', 'view departments', 'view roles'],
            },
        ]);
        console.info('Answer:', answers.employeeChoice);
        switch (answers.employeeChoice) {
            case "view employees":
                const employeeRes = await connection.query("SELECT * FROM employee");
                console.table(employeeRes);
                break;
            // case 0:                         // if (day == 0)
            //     text = "Sunday";
            //     break;
            default:                        // else...
                init();
        }

    } catch (err) {
        console.log(err);
    }

}