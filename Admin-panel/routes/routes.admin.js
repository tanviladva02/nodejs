const express = require("express")
const nodemailer = require("nodemailer")
const adminModel = require("../model/model.admin")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const admin_model = express.Router()

admin_model.get("/register",(req,res)=>{
    res.render("register")
})

admin_model.post("/registerData",async(req,res)=>{
   try {
        console.log(req.body)
        const {name,email,pass} = req.body;
        console.log(name)
        console.log(email)
        console.log(pass)
        if(!name || !email || !pass){
            return res.status(400).json({msg:"All feilds are require !"})
        }
        const hashedPass = await bcrypt.hash(pass,3)
        const newUser = new adminModel({name,email,pass:hashedPass})
        await newUser.save()
        console.log(newUser)
        return res.status(200).json({msg:"Register Successfully..."})
   } catch (error) {
        return res.status(500).json({msg:"server error",error:error.message})
   }
})




admin_model.get("/login",async(req,res)=>{
    res.render("login")
})

admin_model.post("/loginData",async(req,res)=>{
    try {
        console.log(req.body)   
        const {email,pass} = req.body;
        if(!email || !pass){
            return res.status(400).json({msg:"Email and password are require !"})
        }
        const checkUser = await adminModel.findOne({email})
        if(!checkUser){
            return res.status(400).json({msg:"Wrong credentials"})
        }
        const checkpass = await bcrypt.compare(pass,checkUser.pass)
        if(checkpass){
            let token = jwt.sign(
                {course:"node"},//key & value
                "node",//secrate key
                {expiresIn:'1h'}// expire time of token
            )
            console.log(token,"token")
            res.cookie("admintoken",token)
            return res.status(200).json({msg:"Login successfully",token})
        }
        else{
            return res.status(400).json({msg:"Wrong credential"})
        }
    } catch (error) {
        return res.status(500).json({msg:"Server error",error:error.message})
    }
})

admin_model.get("/update",(req,res)=>{
    res.render("updatePassword")
})

admin_model.post("/updatePass",async(req,res)=>{
    try {
        console.log(req.body)

        const {email,oldpass,newpass} = req.body
        const userobj = await adminModel.findone({email})
        console.log(userobj)
        const checkpass = await bcrypt.compare(userobj.password,oldpass)

        if(!checkpass){
            res.status(400).json({msg:"Passowrd is incorrect"})
        }

        const hashedpass =  await bcrypt.hash(checkpass,3)

        let updatedPass = await adminModel.findByIdAndUpdate(userobj._id,{password : hashedpass})
        res.status(200).json({msg:"password changes successfully"})
    } catch (error) {
        res.status(400).json({message:"Something went wrong !"})
    }
}) 

admin_model.get("/verifyotp",(req,res)=>{
    res.render("verifyOTP")
})

admin_model.get("/generateotp",(req,res)=>{
    res.render("generateOTP")
})

admin_model.post("/generateOtp", async (req, res) => {

    try {
        const { email } = req.body;
        console.log(email)

        //verify the email in database
        const user = await adminModel.findOne({ email })

        // const user = await userModel.findOne({ email });
        console.log(user)

        if (!user) {
            res.status(404).json({ msg: 'User not found, invalid email' })
        }

        // if email matches successfully then generate otp
        console.log("otp  generated")


        const transporter = nodemailer.createTransport({
            host: "tanviladva@gmail.com",
            service: "gmail",
            auth: {
                user: "tanviladva@gmail.com",
                pass: "xloj kqfz bemv tbzc",
            },
        });

        let randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
        let otpExpires = Date.now() + 60 * 10 * 1000;

       
        console.log(randomOtp)


        // store the otp in the mongodb
        user.otp = randomOtp;
        user.otpExpires = otpExpires;
        await user.save(); // store the otp in data bse


        async function main() {
            // send mail with defined transport object
            const info = await transporter.sendMail({
                from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
                to: user.email, // list of receivers
                subject: "Hello ✔", // Subject line
                text: randomOtp, // plain text body
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
        }
        main().catch(console.error);

    } catch (error) {
        res.status(400).json({ msg: "Otp not sent something is wrong", error })
    }
})

admin_model.post("/verifyOtp", async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        console.log(req.body)

        const user = await adminModel.findOne({
            email, otp,
            otpExpires: { $gt: Date.now() }
        });

        console.log(user)

        if (!user) {
            return res.status(400).json({ msg: 'Invalid OTP or OTP has expired.' });
        }

        // Update the password
        user.password = newPassword;
        user.otp = undefined;

        await user.save();

        res.status(200).json({ msg: 'Password updated successfully' });
    } catch (error) {
        console.error("Invalid OTP", error);
        res.status(500).json({ msg: 'Error verifying OTP', error });
    }
});

// const transporter = nodemailer.createTransport({
//     host: "tanviladva01@gmail.com",

//     service: "gmail",
//     auth: {
//         user: "tanviladva01@gmail.com",
//         pass: "jipz roui fmgh cbze",
//     },
// });


// async function main() {
//     // send mail with defined transport object
//     const info = await transporter.sendMail({
//         from: '"Shine shopping brand"<shiningbrand01@gmail.com>', // sender address
//         to: "nensikukadia04@gmail.com", // list of receivers
//         subject: "Do not share this OTP with anyone ✔", // Subject line
//         text: "7655", // plain text body
//     });

//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
// }
// main().catch(console.error);



// Verify OTP and reset password

// admin_model.post('/verifyOtp', async (req, res) => {
//     const { email, otp, newPassword } = req.body;
//     console.log(email, otp, newPassword)

//     try {
//         const user = await userModel.findOne({
//             email,
//             otp,
//             otpExpires: { $gt: Date.now() } // Ensure OTP is still valid
//         });

//         if (!user) {
//             return res.status(400).json({ msg: 'Invalid OTP or OTP has expired.' });
//         }

//         // Reset the password (you should hash the password using bcrypt)
//         user.password = newPassword;
//         user.otp = undefined;  // Clear the OTP
//         user.otpExpires = undefined;

//         await user.save();

//         res.status(200).json({ msg: 'Password has been reset successfully.' });
//     } catch (error) {
//         res.status(500).json({ msg: 'Error resetting password', error });
//     }
// });




module.exports = admin_model