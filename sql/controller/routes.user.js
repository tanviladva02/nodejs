// step-1 require express

const express = require("express")

// step-2 create userRoute

const userRoutes = express.Router()

// create routes end with api end points and crud operation


const user = require("../model/model.student")


// add Data

userRoutes.post("/addData", async (req,res)=>{
    console.log(req.body)
    // console.log("done")
    let newUser = new user ({
        username : req.body.username,
        email : req.body.email ,
        age : req.body.age ,
        password : req.body.password
    })  
    // const {username,email,age,password} = req.body;
    //const addData = new users({username,email,age,password})
    // await addData.save();
    // res.send(addData);
    const savedUser = await newUser.save();
    console.log(savedUser)
    res.json({"user":savedUser})  
})

//get data

userRoutes.get("/getData",async(req,res)=>{
    const getData = await user.find()
    console.log(getData)
    res.send(getData)
})

//delete data

userRoutes.delete("/delete/:id" , async(req,res)=>{
    // console.log(req.params);
    const {id} = req.params;
    console.log(id);

    const DeleteData = await user.findByIdAndDelete(id);

    if(!DeleteData){
        res.json({msg:"data not found"})
        console.log("Data not found")
    }

    console.log(DeleteData)
})

// updateData

userRoutes.put("/update/:id",async (req,res)=>{
    const {id} = req.params;
    const {username,email,age,password} = req.body;
    const updatedData = await user.findByIdAndUpdate(id,{username,email,age,password});
    console.log(updatedData)
})

//put -> puri id upadte
// patch -> only one thing

module.exports = userRoutes;