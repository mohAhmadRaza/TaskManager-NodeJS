const mongoose = require('mongoose');

const TasksSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlenght: [20, "Name cannot be more than 20 characters long!!"]
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const TasksModel = mongoose.model('Task', TasksSchema);
module.exports = TasksModel;