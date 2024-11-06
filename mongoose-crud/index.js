
const express = require("express")
const ejs = require("ejs")
const app = express()
const port = 9999

app.set("view engine","ejs")

const connection = require("./connection/db")
const userRoutes = require("./controller/routes.user")
const path = require("path")  
const user = require("./model/model.student")
const multer = require("multer")

app.use(express.urlencoded());

app.use(express.json()); // to convert data in json format

app.use("/imgUpload",express.static(path.join(__dirname,"imgUpload")))

app.use("/users",userRoutes)


//multer -> helping to transfer or upload files

const storage = multer.diskStorage({
    destination: function (req, file, cb) { // cb is call back function
      cb(null, 'imgUpload/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage }).single("image");


app.get("/",(req,res)=>{
    res.end("hello world")
})

app.get("/form",async(req,res)=>{
    let allData = await user.find({})
    console.log(allData)
    res.render("form",{data:allData})
})

app.post("/addData",upload ,async(req,res)=>{
    console.log(req.file)

    let image = ""
    if(req.file){
        image = req.file.path
    }

    const {name,email,age} = req.body
    const addData = new user ({name,email,age,image})
    await addData.save()
    // res.send(addData)
    res.redirect("/form")
})


app.get("/delete/:id",async(req,res)=>{
    let id = req.params.id;
    console.log("id is ",id);

    let DeleteData = await user.findByIdAndDelete(id);

    if(!DeleteData){
        res.json({msg:"data not found"})
        console.log("Data not found")
    }
    console.log(DeleteData)
    res.redirect("/form")
})

app.get("/update/:id",async(req,res)=>{
    let id = req.params.id;
    let {name,email,age} = req.body;
    let updatedData = await user.findByIdAndUpdate(id,{name,email,age});
    console.log(updatedData)
})



app.listen(port,(error)=>{
    if(error){
        console.log("Something went wrong")
    }
    console.log("server is running at the port "+port)
})


