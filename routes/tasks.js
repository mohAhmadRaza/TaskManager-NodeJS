const express = require('express');
const router = express.Router;
const Getalltasks = require('../controllers/GetallTasks');

router.get("", Getalltasks);

module.exports = router;