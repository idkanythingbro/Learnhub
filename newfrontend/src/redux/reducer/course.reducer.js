import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    course: null,
    courses: null,
    courseLoading: false,
    courseError: null,
    courseMessage: null,
    courseSuccess: false,
}
const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        setCourse: (state, action) => {
            state.course = action.payload;
        },
        setCourses: (state, action) => {
            state.courses = action.payload;
        },
        setCourseLoading: (state, action) => {
            state.courseLoading = action.payload;
        },
        setCourseError: (state, action) => {
            state.courseError = action.payload;
        },
        setCourseMessage: (state, action) => {
            state.courseMessage = action.payload;
        },
        setCourseSuccess: (state, action) => {
            state.courseSuccess = action.payload;
        }
    }
})

export const {setCourse, setCourses, setCourseLoading, setCourseError, setCourseMessage, setCourseSuccess} = courseSlice.actions;
export default courseSlice.reducer
