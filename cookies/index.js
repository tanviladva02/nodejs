// // create a server
// // cookie install
// // login route
// // store token in the cookie
// // get token from the cookie ? if token ? userAuthicated : Wrond Credentials 
// // create a middleWare for token

// const express = require('express')
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// const app = express();
// const PORT = 9000;

// // Middleware

// app.use(bodyParser.json());
// app.use(cookieParser());

// // const users = {
// //     userEmail: 'user@babalu.com',
// //     userPassword: 'password123'
// // }; // register

// // Authentication middleware

// const authMiddleware = (req, res, next) => {
//     const {authToken} = req.cookies;


//     if (authToken && authToken === 'VALID_TOKEN'){
//         next();
//     } 
//     else{
//         res.status(401).json({ message: 'Unauthorized' });
//     }
// };

// // Routes

// app.post('/login', (req, res) => {
//     console.log("login page");
//     const { email, password } = req.body;

//     if (email === "ram@gmail.com" && password === "ram@123") {

//         const authToken = 'VALID_TOKEN';

//         res.cookie('authToken', authToken);

//         res.status(200).json({ message: 'Login successful' });
//     } 
//     else {
//         res.status(401).json({ message: 'Invalid credentials' });
//     }
// });


// app.post('/logout', (req, res) => {
//     res.clearCookie('authToken');
//     res.status(200).json({ message: 'Logged out successfully' });
// });


// app.get('/protected', authMiddleware, (req, res) => {
//     res.status(200).json({ message: 'This is a protected route' });
// });


// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


const express = require("express")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const app = express()
const port = 9000

app.use(cookieParser())
app.use(bodyParser.json())

// app.use("/",(req,res)=>{
//     console.log("Home page")
// })

const Middleware = (req,res,next)=>{
    const {authToken} = req.cookies
    if(authToken  === authToken){
        next();
    }
    else{
        res.status(400).json({msg:"Unauthorized"})
    }
}

app.post("/login",(req,res)=>{
    console.log("Login Page")
    const {email,password} = req.body
    if(email === "ram01@gmail.com" && password === "ram123"){
        const authToken = jwt.sign({course:"node"},"node")
        res.cookie("authToken",authToken)
       res.status(200).json({msg:"Login successfully",authToken})
    }
    else{
        res.status(400).json({msg:"wrong credentials"})
    }
})

app.post("/logout",(req,res)=>{
    res.clearCookie('authToken')
    res.status(200).json({message:'Logged out succesfully...'})
})

app.get("/protected",Middleware,(req,res)=>{
    res.status(200).json({ message: 'This is a protected route' });
})

app.listen(port,(err)=>{
    if(err){
        console.log("Something went wrong")
    }
    console.log("Server is running on the port ",port)
})