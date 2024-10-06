const express = require('express');
const router = express.Router();
const userModel = require('../Models/User');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

router.post('/signup',async (req,res)=>{
    const { name, emailId, password } = req.body;
    try {
        if(!name || !emailId || !password) {
            return res.status(400).json({message: "Error!! Input not valid!!"});
        }
        const existingCheck = await userModel.findOne({emailId});
        if(existingCheck) {
            return res.status(400).json({message: "Error!! User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedpass = await bcrypt.hash(password,salt);
        const data = new userModel({
            name,
            emailId,
            password: hashedpass
        });
        await data.save();
        return res.status(201).json(data);
    } catch(error) {
        return res.status(500).json({message: error.message});
    }
});

module.exports = router;