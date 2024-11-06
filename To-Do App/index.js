const express = require("express")
const app = express()
const port = 9000

const workList = require("./model/model.to-do")
const userWork = require("./connection/db")
const userRoute = require("./controller/routes")

app.use(express.urlencoded());
app.use(express.json())

app.use("/users",userRoute) 


// const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({ extended: true }));

const ejs = require("ejs")
app.set("view engine","ejs")

app.get("/",(req,res)=>{
    res.render("home")
})

app.get("/to-do_app",async(req,res)=>{
    let allData = await workList.find({})
    res.render("to-do_app",{userData:allData})
})

app.post("/addData",(req,res)=>{
    const {work} = req.body
    const add = new workList ({work})
    add.save()
    console.log(add)
    res.redirect("/to-do_app")
})

// DELETE DATA

app.get("/delete/:id",async(req,res)=>{
    let id = req.params.id;
    console.log("id is ",id);

    let DeleteData = await workList.findByIdAndDelete(id);

    // if(!DeleteData){
    //     res.json({msg:"data not found"})
    //     console.log("Data not found")
    // }
    console.log(DeleteData)
    res.redirect("/to-do_app")
})

// UPDATE DATA

app.get("/edit/:id", async (req, res) => {
    let id = req.params.id;
    let editData = await workList.findById(id);
    res.render("editData", {editData});
})

app.post('/editData/:id', async (req, res) => {
    let editId = req.params.id;
    console.log(editId)
    let userData = await workList.findByIdAndUpdate(editId,req.body);
    res.redirect("/to-do_app")
})

app.listen(port,(err)=>{
    if(err){
        console.log("Something went worng !!!")
    }
    console.log("Server is running on the port "+port)
})
