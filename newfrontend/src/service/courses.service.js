import axios from "axios";
import { toast } from "react-toastify";
import {setCourseLoading, setCourses, setCourseSuccess} from "../redux/reducer/course.reducer";

const baseUrl = import.meta.env.VITE_SERVER_BASE_URL
export const createNewCourse = async (courseData) => {
    const tostId=toast.loading("Creating ...");
    try {
        // console.log(courseData);

        const formData = new FormData();
        formData.append('courseName', courseData.courseName);
        formData.append('description', courseData.description);
        formData.append('introVideo', courseData.introVideo[0]); // File object
        formData.append('poster', courseData.poster[0]); // File object
        formData.append('prerequsite', courseData.prerequsite);

        console.log("F", formData);

        const response = await axios.post(`${baseUrl}/courses/create`, formData, {
            withCredentials: true
        })

        toast.dismiss(tostId);
        toast.success("Course created successfully");
        // console.log("D", response.data);
    } catch (error) {
        toast.dismiss(tostId);
        console.log(error);

    }

};

export const getAllCourses =()=> async (dispatch) => {
    try {
        dispatch(setCourseLoading(true));
        const response = await axios.get(`${baseUrl}/courses`, {
            withCredentials: true
        });
        dispatch(setCourseLoading(false));
        dispatch(setCourses(response.data.data));
        dispatch(setCourseSuccess(true));
        

        // console.log(response.data.data);

        return response.data;

    } catch (error) {
        console.log(error);
    }
};