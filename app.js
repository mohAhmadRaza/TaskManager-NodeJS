const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const app = express();
const TasksRoutes = require('./routes/tasks');
const path = require('path');
const Index = require('./routes/index');
var flash = require('connect-flash');
const session = require("express-session");
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

//configuring flash
app.use(session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: true
  }));
  app.use(flash());

//middleware to make flash messages available to every template
app.use((req, res, next) => {
    res.locals.errorMessage = req.flash("Failure");
    next();
});

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
app.use(cookieParser());

if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
app.set("view engine", "ejs");

//setting routes
app.use('/', Index);
app.use('/tasks', TasksRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

//listening app using env varibles
const port = process.env.PORT || 3000;

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