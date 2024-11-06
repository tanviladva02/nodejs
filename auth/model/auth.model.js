const mongoose = require("mongoose")

const authSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const auth = mongoose.model("auth",authSchema)

module.exports = auth