const express = require('express');
const UserModel = require('../Models/UserModel')
const router = express.Router();
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

const JWT_SECRET = '@nisamajpati'

// Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', 'Enter a Valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters.').isLength({ min: 5 }),
],
    async (req, res) => {
        //if there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        try {
            //check whether the user with this email exists already
            let user = await UserModel.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ error: "Sorry a user with this email already exists" })
            } 
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt)
            // create a new user
            user = await UserModel.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })
            const data ={
                 user: {
                     id: user.id
                 }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            // console.log(authtoken)
            // res.json({ user })
            res.json({authtoken})

            //catch errors
        } catch (error) {
            console.log(error.message)
            res.status(500).send("Some error occured");
        }
    })


module.exports = router;