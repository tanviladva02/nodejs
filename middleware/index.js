// const express = require("express")
// // const ejs = require("ejs")
// const app = express()

// app.set("view engine","ejs")

// const port = 8888
// const checker = (req, res, next) => {
//     if (req.query.age >= 18) {
//         return next();
//     }
//     return res.redirect('/')
// }

// app.get('/',(req,res)=>{
//     console.log("hello bro ....");
// })

// app.get("/home",checker,(req,res)=>{
//     res.render("home");
// })

// app.use(checker())

// // middleware is function

// app.listen(port,(error)=>{
//     if(error){
//         console.log("something went wrong")
//     }
//     console.log("server is running on the port "+port);
// })

// //?age=19 - on the url

//-------------------------------------------------------------------------------------//

// const express = require('express');

// const app = express();

// app.set("view engine", "ejs")

// const port = 8000;

// // middleware is functin

// const checkpost = (req, res, next) => {
//     if (req.query.age >= 18) {
//         return next();
//     }
//     return res.redirect('/')
// }

// app.get("/", (req, res) => {
//     console.log(req.query.age)
//     return res.end("hello bro")
// })

// app.get("/home", checkpost, (req, res) => {
//     res.render("home")
// })

// // app.use(checker())
// app.listen(port, (err) => {
//     if (err) {
//         console.log("something is wrong")
//     }
//     console.log("server is running at por", port);
// })

const express = require('express')
const app = express()
const port = 8887
const ejs = require('ejs')

app.set("view engine","ejs")

const abc = (req,res,next)=>{
    console.log(req.query.age)
    if(req.query.age >= 18){
        return next;
    }
    return res.render("home");
}

app.get("/",(req,res)=>{
    res.render("index")
})

app.use(abc)

app.listen(port,(error)=>{
    if(error){
        console.log("Something went wrong...")
    }
    console.log("Your server has been running on the port "+port);
})

