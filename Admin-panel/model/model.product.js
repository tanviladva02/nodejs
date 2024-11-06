const mongoose = require("mongoose")
const productSchema =mongoose.Schema({
    productName :String,
    price:Number,
    rate:Number,
    category:String,
    quantity:Number,
    description:String,
})
const userModel = mongoose.model("users",productSchema)
module.exports = userModel