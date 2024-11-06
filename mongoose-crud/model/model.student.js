//step-1

const mongoose = require("mongoose")

//step-3

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    age:Number,
    image:String
})

//step-2

const userModel = mongoose.model("user", userSchema)

//step-4

module.exports = userModel;