const {check, validationResult}=require('express-validator')

//Validation rules for user registeration
exports.registerValidation=[
check('email')
.isEmail()
.withMessage('Please enter a valid email address'),

check('mobileNumber')
.isLength({min:10})
.withMessage('Please enter a valid mobile number')
.isNumeric()
.withMessage('Mobile Number must contain only numbers'),

check('password')
.isLength({min:6})
.withMessage('Password must contain atleast 6 characters'),

check('confirmPassword')
.custom((value, {req}) => value === req.body.password)
.withMessage('Passwords do not match')
];

exports.validate = (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    next();
};