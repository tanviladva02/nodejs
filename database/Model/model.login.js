const mongoose = require("mongoose")

const loginUserSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const loginUserModel = mongoose.model("loginUser",loginUserSchema)

module.exports = loginUserModel;