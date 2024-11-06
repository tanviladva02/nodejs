const mongoose = require("mongoose")
const userSchema =mongoose.Schema({
    userName:String,
    userEmail: String,
    password: String,
})
const userModel = mongoose.model("userData",userSchema)
module.exports = userModel