import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    posts: [],
    loading: false,
    singlePost: null
}
const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        updatePost: (state, action) => {
            state.posts = action.payload
        },
        removeDeletedPost: (state, action) => {

            state.posts = state.posts.filter(post => post._id !== action.payload)
        },
        updatePostFeedback: (state, action) => {
            state.posts = state.posts.map(post => post._id === action.payload.post._id ? action.payload.post : post)
        },
        singlePostUpdate: (state, action) => {
            state.singlePost = action.payload.post
        },


    }
})
export const { updatePost, removeDeletedPost, updatePostFeedback, singlePostUpdate } = postSlice.actions
export default postSlice.reducer;