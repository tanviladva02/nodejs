const express = require("express")
var flash = require("connect-flash")

const app =express()
const port =8888

app.get("/",(req,res)=>{
    res.send({msg:"helloo"})
})

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

app.listen(port,()=>{
    console.log("Sever is running on the port ",port)
})