const express = require('express');
const getData = require('../controllers/userController');
const router = express.Router();
const userAuth = require("../middlewares/auth");

router.get("/data", userAuth, getData);

module.exports = router;