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

const createTodoRoute = require('./Routes/CreateTodo');
const getTodos = require('./Routes/GetTodos');
const deleteTodo = require('./Routes/DeleteTodo');
const updateTodo = require('./Routes/UpdateTodo');

app.use('/api',userRoute);
app.use('/api',signInRoute);
app.use('/api',createTodoRoute);
app.use('/api',getTodos);
app.use('/api',deleteTodo);
app.use('/api',updateTodo)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

