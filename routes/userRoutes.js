const express= require('express');
//router object
const router = express.Router();
const { registerValidation, validate} = require('../helpers/validations');
const { register } = require('../controller/userController');

//routes
router.post('/register', registerValidation,register );


module.exports = router;
