const express = require("express");
const app = express();
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler.middleware')
const cookieParser = require('cookie-parser')
require('dotenv').config()
//TODO - 
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require("./models/user.model");
const corsOption = {
    origin: true,
    credentials: true  // Accept cookies
}

app.use(cors(corsOption))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("uploads"))
app.use(cookieParser())

//TODO -
app.use(session({
    secret: 'anything',
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

// console.log(process.env.GOOGLE_CLIENT_ID);
// console.log(process.env.GOOGLE_CLIENT_SECRET);

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    scope: ['email', 'profile']
},
    async (request,accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile.email);
            // console.log("accessToken", accessToken);
            // console.log("refreshToken", refreshToken);
            const user=await User.findOne({email:profile.email})
            
            if(!user){
                let currentTime = Date.now().toString();
                let userName = profile.email.split('@')[0] + currentTime.substring(currentTime.length - 2);
                const newUser = new User({
                    name:profile.displayName,
                    userName:userName,
                    email:profile.email,
                    password:profile.id,
                    // organization:"N/A",
                    // phone:"N/A",
                    avatar:profile.picture,
                    // role:"user"
                })
                await newUser.save()
            }
            // console.log("user",user);
            return done(null, user)
        } catch (error) {
            return done(error, null)
        }
    }
))

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
});

// initial google ouath login
app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

app.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:3000/dashboard",
    failureRedirect:"http://localhost:3000/sign-in"
}))

// app.get("/users/me",async(req,res)=>{

//     console.log("Sucess",req.user);
//     if(req.user){
        
//         res.status(200).json({message:"user Login",user:req.user})
//     }else{
//         res.status(400).json({message:"Not Authorized"})
//     }
// })


//routes import
const userRouter = require('./routes/users.routes');
const postRouter = require("./routes/post.route");
const courseRouter = require('./routes/course.routes');
// const User = require("./models/user.model");

//routes declaration
app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/courses', courseRouter)
// 
app.use(errorHandler)


module.exports = app