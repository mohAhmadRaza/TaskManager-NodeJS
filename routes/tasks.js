const express = require('express');
const router = express.Router();
const Getalltasks = require('../controllers/GetallTasks');
const CreateTask = require('../controllers/createTasks');
const GetOne = require('../controllers/GetSingleTask');
const UpdateTask = require('../controllers/UpdateTask');
const DeleteTask = require('../controllers/DeleteTask');

router.get("/getTasks", Getalltasks);
router.post('/createTask', CreateTask);
router.get('/getOne', GetOne);
router.post('/updateTask', UpdateTask);
router.post('/deleteTask', DeleteTask);


module.exports = router;