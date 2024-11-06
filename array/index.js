//framework is a predefined structure
// python  djaongo
// node express
// MVC model (m :- model) (v :- view)ejs (c :- contoller)routes ( model view of controller )

// topic :- express js 

const express = require("express");
const app = express();  
let studentData = [
    { 
        id:1 ,
        name:"ram",
        email:'ram@gmail.com',
        phoneNo : "9090909090"
    },
    { 
        id:2 ,
        name:"rama",
        email:'rama@gmail.com',
        phoneNo : "8990909090"
    },
    { 
        id:3 ,
        name:"shreeram",
        email:'shreeram@gmail.com',
        phoneNo : "3090909090"
    },
]

const ejs = require("ejs");
const port = 9900;

app.set("view engine", "ejs");

app.get("/" , (req ,res) => {
    res.render("index");
})

app.get("/about" , (req ,res) => {
    res.render("about",{
        student:studentData
    })
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


