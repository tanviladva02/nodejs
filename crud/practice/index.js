// npm init -y ( to install package.json file )
// npm i express ( to install express )
// npm i nodemon ( to install nodemon )
// server ( nodemon index.js )
// npm run server ( for automatic command process )
// npm i ejs ( for install ejs )

const express = require("express");
const ejs = require("ejs");
const app = express();
const port = 7800;

app.use(express.urlencoded({extended:true}));

let studentData = [
    {
        id:1,
        name:"tanvi",
        email:"tanviladva01@gmail.com",
        phoneNo:9090909090
    },
    {
        id:2,
        name:"janvi",
        email:"janvi01@gmail.com",
        phoneNo:9089909090
    },
    {
        id:3,
        name:"zara",
        email:"zara@gmail.com",
        phoneNo:8780909090
    },
    {
        id:4,
        name:"siya",
        email:"siya@gmail.com",
        phoneNo:7678787909
    }
]

app.listen(port,(error)=>{
    if(error){
        console.log("Something went wrong...")
    }
    console.log("server is running on the port "+port)
})

app.set("view engine","ejs")

app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/home", (req, res) => {
    res.render("home");
});

app.get("/form",(req,res)=>{
    res.render("form",{
        student:studentData
    });
})

app.post("/addData",(req,res)=>{
    let id = Number(req.body.id);
    let name = req.body.name;
    let email = req.body.email;
    let phoneNo = req.body.phoneNo;
    let obj = {
        id:id,
        name:name,
        email:email,
        phoneNo:phoneNo
    }
    studentData.push(obj);
    res.redirect("back");
})

app.get("/delete",(req,res)=>{
    let userId = Number(req.query.id)
    studentData = studentData.filter((item)=> item.id !== userId)
    res.redirect("back")
})

app.get("/edit",(req,res)=>{
    let editId = Number(req.query.id)
    let foundData = studentData.filter((item)=> item.id === editId)
    // res.redirect("back")
    res.render("editData",{
        editData:foundData[0]
    })
})

app.post("/editData",(req,res)=>{
    let updatedDataId = Number(req.body.id);
    let newData = studentData.map((item) => {
        if (item.id === updatedDataId) {
            item.name = req.body.name;
            item.email = req.body.email;
            item.phoneNo = req.body.phoneNo
        }
        return item
    })
    studentData = newData
    res.redirect('/form')
})