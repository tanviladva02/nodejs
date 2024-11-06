const express = require("express")
const userModel = require("../model/model.auth")
const passport = require("passport")
const authRouter = express.Router()

authRouter.get("/register",(req,res)=>{
    res.render("register")
})

authRouter.post("/registerData",async(req,res)=>{
   
    try {
            // if(!name) return res.json({msg:"username is required"})
            // if(!email) return res.json({msg:"email is required"})
            // if(!password) return res.json({msg:"password is required"})
            console.log(req.body)
            const {name,email,password} = req.body;
            if(!name || !email || !password){
                return res.status(400).json({msg:"All feilds are require..."});
            }
            
            const user = new userModel({name,email,password})
            await user.save()
            return res.status(200).json({msg:"User register successfully..."})

    } catch (error) {
        return res.status(400).json({msg:"Something went wrong...",error})
    }
})



authRouter.get("/login",(req,res)=>{
    res.render("login")
})

// authRouter.post("/loginData",async(req,res)=>{
//    try {

//         console.log(req.body)
//         if(!email) return res.json({msg:"email is required"})
//         if(!password) return res.json({msg:"password is required"})

//             let user = await userModel.findOne({email})
//             if(!user){
//                 return res.json({msg:"user not found"})
//             }

//             if(user.password !== password){
//                 return res.json({msg:"Password is required"})
//             }

//             res.json(200).json({msg:"Login successfully..."})

    
//    } catch (error) {
//         return res.status(400).json({msg:"Something went wrong...",error})
//    }
// })



authRouter.post('/loginData', 
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
    //   res.redirect('/');
    console.log("logged in successfully...")
    
});


module.exports = authRouter

// home , about , login , signup