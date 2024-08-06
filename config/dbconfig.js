//config/dbconfig.js
const mysql = require('mysql2/promise');
const dotenv = require("dotenv");
dotenv.config();

const pool= mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'riya',
    database:'jasmine'

});

//create database connection
pool.query('select 1').then(()=>{
    console.log("my sql database connected")
}).catch((error)=>{
    console.log(error);
})

module.exports = pool;