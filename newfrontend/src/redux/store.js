import { configureStore } from "@reduxjs/toolkit";
import userReducer  from './reducer/auth.reducer'
import themeReducer from './reducer/mode.reducer'
import postReducer from "./reducer/post.reducer";
export const store =configureStore({
    reducer:{
            userReducer,
            themeReducer,
            postReducer
    }
})

