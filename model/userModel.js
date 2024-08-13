const connection = require('../config/dbconfig');

//Function to create table
const createTable = () =>{
    const createTableQuery =`
        CREATE TABLE IF NOT EXISTS user_verification(           
            id INT AUTO_INCREMENT PRIMARY KEY,
            email varchar(500) UNIQUE NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            verificationHash VARCHAR(255) NULL,
            expiredAt DATETIME NULL,
            otpExpiredAt DATETIME NULL,
            emailverifiedAt DATETIME NULL,
            mobileverifidAt DATETIME NULL,
            isActive BOOLEAN DEFAULT true,
            nextAction VARCHAR(50) DEFAULT NULL,
            retryCount INT DEFAULT 0,
            comment TEXT NULL,
            userData JSON NULL,
            password VARCHAR(500) NOT NULL,
            isEmailVerified BOOLEAN DEFAULT false,
            isMobileVerified BOOLEAN DEFAULT false, 
            isProcessed BOOLEAN DEFAULT false,
            mobileNumber VARCHAR(13) UNIQUE,
            mobileOTP VARCHAR(6) NULL
        );
        `;
        connection.query(createTableQuery,(error,results)=>{
            if(error){
                console.error('Error creating table:',error);
                return;
            }
            console.log('Table created');
        });
    };    
// Call the function to ensure table is created
createTable();

const registerUser =  (email, mobileNumber, hashedPassword,callback) => {
const query = `INSERT INTO user_verification(email, mobileNumber, password) VALUES(?,?,?)`; 
connection.query(query, [email, mobileNumber, hashedPassword], callback);
};

//Export the functions
module.exports = { createTable, registerUser };