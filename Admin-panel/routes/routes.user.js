const express = require("express")
const users = require("../model/model.users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const user_model = express.Router()

user_model.get("/register",(req,res)=>{
    res.render("register")
})

user_model.post("/registerData",async(req,res)=>{
   try {
        console.log(req.body)
        const {name,email,pass} = req.body;
        console.log(name)
        console.log(email)
        console.log(pass)
        if(!name || !email || !pass){
            return res.status(400).json({msg:"All feilds are require !"})
        }
        const hashedPass = await bcrypt.hash(pass,3)
        const newUser = new users({name,email,pass:hashedPass})
        await newUser.save()
        console.log(newUser)
        return res.status(200).json({msg:"Register Successfully..."})
   } catch (error) {
        return res.status(500).json({msg:"server error",error:error.message})
   }
})

user_model.get("/login",async(req,res)=>{
    res.render("login")
})

user_model.post("/loginData",async(req,res)=>{
    try {
        console.log(req.body)   
        const {email,pass} = req.body;
        if(!email || !pass){
            return res.status(400).json({msg:"Email and password are require !"})
        }
        const checkUser = await users.findOne({email})
        if(!checkUser){
            return res.status(400).json({msg:"Wrong credentials"})
        }
        const checkpass = await bcrypt.compare(pass,checkUser.pass)
        if(checkpass){
            let token = jwt.sign({course:"node"},"node")
            console.log(token,"token")
            // if(token){
            //     res.render("home")
            // }
            // else{
            //     return res.status(400).json({msg:"Sign Up first successfully",token})
            // }
            return res.status(200).json({msg:"Login successfully",token})
        }
        else{
            return res.status(400).json({msg:"Wrong credential"})
        }
    } catch (error) {
        return res.status(500).json({msg:"Server error",error:error.message})
    }
})

module.exports = user_model