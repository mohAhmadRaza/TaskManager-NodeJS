const TasksModel = require('../models/tasks');

const CreateTask = async (req, res) => {
    console.log("ddddd");
    let {title, date, time, description, importance} = req.body;
    const Tasks = await TasksModel.create({
        name: title,
        confirmed: false,
        date: date,
        time: time,
        description: description,
        importance: importance
    });
    
    res.json({
        message: "Task has been created successfully!!"
    });
}

module.exports = CreateTask;