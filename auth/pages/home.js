const express = require("express")
const jwt = require("jsonwebtoken")
pageRoutes = express.Router()

pageRoutes.get("/",(req,res)=>{
    res.end("Home page")
})

pageRoutes.get("/about",(req,res)=>{
    let token = req.headers.authorization.split(" ")[1]
    // let {token} = req.query 
    console.log("token come to about page",token)
    
    try{
        jwt.verify(token,("node"),function(err,decoded){
            if(decoded){
                res.json({msg:"Welcome to about page"})
            }
            else if(err){
                res.status(404).json({msg:"Login First"})
            }
        })
    }
    catch(err){
        res.status(404).json({msg:"You are not authorized"})
    }
})

pageRoutes.get("/contact",(req,res)=>{
    res.end("Welcome to the contact page")
})

module.exports = pageRoutes