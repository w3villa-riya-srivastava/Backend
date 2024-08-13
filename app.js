const express = require('express');
//db for database connection
const db = require('./config/dbconfig');
// add all functionalities of express in APP
const app = express();
const { createTable } = require('./model/userModel');
//for environment variables files
const dotenv = require("dotenv");
dotenv.config();
const port = 5000;
const bcrypt = require('bcrypt');
app.use(express.json());
const userRoutes = require('./routes/userRoutes');
createTable();

// Use routes

app.use('/', userRoutes);

app.listen(port, function(){
    console.log('app listening on port 3000');
});
