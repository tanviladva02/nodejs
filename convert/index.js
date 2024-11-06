const express = require("express")
require("dotenv").config()
const path = require("path")

const connecion = require("./connection/db")
const authRouter = require("./routes/routes.auth")
const middleware = require("./middleware/private")
const cookieParser = require("cookie-parser");

const app = express()

app.use(express.json())
app.use(cookieParser());
app.use(express.static("public"))

app.use("/auth",authRouter);
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname , "index.html"))
})

app.get("/index.html",(req,res)=>{
    res.sendFile(path.join(__dirname , "index.html"))
})

app.get("/charts.html",middleware,(req,res)=>{
    res.sendFile(path.join(__dirname,'charts.html'))
})

app.get("/widgets.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'widgets.html'))
})

app.get("/tables.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'tables.html'))
})
app.get("/grid.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'grid.html'))
})

app.get("/form-basic.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'form-basic.html'))
})

app.get("/form-wizard.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'form-wizard.html'))
})

app.get("/pages-buttons.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'pages-buttons.html'))
})

app.get("/icon-material.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'icon-material.html'))
})

app.get("/icon-fontawesome.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'icon-fontawesome.html'))
})

app.get("/pages-elements.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'pages-elements.html'))
})

app.get("/pages-elements.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'pages-elements.html'))
})

app.get("/index2.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'index2.html'))
})

app.get("/pages-gallery.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'pages-gallery.html'))
})

app.get("/pages-calendar.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'pages-calendar.html'))
})

app.get("/pages-invoice.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'pages-invoice.html'))
})

app.get("/pages-chat.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'pages-chat.html'))
})

app.get("/authentication-login.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'authentication-login.html'))
})

app.get("/authentication-register.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'authentication-register.html'))
})
app.get("/error-403.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'error-403.html'))
})
app.get("/error-404.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'error-404.html'))
})
app.get("/error-405.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'error-405.html'))
})
app.get("/error-500.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'error-500.html'))
})


app.listen( process.env.PORT, async(req,res)=>{
    await connecion;
    console.log("Server is running at port",process.env.PORT)
})

// require path
// route res.sendFile(path.join(__dirname,"index.html"))