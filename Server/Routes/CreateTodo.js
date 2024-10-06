const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const itemModel = require('../Models/TodoModel');

router.post('/createtodo',async (req,res)=> {
    const { name, description, emailId } = req.body;
    try {
        const todo = new itemModel ({
            name: name,
            description: description,
            emailId: emailId
        });
        const response = await todo.save();
        return res.status(200).json({message:"Created todo successfully"});
    } catch(error) {
        res.json(500).json({message: "Internal Server Error"});
    }
});

module.exports = router;