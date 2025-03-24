const { validationResult } = require("express-validator");
const TasksModel = require("../models/tasks");

const CreateTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let text = "";
    errors.array().forEach((curr) => {
        text += curr["msg"];
    });

    console.log(text);

    // Send a response with an alert and redirect to the form page
    req.flash('Failure', text);
    res.redirect('/');
  } else {
    let { title, date, time, description, importance } = req.body;
    const Tasks = await TasksModel.create({
      name: title,
      confirmed: false,
      date: date,
      time: time,
      description: description,
      importance: importance,
    });

    res.json({
      message: "Task has been created successfully!!",
    });
  }
};

module.exports = CreateTask;