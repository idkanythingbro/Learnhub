import axios from "axios";

const baseUrl = import.meta.env.VITE_SERVER_BASE_URL
export const createNewCourse = async (courseData) => {
    try {
        console.log(courseData);

        const formData = new FormData();
        formData.append('courseTitle', courseData.courseTitle);
        formData.append('courseSubtitle', courseData.courseSubtitle);
        formData.append('courseDescription', courseData.courseDescription);
        formData.append('targetAudience', courseData.targetAudience);
        formData.append('courseLevel', courseData.courseLevel);
        formData.append('learningObjectives', courseData.learningObjectives);
        formData.append('courseRequirements', courseData.courseRequirements);
        formData.append('courseLanguage', courseData.courseLanguage);
        formData.append('instructorBio', courseData.instructorBio);
        formData.append('courseImage', courseData.courseImage); // File object
        formData.append('coursePrice', courseData.coursePrice);
        formData.append('promotionalVideo', courseData.promotionalVideo); // File object
        formData.append('courseCategory', courseData.courseCategory);
        
        courseData.topics.forEach((topic, index) => {
            formData.append(`topics[${index}][topicName]`, topic.topicName);
            formData.append(`topics[${index}][topicDescription]`, topic.topicDescription);
            formData.append(`topics[${index}][learningObjectives]`, topic.learningObjectives);
            formData.append(`topics[${index}][prerequisites]`, topic.prerequisites);
            formData.append(`topics[${index}][contentType]`, topic.contentType);
            formData.append(`topics[${index}][contentFile]`, topic.contentFile); // File object
        });
        
        console.log("F",formData);
        
        const response = await axios.post(`${baseUrl}/courses/create`, formData, {
            withCredentials: true
        })

        console.log("D",response.data);


    } catch (error) {
        console.log(error);

    }

};