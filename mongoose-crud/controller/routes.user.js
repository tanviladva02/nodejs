const express = require("express")
const userRoutes = express.Router()

const user = require("../model/model.student")

// addData 

// userRoutes.post("/addData",async(req,res)=>{
//     const {name,email,age} = req.body
//     const addData = new user ({name,email,age})
//     await addData.save()
//     res.send(addData)
// })

//get data

userRoutes.get("/getData",async(req,res)=>{
    const getData = await user.find()
    console.log(getData)
    res.send(getData)
})

//delete data

userRoutes.delete("/deleteData/:id" , async(req,res)=>{
    const {id} = req.params;
    console.log(id);

    const DeleteData = await user.findByIdAndDelete(id);

    // if(!DeleteData){
        // res.json({msg:"data not found"})
        // console.log("Data not found")
    // }

    console.log(DeleteData)
})

// updateData

userRoutes.put("/updateData",async(req,res)=>{
    const {id} = req.params
    const {name,email,age} = req.body;
    const updateData = await users.findByIdAndUpdate(name,email,age)
    console.log(updateData)
})


module.exports = userRoutes;