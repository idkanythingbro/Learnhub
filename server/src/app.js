const express = require("express");
const app = express();
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler.middleware')
const cookieParser = require('cookie-parser')

require('dotenv').config()
//TODO - 
const { GoogleUser, UserDetails } = require('./models/user.model')
const express_session = require('express-session');
const passport = require('passport');
const OAuth2Strategy = require("passport-google-oauth2").Strategy;


app.use(express_session({
    secret: "ghhhuy122",
    resave: false,
    saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());

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

passport.use(new OAuth2Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    scope: ['profile', 'email']
},
    async (accessToken, refreshToken, profile, done) => {
        //  done(null, profile);
        try {
            // return done(null, profile);
            let user = await GoogleUser.findOne({ googleId: profile.id });

            if (!user) {
                let currentTime = Date.now().toString();
                let userName = profile.email.split('@')[0] + currentTime.substring(currentTime.length - 2);
                user = await GoogleUser.create({
                    googleId: profile.id,
                    email: profile.email,
                    name: profile.displayName,
                    avatar: profile.picture,
                })
                const userDetails = await UserDetails.create({
                    ownerId: user._id,
                    userName: userName,
                })
            }
            // console.log("user",user);
            done(null, user)
        } catch (error) {
            return done(error, null)
        }
    }
))

passport.serializeUser((user, done) => {
    // console.log("user => ",user._id);
    // ("user",user);
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        // console.log("DeserializeUser called with ID:", id);
        const user = await GoogleUser.findById(id); // Fetch user from database
        done(null, user);
    } catch (error) {
        return done(error, null);
    }
});


// initial google ouath login
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: "http://localhost:3000/dashboard",
    failureRedirect: "http://localhost:3000/sign-in"
}))


//routes import
const userRouter = require('./routes/users.routes');
const postRouter = require("./routes/post.route");
const courseRouter = require('./routes/course.routes');
const ApiResponse = require("./utils/ApiResponse");
//routes declaration
app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/courses', courseRouter)
// 
app.use(errorHandler)


module.exports = app