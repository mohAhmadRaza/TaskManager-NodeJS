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
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    description: {
        type: String,
        default: "No description added"
    },
    importance: {
        type: String
    }
});

const TasksModel = mongoose.model('Task', TasksSchema);
module.exports = TasksModel;