const express = require('express');
const router = express.Router();
const userAuth = require('../middlewares/auth');

router.get("/", userAuth, function(req, res){
     res.render("FirstPage"); 
});

module.exports = router;