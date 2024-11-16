const express = require("express");
const app = express();
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler.middleware')
const cookieParser = require('cookie-parser')
const corsOption = {
    origin: true,
    credentials: true  // Accept cookies
}

app.use(cors(corsOption))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("uploads"))
app.use(cookieParser())



//routes import
const userRouter = require('./routes/users.routes');
const postRouter=require("./routes/post.route");
const courseRouter = require('./routes/course.routes');

//routes declaration
app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/courses', courseRouter)
// 
app.use(errorHandler)


module.exports = app