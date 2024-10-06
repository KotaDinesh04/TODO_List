const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userModel = require('../Models/User');


router.post('/login', async (req,res)=> {
    const {emailId, password} = req.body;
    try {
        const user =await userModel.findOne({emailId});
        if(!user) {
            return res.status(401).json({message: "Error!! Invalid Credentails"});
        }
        const compare = await bcrypt.compare(password,user.password);
        if(!compare) {
            return res.status(401).json({message: "Error!! Incorrect Password"});
        }
        return res.status(200).json({mesage: "Login Success"});
    } catch(error) {
        return res.status(500).json({message: error.message});
    } 
});

module.exports = router;