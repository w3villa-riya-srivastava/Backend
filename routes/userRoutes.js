const express= require('express')
const { getUsers } = require('../controller/userController')

//router object
const router = express.Router()


//routes


//GET ALL USER LISTS || GET
router.get('/list', getUsers);


module.exports = router
