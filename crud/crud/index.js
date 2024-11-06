const express = require("express");
const ejs = require("ejs");

const app = express();

app.use(express.urlencoded({ extended: true }));
// app.use(express.urlencoded({extended:true}))

let studentData = [
    { 
        id: 1,
        name: "ram", 
        email: "ram@gamil.com", 
        phoneNo: "9922444223" 
    },
    { 
        id: 2, 
        name: "rama", 
        email: "rama@gamil.com", 
        phoneNo: "9922543223" 
    },
    {
        id: 3, 
        name: "raman", 
        email: "raman@gamil.com", 
        phoneNo: "9972443223" 
    },
    { 
        id: 4, 
        name: "ramesh", 
        email: "ramesh@gamil.com", 
        phoneNo: "8922443223" 
    },
    { 
        id: 6,
        name: "ramdhari", 
        email: "ramdhari@gamil.com", 
        phoneNo: "7922443223" 
    },
];
// console.log(studentData);

const port = 8900;
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/form", (req, res) => {
    res.render("form", {
        student: studentData
    });
});

app.post("/addData", (req, res) => {
    let id = Number(req.body.id);
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;

    let obj = { 
        id: id, 
        name: name, 
        email: email, 
        phoneNo: phone
    };
    studentData.push(obj);
    res.redirect('back');
});

app.get('/delete', (req, res) => {
    let userId = Number(req.query.id);
    studentData = studentData.filter((item) => item.id !== userId);
    res.redirect("back");
});

app.get('/edit', (req, res) => {
    let editId = Number(req.query.id);
    let foundEditData = studentData.filter((item) => item.id === editId);  // 
    res.render('editedData', { editData: foundEditData[0] });
});

app.post('/editData', (req, res) => {
    // console.log(req.body)
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

app.listen(port, (error) => {
    if (error) {
        console.log("something is wrong");
    }
    console.log("server is running at port :", port);
});


