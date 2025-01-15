import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    course: null,
    courses: null,
    courseLoading: false,
    courseError: null,
    courseMessage: null,
    courseSuccess: false,
    createdCourses: null,
    enrolledCourses: null,
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
        },
        setCreatedCourses: (state, action) => {
            state.createdCourses = action.payload;
        },
        setEnrolledCourses: (state, action) => {
            state.enrolledCourses = action.payload;
        },
        addNewEnrolledCourse: (state, action) => {
            state.enrolledCourses.push(action.payload);
        },
        removeACourseFromEnrolled: (state, action) => {
            state.enrolledCourses = state.enrolledCourses.filter((course) => course._id !== action.payload._id);

        }

    }
})

export const {
    setCourse,
    setCourses,
    setCourseLoading,
    setCourseError,
    setCourseMessage,
    setCourseSuccess,
    setCreatedCourses,
    setEnrolledCourses,
    addNewEnrolledCourse,
    removeACourseFromEnrolled
} = courseSlice.actions;

export default courseSlice.reducer
