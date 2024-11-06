const express = require("express")
const ejs = require("ejs")
const app = express()
const connection = require("./connection/db")

const port = 8000
app.set("view engine","ejs")
app.use(express.json())

const passport = require("passport")
const session = require("express-session")
const LocalStrategy = require("passport-local")


const auth = require("./routes/routes.auth")
const userModel = require("./model/model.auth")
app.use("/auth",auth)


app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  }));

  app.use(passport.initialize())
  app.use(passport.session())


  passport.use(new LocalStrategy(
    function(username, password, done) {
      userModel.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));

  // serlize => store the user into session
  // deserilize => to get the data from session // like localstorage.getItem

  passport.serializeUser((user,done)=>{
    done(null,user.id) // store the user id into the session
  })

//deserlizeuser  
  passport.deserializeUser(async(id,done)=>{
    try {
        const user =await userModel.findOne({id})
        done(null,user)
    } catch (error) {
        done(null,false)
    }
  })

app.listen(port,async()=>{
    try{
        await connection
        console.log("db is connected")
        console.log("server is running at port "+port)
    }catch(error){
        console.log("Something went wrong..."+error)
    }
})