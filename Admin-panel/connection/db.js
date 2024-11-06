const mongoose = require("mongoose")
const connect = mongoose.connect("mongodb://localhost:27017/admin")
module.exports = connect