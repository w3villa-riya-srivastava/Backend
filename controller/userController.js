const bcrypt= require('bcrypt');
const { registerUser } = require('../model/userModel');
const { validationResult } = require('express-validator');

const register = async(req,res)=>{

    const errors =validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    // console.log(req.body);
    // const {email, mobileNumber, password, confirmPassword} = req.body;
    // if(!email || !mobileNumber || !password || !confirmPassword){
    //     return res.status(400).send("Please fill all the required fields");
    // }

//     if(password !== confirmPassword){
// return res.status(400).send("Passwords do not match");
//     }
    try{
        //Hashing the password with bcrypt: Here 10 is a salt rounds
        const hashedPassword = await bcrypt.hash(password,10);

    const query = `INSERT INTO user_verification(email, mobileNumber, password) VALUES(?,?,?)`; 
    registerUser(email, mobileNumber, hashedPassword, (err,results) => {
        if(err){
             console.error("Error inserting data:",err);
             if(err.code === 'ER_DUP_ENTRY'){

            //extrcting the error message to identify 
                const errorMessage = err.sqlMessage;

                //determine which field has duplicate entry
                if(errorMessage.inludes('email')){
             return res.status(409).send('Email Already exists'); 
             }else if(errorMessage.includes('mobileNumber')){
                return res.status(409).send("Mobile Number already exists");
             }
            }
            //Other type of error has occurred
                return res.status(500).send("An error ocurred while registering the user");
            }
        res.status(201).send("User Registered Successfully");
        console.log("User Registered Successfully");
        });
    }catch (error) {
        console.error('Error hashing the password:', error);
        res.status(500).send('An error occurred during registeration.');
    }
    };

    module.exports = { register };