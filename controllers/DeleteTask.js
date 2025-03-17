const TasksModel = require('../models/tasks');

const DeleteTask = async (req, res) => {

    let {taskId} = req.params.id;

    const deleted = await TasksModel.findOneAndDelete({_id: taskId});

    if (updated){
        res.status(200).json({deleted});
    }

    res.status(404).json({msg: "Task not found to be deleted!!"});
}

module.exports = DeleteTask;