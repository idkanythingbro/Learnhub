import axios from "axios";

const baseUrl = import.meta.env.VITE_SERVER_BASE_URL
export const createNewCourse = async (courseData) => {
    try {
        console.log(courseData);

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

        console.log("D", response.data);


    } catch (error) {
        console.log(error);

    }

};

export const getAllCourses = async () => {
    try {
        const response = await axios.get(`${baseUrl}/courses`, {
            withCredentials: true
        });
        console.log(response.data.data);

        return response.data;

    } catch (error) {
        console.log(error);
    }
};