//framework is a predefined structure
// python  djaongo
// node express
// MVC model (m :- model) (v :- view)ejs (c :- contoller)routes ( model view of controller )

// topic :- express js 

const express = require("express");
const app = express();  
const ejs = require("ejs");
const port = 8090;

app.set("view engine", "ejs");

app.get("/" , (req ,res) => {
    res.render("index");
})

app.get("/about" , (req ,res) => {
    res.render("about");
})


// app.get("/" , (req,res) =>{
//     res.json("i like to study node js");
//     res.end("hello this is express.js");
// })

app.listen(port , (error)=>{
    console.log("server is running on port ",port);
})

// console.log(express);

// creating a server using express.js


