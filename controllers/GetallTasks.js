const TasksModel = require('../models/tasks');

const Getalltasks = async (req, res) => {
    let allTasks = await TasksModel.find({});
    res.status(200).json({allTasks});
};

module.exports = Getalltasks;