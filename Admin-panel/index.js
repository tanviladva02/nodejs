//1. SETUP THE SERVER

const express = require("express")
const app = express()

const ejs = require("ejs")
const path = require("path");
const cookieParser = require("cookie-parser")
const session = require('express-session'); 
const flash = require('connect-flash'); 

const connection = require("./connection/db")
const proRoute = require("./routes/routes.product")
const adminRoutes = require("./routes/routes.admin")
const userRoutes = require("./routes/routes.user")
  

// MIDDLEWARE

app.set("view engine","ejs")
app.use(express.json())
app.use(flash()); 
app.set("views",path.join(__dirname,'views'));
app.use(cookieParser())
app.use("/adminRoutes",adminRoutes)
app.use("/proRoute",proRoute)
app.use("/userRoutes",userRoutes)

const port = 9900

//FLASH

app.use(session({ 
    secret:'node', 
    saveUninitialized: true, 
    resave: false,
    cookie: { maxAge: 60 * 60 * 1000 }
})); 

//SERVER

app.listen(port,async()=>{
    try{
        await connection;
        console.log("Server is running at the port ",port)
    }
    catch(error){
        console.log("Something went wrong...",error)
    }
})

// -----------------------------------------------------------------------------------------------------------------//

//call back function :-

// call back function is the function which is to be executed after anotherfunction finshed execution

// argument pass => call back function

// node is single threaded (one way), this behaviour called asyncronous

//js is single threaded

// allows node js to perform non blocking operation => event loop