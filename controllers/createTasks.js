const TasksModel = require('../models/tasks');

const CreateTask = async (req, res) => {

    let {name, confirmed} = req.body;
    const Tasks = await TasksModel.create({
        name: name,
        confirmed: confirmed
    });

    res.json({
        message: "Task has been created successfully!!"
    });
}

module.exports = CreateTask;