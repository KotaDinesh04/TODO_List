    const express = require('express');
    const router = express.Router();
    const mongoose = require('mongoose');
    const itemModel = require('../Models/TodoModel');

    router.get('/gettodos', async (req,res)=>{
        try {
            const {emailId} = req.query;
            const data = await itemModel.find({emailId});
            if(!data) {
                return res.status(404).json({message: "Data not found"});
            }
            return res.json(data);
        } catch(error) {
            return res.status(500).json({message: "Internal Server Error"});
        }
    });

    module.exports = router;