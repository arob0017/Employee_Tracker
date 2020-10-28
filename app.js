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
            case "view departments":
                const departmentRes = await connection.query("SELECT * FROM department");
                console.table(departmentRes);
                break;
            case "view roles":
                const roleRes = await connection.query("SELECT * FROM role");
                console.table(roleRes);
                break;
            default:
                init();
        }

    } catch (err) {
        console.log(err);
    }

}