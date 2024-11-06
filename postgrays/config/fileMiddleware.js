const multer = require("multer")
const imagepath = "/uploads"
const path = require("path");
const imageStorage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb (null,path.join(__dirname,'../',imagepath))
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname + "-"+Date.now())
    }
})