const express = require("express")
const app = express()

const ejs = require("ejs");

const multer = require("multer");
const bcrypt = require("bcrypt")
const path = require("path")

const { connections } = require("./connections/db")
const usersRoutes = require("./controller/user.route")
const loginUser = require("./Model/model.login")
let user = require("./Model/model.student")

const authenticationRoutes = require("./Routes/routes.auth")

app.use("/auth",authenticationRoutes);

app.use(express.urlencoded({ extended: true }))

app.use(express.json());

app.use("/imguploads", express.static(path.join(__dirname, "imguploads")))

app.set("view engine", "ejs");

app.use("/users", usersRoutes);

app.use("/loginUsers",loginUser);

const port = 2700;

app.get("/", (req, res) => {
    res.send("Hello...");
})

// UPLOAD IMAGE

const fileupload = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "imguploads/")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const imageUpload = multer({ storage: fileupload }).single("image");

app.get("/form", async (req, res) => {
    let allData = await user.find();
    console.log(allData);
    res.render("form", {
        userData: allData
    });
})

app.post("/addData", imageUpload, async (req, res) => {
    console.log(req.file)

    let image = "";
    if (req.file) {
        image = req.file.path
    }
    const { name, email, age, password } = req.body;
    const newuser = new user({ name, email, age, password, image });
    await newuser.save();
    res.redirect("/form");
});

app.get("/register", async (req, res) => {
    let allUserData = await loginUser.find();
    console.log(allUserData);
    res.render("login", {
        loginUserData: allUserData
    });
})

app.post("/register",async(req,res)=>{
    const {name,email,password} = req.body;
    console.log(req.body)
    const hashedPassword = await bcrypt.hash(password,5)
    const newloginUser = new loginUser ({name,email,password:hashedPassword})
    await newloginUser.save()

    console.log(newloginUser)
    
    // newloginUser.status(200).json({msg:"User added successfully"})

})

app.post("/login", async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;
    // check user is in database or not

    const checkUser = await users.findOne({ email });

    console.log(checkUser)

    if (!checkUser) {
        res.status(400).json({ msg: "wrong credentials" })
    }
    else{
        const matchedPass = await bcrypt.compare(password, checkUser.password);
        if (!matchedPass) {
            res.status(400).json({ msg: "Wrong..." })
        }
        else{
            res.status(200).json({msg:"Login successfully"})
        }
    }
})

// DELETE DATA

app.get("/delete", async (req, res) => {
    let id = req.query.id;
    console.log(id);
    let deleteData = await user.findByIdAndDelete(id);
    console.log(deleteData);
    res.redirect("/form")
})

// UPDATE DATA

app.get("/edit/:id", async (req, res) => {
    let id = req.params.id;
    let editData = await user.findById(id);
    res.render("editData", { editData });
})

app.post('/editData/:id', imageUpload, async (req, res) => {
    const id = req.params.id;
    const editData = req.body;
    const image = req.file;

    if (image) {
        editData.image = image.path;
    }

    let userData = await user.findByIdAndUpdate(id, editData);
    res.redirect("/form");
})

// jwt - json web token

app.listen(port, async (req, res, err) => {
    await connections;
    console.log("server is running at port ", port);
})