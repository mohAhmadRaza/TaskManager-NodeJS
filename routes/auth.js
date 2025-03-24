const {register, login, logout, verifyOTP, sendOTP, resetOtpSent, resetPassword} = require('../controllers/authcontroller');
const express = require('express');
const router = express.Router();
const userAuth = require('../middlewares/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/sendVerifyOTP', userAuth, sendOTP);
router.post('/verifyOTP', userAuth, verifyOTP);
router.post('/sendResetOtp', resetOtpSent);
router.post('/resetPassword', resetPassword);

router.get('/resetnow', function(req, res){ res.render("ForgotPassword")});
router.get('/loginnow', function(req, res){ res.render("Login");});
router.get('/signupnow', function(req, res){res.render("register");});

module.exports = router;