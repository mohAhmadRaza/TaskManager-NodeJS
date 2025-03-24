const UserModel = require('../models/user');
const cookie = require('cookie-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transporter = require('../configs/nodemailer');


const register = async (req, res) => {

    let {name, email, password} = req.body;

    if (!name || !email || !password){
        req.flash('Failure', "Missing Details.");
        return res.redirect("/auth/signupnow");
    }

    try {
        const userExists = await UserModel.findOne({email});
        if (userExists){
            req.flash('Failure', "Email Already Exists.");
            return res.redirect("/auth/signupnow");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newuser = await UserModel.create({
            name,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({id: newuser._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV === 'production' ? 'none': 'strict'
        });

        //welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to the TaskManager',
            text: `Welcome to the TaskManager! Your account has been created on ID: ${email}`
        }
        await transporter.sendMail(mailOptions);
        
        return res.redirect("/");
        
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
};


const login = async (req, res) => {

    let {email, password} = req.body;

    if (!email || !password){
        req.flash("Failure", "Details Missing.");
        return res.redirect("/auth/loginnow");
    }

    try {
        const userExists = await UserModel.findOne({email});

        if (userExists){
            bcrypt.compare(password, userExists.password, function(err, result) {
                if (!result){
                    req.flash("Failure", 'Password Invalid');
                    return res.redirect("/auth/loginnow");
                }
                else{
                    const token = jwt.sign({id: userExists._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
                    res.cookie('token', token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        maxAge: 7 * 24 * 60 * 60 * 1000,
                        sameSite: process.env.NODE_ENV === 'production' ? 'none': 'strict'
                    });

                    return res.redirect("/");
                }
            });
        }
        else{
            req.flash("Failure", 'Email Invalid');
            return res.redirect("/auth/loginnow");
        }
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
};


const logout = (req, res) => {
    try {
        res.clearcookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV === 'production' ? 'none': 'strict'
        });

        return res.json({success: true, message: "Logged Out."});
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
};


const sendOTP = async (req, res) => {
    try {
        
        let {userID} = req.body;
        const user = await UserModel.findOne({_id: userID});

        if (!user){
            return res.json({success: false, message: "User not found"});
        }

        const OTP = String(Math.floor(Math.random() * (900000 - 100000)) + 100000);

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Verify OTP',
            text: `You have recieved an OTP: ${OTP}. Verify your account using this OTP`
        }
        await transporter.sendMail(mailOptions);
        
        user.verifyOTP = OTP;
        user.verfiyOtpExpiredAt = Date.now() + 24 * 60 * 60 * 1000;
        await user.save();

        return res.json({success: true, message: "OTP Recieved"});
    } catch (error) {
        return res.json({success: false, message: error.message});
    }    
};

const verifyOTP = async (req, res) => {

    try {
        
        let {userID, OTP} = req.body;
        const user = await UserModel.findOne({_id: userID});

        if (!user){
            return res.json({success: false, message: "User not found"});
        }

        if (OTP === "" || OTP != user.verifyOTP){
            return res.json({success: false, message: "OTP Incorrect"});
        }

        if (user.verfiyOtpExpiredAt < Date.now()){
            return res.json({success: false, message: "OTP Expired"});
        }

        user.isAccountVerfied = true;
        user.verifyOTP = '';
        user.verfiyOtpExpiredAt = 0;

        await user.save();

        return res.json({success: true, message: "Account Varified"});

    } catch (error) {
        return res.json({success: false, message: error.message});
    }
};

const resetOtpSent = async (req, res) => {

    try {
        let {email} = req.body;

        if (!email) {
            return res.json({success: false, message: "Missing Details"});
        }

        const user = await UserModel.findOne({email});

        if (!user){
            return res.json({success: false, message: "Email is not correct."});
        }

        const OTP = String(Math.floor(Math.random() * (90000 - 10000)) + 10000);

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            text: `You have recieved an OTP: ${OTP}. Verify your account using this OTP to reset password.`
        }
        await transporter.sendMail(mailOptions);
        
        user.resetOtp = OTP;
        user.resetOtpExpiredAt = Date.now() + 24 * 60 * 60 * 1000;

        await user.save();
        return res.render("OTPEnter");

    } catch (error) {
        return res.json({success: false, message: error.message});
    }
};

const resetPassword = async (req, res) => {

    try {
        let {email, d1, d2, d3, d4, d5, newPass} = req.body;
        console.log(email);
        const OTP = d1 + d2 + d3 + d4 + d5;

        if (!email){
            return res.json({success: false, message: "Not authorized"});
        }
        if (OTP === "" || newPass === "") {
            return res.json({success: false, message: "Missing details"});
        }

        const user = await UserModel.findOne({email});

        if (!user) {
            return res.json({success: false, message: "Not authorized"});
        }

        if (OTP !== user.resetOtp){
            return res.json({success: false, message: "Invalid OTP Entered."});
        }

        if (user.resetOtpExpiredAt < Date.now()){
            return res.json({success: false, message: "Reset OTP Expired."});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPass, salt);

        user.resetOtp = '';
        user.resetOtpExpiredAt = 0;
        user.password = hashedPassword;

        await user.save();

        return res.render("Login");

    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}


module.exports = {register, login, logout, verifyOTP, sendOTP, resetOtpSent, resetPassword};