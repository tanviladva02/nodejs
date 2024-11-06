const express = require("express")
const auth = require("../model/model.auth")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const authRouter = express.Router()

authRouter.post("/register",async(req,res)=>{
    try{
        const {name,email,pass,pass2} = req.body
        const hashPassword = await bcrypt.hash(pass,10);
        console.log(req.body)

        if(!name || !email || !pass || !pass2){
            return res.status(400).json({msg:"All feilds are require..."})
        }

        const data = new auth({name,email,pass : hashPassword,pass2})
        await data.save()
        console.log(data)
        return res.status(200).json({msg:"Register successfully..."})
    }
    catch(err){
        return res.status(500).json({msg:"server error",err:err.message})
    }
})

authRouter.post("/login",async(req,res)=>{
   try {
        const {name,pass} = req.body;
        console.log(req.body);
        if(!name || !pass){
            return res.status(400).json({msg:"Email and password are require !"})
        }
        const checkUser = await auth.findOne({name})
        if(!checkUser){
            return res.status(400).json({msg:"User not found"})
        }
        const checkpass = await bcrypt.compare(pass,checkUser.pass)
        if(checkpass){
            const token = jwt.sign(
                {course:'node'},//key & value
                'node',//secrate key
                {expiresIn:'1h'}// expire time of token
            )
            res.cookie("authToken",token)
            res.status(200).json({success:true,msg:"Login successfully"})
            console.log(token)
        }
        else{
            return res.status(400).json({success:false,msg:"Wrong credential"})
        }
   } catch (error) {
        res.status(500).json({msg:"Server error",error:error.message})
   }


})

module.exports = authRouter;