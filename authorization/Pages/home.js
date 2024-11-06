const express = require("express");

pageRoutes = express.Router();


pageRoutes.get("/", (req, res) => {
    res.end("this is home page")
})

// routes private

pageRoutes.get("/about", (req, res) => {
    let token = req.query
    console.log(token)
    if(token){
        res.json({msg:"this is about page , welcome !"})
    }
    else{
        res.status(400).json({msg:"Login first"})
    }
})

pageRoutes.get("/contact", (req, res) => {
    res.end("Hello this is contact page")
})

module.exports = pageRoutes;