//step-1

const mongoose = require("mongoose")

//step-3

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    age: String,
    password: String
})

//step-2

const userModel = mongoose.model("users", userSchema)

//step-4

module.exports = userModel;