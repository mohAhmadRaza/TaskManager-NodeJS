const TasksModel = require('../models/tasks');

const Getalltasks = async (req, res) => {
    let allTasks = await TasksModel.find({});
    res.render("AllTasks", {tasks: allTasks});
};

module.exports = Getalltasks;