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

const userModel = require('./Models/User');
const userRoute = require('./Routes/UserRoute');

const signInRoute = require('./Routes/Sign-inRoute');

app.use('/api',userRoute);
app.use('/api',signInRoute);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

