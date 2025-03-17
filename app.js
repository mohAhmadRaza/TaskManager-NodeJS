const express = require('express');
const app = express();
const TasksRoutes = require('./routes/tasks');
const path = require('path');
require('dotenv').config();

//requiring DB
const connectDB = require('./configs/mongoose_config');

//setting middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

//setting routes
app.use('/tasks', TasksRoutes);

//listening app 
const port = 5000;

const start = async () => {
    try{
        await connectDB();
        app.listen(port, () => {
            console.log("app started to listening!!");
        });
    }
    catch (error){
        console.log(`Database not connected!! ${error}`);
    }
} 

start();

