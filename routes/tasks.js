const express = require('express');
const router = express.Router();
const Getalltasks = require('../controllers/GetallTasks');
const CreateTask = require('../controllers/createTasks');
const GetOne = require('../controllers/GetSingleTask');
const UpdateTask = require('../controllers/UpdateTask');
const DeleteTask = require('../controllers/DeleteTask');
const userAuth = require('../middlewares/auth');

//for server side validation
const bodyParser = require('body-parser');
const {check, validationResult} = require('express-validator');

//extracting urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: true});


router.get("/getTasks", Getalltasks);
router.post('/createTask', userAuth, urlencodedParser,[
    check('title', 'Title cannot be less than 3 letters!!')
    .exists()
    .isLength({min: 3}),

    check('description', 'The description cannot be less then the 20 words!!')
    .exists()
    .isLength({min: 10})
    
], CreateTask);

router.get('/getOne', GetOne);
router.post('/updateTask/:id', UpdateTask);
router.get('/deleteTask/:id', DeleteTask);


module.exports = router;