const jwt = require("jsonwebtoken")

const verifyToken = (req,res,next) =>{
    try{
        // console.log("middleware")
        // console.log(req.cookies)
        const token = req.cookies.authToken
        console.log(token)
        if(!token){
            return res.redirect("/authentication-register.html")
        }

        jwt.verify(token,"node",(err,decoded)=>{
            if(err){
                return res.status(401).json({msg:"failed to authentication token",err})
                // console.log("failed to authentication token")
            }
            req.user= decoded;
            console.log(req.user)
            console.log("private routes...")
            next();
        })
    }
    catch(err){
        return res.status(401).json({ msg: "Something went wrong" });
    }

}

module.exports = verifyToken