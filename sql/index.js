const express = require("express")
const app = express()

//mvc = model view controller

const connection = require("./connections/db")
const userRoutes = require("./controller/routes.user")

app.use(express.json());// to convert data in json format

app.use("/users",userRoutes)

const port = 8899

app.get("/",(req,res)=>{
    res.end("hello world")
})

app.listen(port,async(req,res,err)=>{
    await connection;
    // if(err){
    //     console.log("Something went wrong...")
    // }
    console.log("server is running on the port "+port)
 })

 

