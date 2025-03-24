const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type:String, required: true},
    password: {type: String, required: true},
    verifyOTP : {type: String, default: ''},
    verfiyOtpExpiredAt: {type: Number, defaul: 0},
    isAccountVerfied:{type: Boolean, default: false},
    resetOtp: {type: String, default: ''},
    resetOtpExpiredAt: {type: Number, defaul: 0}
});


const UserModel = mongoose.models.user || mongoose.model('user', UserSchema);
module.exports = UserModel;