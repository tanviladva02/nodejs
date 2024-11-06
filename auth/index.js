const express = require("express")
// const cors = require("cors")
const app = express()
app.use(express.json())
const connection = require("./connection/db")
// const model = require("./model/auth.model")
const routes = require("./routes/auth.routes")
const pages = require("./pages/home")

    const port = 9999
    app.use("/auth",routes)
    app.use("/",pages)
    // app.use(cors())

    app.use("/",(req,res)=>{
        res.end("Home page")
    })

app.listen(port,(err)=>{
    if(err){
        console.log("Something went wrong...")
    }
    console.log("server is running on the port "+port)
})

// authentication => if user is valid or not ( checking the data in database , or user has provided right credentials or not) , getting permission

// authentication => after authentication if user is valid , user is allowed to use the certain feature of application , if yes than features can use or not we can not use the featiures

// instagram => registration => username,password => login user name , password => if username and password matched you can use and if not you can not

//cookies => Cookies are small pieces of data stored on a user's web browser. They are used to remember stateful information (such as items added in the shopping cart in an online store) or to record the user's browsing activity (like recording which pages were visited in the past).