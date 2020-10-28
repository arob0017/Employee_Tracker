require('dotenv').config();
const mysql = require('mysql');
const util = require("util");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: "root",
    password: process.env.MY_PASSWORD,
    database: 'employeeTrack_DB',
});
connection.query = util.promisify(connection.query);
module.exports = connection;