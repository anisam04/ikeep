const express = require('express');
const UserModel = require('../Models/UserModel')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
var fetchuser = require('../middleware/fetchuser')



const createNewUser = async (req, res) => {
    let success=false
    //if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        //check whether the user with this email exists already
        let user = await UserModel.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists." })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        // create a new user
        user = await UserModel.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, process.env.JWT_SECRET);
        // console.log(authtoken)
        // res.json({ user })
        success=true
        res.json({ success, authtoken })

        //catch errors
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured");
    }
}

const loginUser = async (req, res) => {
    let success = false
    // if there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const {email, password} = req.body;
    try {
        let user = await UserModel.findOne({email})
        if(!user) {
            success=false
            return res.status(400).json({error: "Please login with correct credentials"})
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            success=false
            return res.status(400).json({success, error: "Please try to login with correct credentials"})
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, process.env.JWT_SECRET)
        success = true
        res.json({success, authtoken})

    } catch(error) {
        console.log(error.message)
        res.status(500).send("Interval server error");

    }
}


const getUser = async (req, res) => {
    try {
        let userId = req.user.id
        const user = await UserModel.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Interval server error");
    }
        }

module.exports = {
    createNewUser,
    loginUser,
    getUser
}