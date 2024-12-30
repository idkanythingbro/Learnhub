import { configureStore } from "@reduxjs/toolkit";
import userReducer  from './reducer/user.reducer'
import courseReducer from './reducer/course.reducer'
import themeReducer from './reducer/mode.reducer'
import postReducer from "./reducer/post.reducer";
export const store =configureStore({
    reducer:{
            userReducer,
            themeReducer,
            postReducer,
            courseReducer
    }
})

