const TasksModel = require('../models/tasks');

const GetOne = async (req, res) => {
    let taskId = req.params.id;

    try {
        const task = await TasksModel.findOne({_id: taskId});
        if (!task){
            res.status(404).json({msg: `No tasks found with this id: ${taskId}`});
        }
        
        res.status(200).json({task});   
    } catch (error) {
        res.status(500).json({error});  
    }
}

module.exports = GetOne;