const express = require("express")
const path = require("path")
const port = 8001;
const app = express()
app.set("view engine ,ejs")
app.set("views",path.join(__dirname,"views"))



const db = require("./config/database")


app.post("/addCustomer",fileMiddleware.uploadImage,async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
})

app.get("/customer",async(req,res)=>{
    return res.render('customer')
})

app.listen(port,(err)=>{
    err?console.log(err):console.log("server is connected : ",port)
})