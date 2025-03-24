const TasksModel = require('../models/tasks');
const flash = require('connect-flash');

const DeleteTask = async (req, res) => {

    let taskId = req.params.id;
    console.log(taskId);

    const deleted = await TasksModel.findOneAndDelete({_id: taskId});
    console.log(deleted);

    const tasks = await TasksModel.find({});

    if (deleted){
        req.flash("Failure", "Successfully Removed.");
        res.redirect("/tasks/getTasks");
    }
}

module.exports = DeleteTask;