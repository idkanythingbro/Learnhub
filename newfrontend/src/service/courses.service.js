import axios from "axios";
import { toast } from "react-toastify";
import { setCourseLoading, setCourses, setCourseSuccess, setCreatedCourses, setEnrolledCourses } from "../redux/reducer/course.reducer";
import { errorToast } from "../utils/errorToast";
const baseUrl = import.meta.env.VITE_SERVER_BASE_URL
export const createNewCourse = async (courseData) => {
    const tostId = toast.loading("Creating ...");
    try {
        // console.log(courseData);

        const formData = new FormData();
        formData.append('courseName', courseData.courseName);
        formData.append('description', courseData.description);
        formData.append('introVideo', courseData.introVideo[0]); // File object
        formData.append('poster', courseData.poster[0]); // File object
        formData.append('prerequsite', courseData.prerequsite);

        // console.log("F", formData);

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

export const getAllCourses = () => async (dispatch) => {
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

export const enrollCourse = async (courseId) => {
    try {
        const response = await axios.patch(`${baseUrl}/courses/enroll/${courseId}`, {}, {
            withCredentials: true
        });

        console.log(response.data);
        return response.data.success;

    } catch (error) {
        // console.log(error);
        errorToast(error);
        return false
    }
}

export const getCreatedCourses = () => async (dispatch) => {
    try {
        const response = await axios.get(`${baseUrl}/courses/created`, {
            withCredentials: true
        });
        // console.log("Created",response.data.data);
        dispatch(setCreatedCourses(response.data.data));
        return response.data.data;

    } catch (error) {
        console.log(error);
    }
}

export const getEnrolledCourses = () => async (dispatch) => {
    try {
        const response = await axios.get(`${baseUrl}/courses/enrolled`, {
            withCredentials: true
        });

        // console.log("Enrolled", response.data.data);
        dispatch(setEnrolledCourses(response.data.data));
        return response.data.success;

    } catch (error) {
        console.log(error);
        return false
    }
}