const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

//Connection
const makeConnection = require('./Mongodb');
makeConnection();

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

