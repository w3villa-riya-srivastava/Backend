//config/dbconfig.js
const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();
const{ DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database:DB_NAME
});

//create database connection

db.connect((err) => {
    if (err) throw err;
    console.log(`${DB_NAME} Database Connected Successfully`);
});

module.exports = db;