const express = require("express")
const mongoose = require("mongoose")

const admin = mongoose.Schema({
    name:String,
    email:String,
    pass:String
})

const adminSchema = mongoose.model("admin",admin)

module.exports = adminSchema