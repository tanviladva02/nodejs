const express = require('express');
const user = require("../Model/model.student")
const userRoutes = express.Router();

// add data

userRoutes.post("/addData", async (req, res) => {
    console.log(req.body)
    let newUser = new user({
        name : req.body.name,
        email : req.body.email,
        age : req.body.age,
        password : req.body.password
    })

    const savedUser = await newUser.save();
    console.log(savedUser)
    res.json({"userdata":savedUser})

})

// getData

userRoutes.get("/getData" , async(req,res)=>{
    const getData = await user.find()
    console.log(getData)
    res.send(getData)
})

//Delete Data

userRoutes.delete("/delete/:id" , async (req,res)=>{
    const {id} = req.params;
    console.log(id);
    const deletedData = await user.findByIdAndDelete(id);
    console.log(deletedData);
})

// Update Data

userRoutes.put("/update/:id", async(req,res)=>{
    const {id} = req.params;
    const {name , email , age , password} = req.body;
    const updateData = await user.findByIdAndUpdate(id , {name,email,age,password})
    console.log(updateData);
})

module.exports = userRoutes;