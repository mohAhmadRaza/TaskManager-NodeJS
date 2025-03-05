const express = require('express');
const app = express();
const TasksRoutes = require('./routes/tasks');
const path = require('path');

//setting middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

//setting routes
app.use('/api/v1/tasks', TasksRoutes);

//listening app 
const port = 5000;
app.listen(port, () => {
    console.log("app started to listening!!");
});

