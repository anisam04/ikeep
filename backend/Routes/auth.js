const express = require('express');
const UserModel = require('../Models/UserModel')
const router = express.Router();
const { body, validationResult } = require('express-validator')


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
        //check whether the user with this email exists already
        try {
            let user = await UserModel.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ error: "Sorry a user with this email already exists" })
            } // create a new user
            user = await UserModel.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            })
            res.json({ user })

            //catch errors
        } catch (error) {
            console.log(error.message)
            res.status(500).send("Some error occured");
        }
    })


module.exports = router;