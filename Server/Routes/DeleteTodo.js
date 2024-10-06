const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const itemModel = require('../Models/TodoModel');

router.delete('/deletetodo', async (req,res)=> {
    try {
        const {id} = req.body;
        const data = await itemModel.findByIdAndDelete(id);
        if(!data) {
            return res.status(404).json({message:"Data not found!!"});
        }
        return res.status(200).json({message:"Successfully deteted todo"});
    } catch (error) {
        return res.status(500).json({message: "Internal server error!!"});
    }
});

module.exports = router;