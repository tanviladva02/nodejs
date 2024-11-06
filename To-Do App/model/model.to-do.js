const mongoose = require("mongoose")

const workSchema = new mongoose.Schema({
    work:String
})

const workModel = mongoose.model("work",workSchema)

module.exports = workModel



