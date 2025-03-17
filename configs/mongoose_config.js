const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = () => {
    return mongoose.connect(`${process.env.MONGO_URL}TodoApp`);
}

module.exports = connectDB;
