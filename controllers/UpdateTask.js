const TasksModel = require('../models/tasks');

const UpdateTask = async (req, res) => {

    let {name, completed} = req.body;
    const update = {name: name, completed: completed};

    const updated = await TasksModel.findOneAndUpdate({name: name}, update, {
        new: true,
        runValidators: true
    });

    res.status(200).json(updated);
}

module.exports = UpdateTask;