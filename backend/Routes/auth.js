const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator')
var fetchUser = require('../middleware/fetchUser')
var authController = require('../controllers/authcontroller')

//----------------------ROUTE 1 ------------------------------// 
// Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', 'Enter a Valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters.').isLength({ min: 5 }),
], authController.createNewUser)

//----------------------ROUTE 2 ------------------------------// 
//Authenticate a User using: POST "api/auth/login". No login required.
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], authController.loginUser)


//----------------------ROUTE 3 ------------------------------// 
//Get logged in user details using: POST "api/auth/getuser". Login required
router.post('/getuser', fetchUser, authController.getUser )

module.exports = router;