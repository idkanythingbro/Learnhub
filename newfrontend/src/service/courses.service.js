import axios from "axios";
import { toast } from "react-toastify";
import { addNewEnrolledCourse, removeACourseFromEnrolled, setCourseLoading, setCourses, setCourseSuccess, setCreatedCourses, setEnrolledCourses } from "../redux/reducer/course.reducer";
import { errorToast } from "../utils/errorToast";
const baseUrl = import.meta.env.VITE_SERVER_BASE_URL
export const createNewCourse = async (courseData) => {
    const tostId = toast.loading("Creating ...");
    try {

        const formData = new FormData();
        formData.append('courseName', courseData.courseName);
        formData.append('description', courseData.description);
        formData.append('introVideo', courseData.introVideo[0]); // File object
        formData.append('poster', courseData.poster[0]); // File object
        formData.append('prerequsite', courseData.prerequsite);


        const response = await axios.post(`${baseUrl}/courses/create`, formData, {
            withCredentials: true
        })

        toast.dismiss(tostId);
        toast.success("Course created successfully");
    } catch (error) {
        toast.dismiss(tostId);

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



        return response.data;

    } catch (error) {
        errorToast(error);
        // console.log(error);
    }
};

export const getCourseById = async (courseId) => {
    try {
        const response = await axios.get(`${baseUrl}/courses/${courseId}`, {
            withCredentials: true
        });

        return response.data.data;

    } catch (error) {
        errorToast(error);
        // console.log(error);
        return null;
    }
}

export const enrollCourse = (courseId) => async (dispatch) => {
    try {
        const response = await axios.patch(`${baseUrl}/courses/enroll/${courseId}`, {}, {
            withCredentials: true
        });

        if (response.data.success) {
            dispatch(addNewEnrolledCourse(response.data.data.course));

        }

    } catch (error) {
        // console.log(error);
        errorToast(error);
        return false
    }
}

export const unenrollCourse = (courseId) => async (dispatch) => {
    try {
        const response = await axios.patch(`${baseUrl}/courses/unenroll/${courseId}`, {}, {
            withCredentials: true
        });

        if (response.data.success) {
            dispatch(removeACourseFromEnrolled(response.data.data.course));

        }

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
        dispatch(setCreatedCourses(response.data.data));
        return response.data.data;

    } catch (error) {
        errorToast(error);
        // console.log(error);
    }
}

export const getEnrolledCourses = () => async (dispatch) => {
    try {
        const response = await axios.get(`${baseUrl}/courses/enrolled`, {
            withCredentials: true
        });

        dispatch(setEnrolledCourses(response.data.data));
        return response.data.success;

    } catch (error) {
        errorToast(error);
        // console.log(error);
        return false
    }
}

export const updateCourse = async (courseId, courseData) => {
    const tostId = toast.loading("Updating ...");
    try {

        const formData = new FormData();
        formData.append('courseName', courseData.courseName);
        formData.append('description', courseData.description);
        formData.append('introVideo', courseData.introVideo[0]); // File object
        formData.append('poster', courseData.poster[0]); // File object
        formData.append('prerequsite', courseData.prerequsite);

        // Topic
        courseData.videos?.forEach((topic, index) => {
            if (!(topic._id)) {
                formData.append('topics', topic.name);
                formData.append(`${topic.name}`, topic.file);
            }

        });


        const response = await axios.put(`${baseUrl}/courses/update/${courseId}`, formData, {
            withCredentials: true
        })

        toast.dismiss(tostId);
        toast.success("Course updated successfully");
        return response.data.success;
        // console.log("D", response.data);
    } catch (error) {
        toast.dismiss(tostId);
        // console.log(error);
        return false;
    }
}

export const updateTopic = async (topicId, topicName) => {
    const tostId = toast.loading("Updating ...");
    try {

        const response = await axios.put(`${baseUrl}/courses/topic/${topicId}`, { topicName }, {
            withCredentials: true
        })

        toast.dismiss(tostId);
        toast.success("Topic updated successfully");
        return response.data.success;
    } catch (error) {
        toast.dismiss(tostId);
        // console.log(error);
        return false;
    }
}

export const deleteTopic = async (topicId) => {
    const tostId = toast.loading("Deleting ...");
    try {
        const response = await axios.delete(`${baseUrl}/courses/topic/${topicId}`, {
            withCredentials: true
        });

        toast.dismiss(tostId);
        toast.success("Course deleted successfully");
        return response.data.success;
    } catch (error) {
        toast.dismiss(tostId);
        // console.log(error);
        return false;

    }
}

export const markTopicAsCompleted = async (courseId, topicId) => {
    const tostId = toast.loading("Completing ...");
    try {
        const response = await axios.patch(`${baseUrl}/courses/topic/complete/`, { courseId, topicId }, {
            withCredentials: true
        });

        toast.dismiss(tostId);
        toast.success("Topic completed successfully");
        return response.data.success;
    } catch (error) {
        toast.dismiss(tostId);
        // console.log(error);
        return false;

    }
}


export const updateCompletedCourses = async (courseId) => {
    try {
        console.log("C", courseId);
        
        const response = await axios.patch(`${baseUrl}/courses/complete/${courseId}`, {}, {
            withCredentials: true
        });

        return response.data.success;
    } catch (error) {
        console.log(error);
        return false;

    }
}

export const likeCourse = async (courseId) => {
    try {
        const response = await axios.patch(`${baseUrl}/courses/like/${courseId}`, {}, {
            withCredentials: true
        });

        return response.data.success;
    } catch (error) {
        console.log(error);
        return false;

    }
}

export const deleteCourse =  (courseId)=>async(dispatch) => {
    const tostId = toast.loading("Deleting ...");
    try {
        const response = await axios.delete(`${baseUrl}/courses/${courseId}`, {
            withCredentials: true
        });

       if (response.data.success) {
           dispatch(getCreatedCourses());
           toast.dismiss(tostId);
           toast.success("Course deleted successfully");
        
       }
    } catch (error) {
        toast.dismiss(tostId);
        errorToast(error);
        // console.log(error);
        return false;

    }
}