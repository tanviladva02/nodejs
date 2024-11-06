const jwt = require("jsonwebtoken")

const verifyToken = (req,res,next) =>{
    const token = req.cookies.admintoken
    if(!token){
        res.redirect("/adminRoutes/login")
    }

    jwt.verify(token,"node",(err,decoded)=>{
        if(err){
            // res.stauts(401).json({msg:"failed to authentication token"})
            console.log("failed to authentication token")
        }
        req.checkUser= decoded;
        next();
    })
}

module.exports = verifyToken