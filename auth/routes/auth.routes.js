const express = require("express")
const User = require("../model/auth.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userRoutes = express.Router() // provide routing 

// userRoutes.post("/register",async(req,res)=>{
//     try{
//         console.log(req.body)
//         const {name,email,password} = req.body
//         if(!name || !email || !password){
//             res.status(400).json({msg:"All feilds are required"})
//         }
//         const hashedPass =await bcrypt.hash(password,3)

//         const registerData = new User({name,email,password:hashedPass})
//         registerData.save()
//         await res.status(200).json({msg:"user added succesfully"})
//         console.log(registerData)
//     }
//     catch(err){
//         res.status(500).json({msg:"Server error",err:err.message})
//     }
// })

userRoutes.post("/register",async(req,res)=>{
   try{
        const {name,email,password} = req.body
        console.log(req.body)
        if(!name || !email || !password){
            res.status(400).json({msg:"all feild is required"})
        }
        const hashedPass = await bcrypt.hash(password,3)
        const newUser = new User ({name,email,password:hashedPass})
        await newUser.save()
        console.log(newUser)
        res.status(200).json({msg:"Register successfully ..."}) 
   }
   catch(err){
        res.status(500).json({msg:"Server error",err:err.message})
   }
})

userRoutes.post("/login",async(req,res)=>{
   try{
        console.log(req.body)
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({msg:"Email and Password are required"})
        }
        const checkUser =await User.findOne({email})
        if(!checkUser){
            return res.status(400).json({msg:"wrong credentials"})
        }
        const checkPass =await bcrypt.compare(password,checkUser.password)
        if(checkPass){
            let token = jwt.sign({course:"node"},"node")
            console.log(token,"token")
            res.status(200).json({msg:"Login successful",token})
        }
        else{
            res.status(400).json({msg:"Wrong crendtials"})
        }
   }
   catch(err){
        res.status(500).json({msg:"Server error",err:err.message})
   }
})

module.exports = userRoutes