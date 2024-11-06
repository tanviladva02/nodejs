const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../model/model.auth")
const jwt = require("jsonwebtoken");
const authRoute = express.Router(); // provide routing

authRoute.post('/register', async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, password } = req.body;
        
        if (!username || !email || !password) {
            return res.status(400).json({ msg: 'All fields are required' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // Use more rounds

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(200).json({ msg: 'User added successfully', newUser });
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
});

authRoute.post('/login', async (req, res) => {
    try {
        console.log(req.body);
        const { email, loginpassword } = req.body;

        if (!email || !loginpassword) {
            return res.status(400).json({ msg: 'Email and password are required' });
        }

        const checkUser = await User.findOne({ email });
        console.log("check user", checkUser)

        if (!checkUser) {
            return res.status(400).json({ msg: 'Wrong credentials' });
        }

        // Compare the hashed password
        const matchedPass = await bcrypt.compare(loginpassword, checkUser.password);

        if (matchedPass) {
            // token jwt (json-web-token)
            let token = jwt.sign({ course: "node" }, "node")
            console.log(token, "token")

            res.status(200).json({ msg: 'Login successful', token });
        } else {
            res.status(400).json({ msg: 'Wrong credentials' });
        }
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
});


module.exports = authRoute;