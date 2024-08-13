const express= require('express');
//router object
const router = express.Router();
const { register } = require('../controller/userController');

//routes
router.post('/register', register);


module.exports = router;
