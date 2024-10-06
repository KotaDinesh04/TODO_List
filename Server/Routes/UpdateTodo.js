const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const itemModel = require('../Models/TodoModel');

router.post('/updateTodo', async (req,res) => {
    try {
        const { id, name, description, emailId, completed } = req.body;
        const data = await itemModel.findById(id);
        data.name = name || data.name;
        data.description = description || data.description;
        data.completed = completed || data.completed;
        data.updatedAt = Date.now();
        await data.save();
        return res.status(200).json({message: "Successfully updated todo"});
    } catch (error) {
        return res.status(500).json({message: error});
    }
});

module.exports = router;