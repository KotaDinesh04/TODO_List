const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const itemModel = require('../Models/TodoModel');

router.get('/gettodousingid', async (req,res) => {
    try {
        const {id} = req.query;
        const data = await itemModel.findById(id);
        if(!data) {
            return res.status(404).json({message: "Data not found"});
        } 
        return res.json(data);
    } catch(error) {
        return res.status(500).json({message: "Internal server error!!"});
    }
})

module.exports = router;