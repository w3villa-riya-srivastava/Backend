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
createTable();

// routes

app.post('/register',async(req,res)=>{
    console.log(req.body);
    const {email,password} = req.body;
    console.log(email);
    console.log(password);
    if(!email || !password){
        return res.status(400).send("Email and password are required");
    }
    try{
        //Hashing the password with bcrypt: Here 10 is a salt rounds
        const hashedPassword = await bcrypt.hash(password,10);

    const query = `INSERT INTO user_verification(email, password) VALUES(?,?)`; 
    db.query(query, [email, hashedPassword], (err,results) => {
        if(err){
             console.error("Error inserting data:",err);
             if(err.code === 'ER_DUP_ENTRY'){
             return res.status(409).send('Email Already exists'); 
             }
                return res.status(500).send("An error ocurred while registering the user");
            }
        res.status(201).send("User Registered Successfully");
        });
    }catch (error) {
        console.error('Error hashing the password:', error);
        res.status(500).send('AN error occurred during registeration.');
    }
    });

app.listen(port, function(){
    console.log('app listening on port 3000');
});