const express = require("express")

const authRoute = express.Router() // provide routing 

const bcrypt = require("bcrypt")

const user = require("../Model/model.login")

const jwt = require("jsonwebtoken")

module.exports = authRoute;