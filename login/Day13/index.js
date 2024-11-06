const express = require('express');
const app = express();
app.use(express.json());
const bcrypt = require("bcrypt");
const user = require("./model/model.auth")

const dbConnection = require("./connection/db")

const port = 9090;


app.post("/register", async (req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body;
    // changing password in encrypted form is known as hashing
    const hashedPassword = await bcrypt.hash(password, 5)

    const newUser = new user({ username, email, password: hashedPassword })
    await newUser.save();
    res.status(200).json({ msg: "User added Successfully", newUser })
    // console.log(newUser)
})

// login
app.post("/login", async (req, res) => {
    console.log(req.body)
    const { email, loginpassword } = req.body;
    // check user is in database or not

    const checkUser = await user.findOne({ email });

    console.log(checkUser)

    if (!checkUser) {
        res.status(400).json({ msg: "wrong credentials" })
    }

    const matchedPass = await bcrypt.compare(loginpassword, checkUser.password);
    if (matchedPass) {
        res.status(200).json({ msg: "login successful" })
    }



})












app.listen(port, async () => {
    await dbConnection;
    console.log("server is running at port", port)
})