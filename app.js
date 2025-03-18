const express = require('express');
const app = express();
const TasksRoutes = require('./routes/tasks');
const path = require('path');
const Index = require('./routes/index');

//requiring models
const TasksModel = require('./models/tasks');

//Configuration of env's
require('dotenv').config();

//requiring DB
const connectDB = require('./configs/mongoose_config');

//setting middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");

//setting routes
app.use('/tasks', TasksRoutes);
app.use('/', Index);

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

