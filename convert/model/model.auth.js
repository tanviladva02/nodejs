const mongoose = require("mongoose")
const authSchema = mongoose.Schema({
    name:String,
    email:String,
    pass:String,
    pass2:String
})
const authModel = mongoose.model("data",authSchema)
module.exports = authModel