//db - data base

const mongoose = require("mongoose")

// mongoose connect application to the database ...

const connect = mongoose.connect ("mongodb://localhost:27017/student")

module.exports = connect;