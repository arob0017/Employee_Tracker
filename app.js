const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql");

const connection = require('./db/connection');
const { allowedNodeEnvironmentFlags } = require("process");

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
                choices: ['view employees', 'view departments', 'view roles', 'add employee', 'add department', 'add role', 'update employee roles', 'quit'],
            },
        ]);
        console.info('Answer:', answers.employeeChoice);
        switch (answers.employeeChoice) {
            case "view employees":
                const employeeRes = await connection.query("SELECT * FROM employee");
                console.table(employeeRes);
                init();
                break;
            case "view departments":
                const departmentRes = await connection.query("SELECT * FROM department");
                console.table(departmentRes);
                init();
                break;
            case "view roles":
                const roleRes = await connection.query("SELECT * FROM role");
                console.table(roleRes);
                init();
                break;

            case "add employee":
                addEmployee();
                break;
            case "add department":
                addDepartment();
                break;
            case "add role":
                addRole();

                break;
            case "update employee roles":
                updateEmpRole();
                init();
                break;

            default:
                console.log("GoodBye");
                connection.end();
                process.exit();

        }

    } catch (err) {
        console.log(err);
    }

    function addEmployee() {
        inquirer.prompt([
            {
                type: "input",
                message: "Enter employee first name",
                name: "firstname"
            },
            {
                type: "input",
                message: "Enter employee last name",
                name: "lastname"
            }
        ]).then(function (answers) {
            connection.query("INSERT INTO employee SET ?",
                {
                    first_name: answers.firstname,
                    last_name: answers.lastname,
                    role_id: null,
                    manager_id: null
                },
                function (err, answers) {
                    if (err) {
                        throw err;
                    }
                    console.table(answers);
                }
            );
            init();
        });
    };
    function addDepartment() {
        inquirer.prompt([
            {
                type: "input",
                message: "Enter new Department name:",
                name: "newDepartment"
            }
        ]).then(function (answers) {
            connection.query("INSERT INTO department SET ?",
                {
                    name: answers.newDepartment
                },
                function (err, answers) {
                    if (err) {
                        throw err;
                    }
                    console.table(answers);
                }
            );
            init();
        });
    };
    function addRole() {
        inquirer.prompt([
            {
                type: "input",
                message: "Enter role title:",
                name: "roleTitle"
            },
            {
                type: "input",
                message: "Enter role's salary:",
                name: "roleSalary"
            },
            {
                type: "input",
                message: "Enter role's department_id:",
                name: "roleDept"
            }
        ]).then(function (answers) {
            connection.query("INSERT INTO role SET ?",
                {
                    title: answers.roleTitle,
                    salary: answers.roleSalary,
                    department_id: answers.roleDept
                },
                function (err, answers) {
                    if (err) {
                        throw err;
                    }
                    console.table(answers);
                }
            );
            init();
        });
    };
    // function updateEmpRole() {

}