const e = require("express");
const { Course, Topic } = require("../models/course.model");
const { uploadFileToCloudinary, uploadLargeFileToCloudinary, deleteFromCloudinary } = require("../service/cloudinary.service");
const ApiError = require("../utils/ApiErrors");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const fs = require("fs");
const uploadFile = async (file, type = "auto", cloudinaryFolder = "") => {

    const url = await uploadFileToCloudinary(file.path, type, cloudinaryFolder);
    return url;
}

const deleteFiles = (files) => {
    if (!files) return;
    if (!Array.isArray(files)) files = [files];
    files.forEach(file => {
        const filePath = file.path;
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    });
};
//SECTION - Course
const createNewCourse = asyncHandler(async (req, res) => {
    // console.log(req.body);
    const { courseTitle, courseSubtitle, courseDescription, targetAudience, courseLevel, learningObjectives, courseRequirements, courseLanguage, instructorBio, courseCategory } = req.body;
    const coursePrice = Number(req.body.coursePrice);
    const topics = [];
    for (let i = 0; i < req.body.topics.length; i++) {
        const topic = Object.assign({}, req.body.topics[i]);
        topics.push(topic);
    }

    const coursePoster = req.files.find(file => file.fieldname === 'courseImage');
    const promotionalVideo = req.files.find(file => file.fieldname === 'promotionalVideo');

    // Handle topics file uploads
    const topicsFiles = req.files.filter(file => file.fieldname.startsWith('topics['));
    //Check course Required fields
    const requiredFields = {
        courseTitle: "Course title",
        courseDescription: "Course description",
        targetAudience: "Target audience",
        courseLevel: "Course level",
        learningObjectives: "Learning objectives",
        courseRequirements: "Course requirements",
        courseLanguage: "Course language",
        courseCategory: "Course category",
        topics: "Topics"
    };

    for (const [field, message] of Object.entries(requiredFields)) {
        if (!req.body[field]) {
            deleteFiles(req.files);
            res.status(400);
            throw new ApiError(400, `${message} is required`);
        }
    }

    if (!coursePoster) {
        deleteFiles(req.files);
        res.status(400);
        throw new ApiError(400, "Course poster is required");
    }

    //NOTE - Give validation for file size 

    //STUB - Check  topics are valid or not
    if (topics.length === 0) {
        deleteFiles(req.files);
        res.status(400);
        throw new ApiError(400, "Minimum 1 topics is required");
    }
    const topicRequiredFields = {
        topicName: "Topic name",
        topicDescription: "Topic description",
        contentType: "Content type"
    };
    topics.forEach((topic, index) => {
        for (const [field, message] of Object.entries(topicRequiredFields)) {
            if (!topic[field]) {
                deleteFiles(req.files);
                res.status(400);
                throw new ApiError(400, `${message} is required for each topic`);
            }
        }
        if (!topicsFiles[index]) {
            deleteFiles(req.files);
            res.status(400);
            throw new ApiError(400, `File is required for each topic`);
        }
    });

    const coursePosterUrl = await uploadFile(coursePoster, "", "Course Posters");

    let promotionalVideoUrl = "";
    if (promotionalVideo) {
        if (promotionalVideo.mimetype.startsWith("video")) {
            //NOTE - Give valid for file size 
            promotionalVideoUrl = await uploadFile(promotionalVideo, "video", "Promotional Videos");
            // console.log(promotionalVideoUrl);
        }
        else {
            deleteFiles(req.files);
            res.status(400);
            throw new ApiError(400, "Promotional video must be a video file");
        }
    }

    // Create new course
    const newCourse = await Course.create({
        ownerId: req.user._id, //REVIEW - 
        courseTitle,
        courseSubtitle,
        courseDescription,
        targetAudience,
        courseLevel: courseLevel.toLowerCase(),
        learningObjectives,
        courseRequirements,
        courseLanguage,
        instructorBio,
        coursePoster: coursePosterUrl,
        promotionalVideo: promotionalVideoUrl,
        coursePrice,
        courseCategory: courseCategory.toLowerCase(),
    });

    //STUB - Create new topics
    const newTopic = await Promise.all(
        topics.map(async (topic, index) => {
            try {
                if (!topicsFiles[index].mimetype.startsWith(topic.contentType.toLowerCase()) && !topicsFiles[index].mimetype.endsWith(topic.contentType.toLowerCase())) {
                    deleteFiles(topicsFiles[index]);
                    res.status(400);
                    throw new ApiError(400, `File type does not match the content type for topic ${index + 1}`);
                }
                const topicFileUrl = await uploadFile(topicsFiles[index], topic.contentType.toLowerCase() === "video" ? "video" : "auto", "Course Contents");
                // Return the result of Topic.create
                return await Topic.create({
                    courseId: newCourse._id,
                    ...topic,
                    contentFile: topicFileUrl
                });
            } catch (error) {
                console.log(error);
                throw error; //  throw the error to let Promise.all handle it
            }
        })
    );


    res.status(201).json(new ApiResponse(
        201,
        { newCourse, newTopic },
        "Course created successfully"));

})

const deleteCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    const userId = req.user._id;
    const course = await Course.findOne({ _id: courseId, ownerId: userId });
    if (!course) {
        res.status(404);
        throw new ApiError(404, "Course not found");
    }
    //NOTE - Delete image,videos and pdf from cloudinary
    const result = await deleteFromCloudinary(course.coursePoster);
    const topics = await Topic.find({ courseId: courseId });
    for (const topic of topics) {
        const result2 = await deleteFromCloudinary(topic.contentFile);
        // console.log(result2);
    }
    await Topic.deleteMany({ courseId: courseId });
    await Course.deleteOne({ _id: courseId });
    res.status(200).json(new ApiResponse(
        200,
        {},
        "Course successfully deleted"
    ));
})
//SECTION - Topic
const addNewTopic = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    //REVIEW - userId
    const userId = req.user._id;
    const course = await Course.findOne({ _id: courseId, ownerId: userId });
    if (!course) {
        res.status(404);
        throw new ApiError(404, "Course not found");
    }

    const { topicName, topicDescription, learningObjectives, prerequisites, contentType } = req.body;
    const content = req.file;
    // console.log(content);

    if (!topicName || !topicDescription || !contentType) {
        deleteFiles(content)
        res.status(400)
        throw new ApiError(400, "Topic not valid")
    }

    if (!content.mimetype.startsWith(contentType.toLowerCase()) && !content.mimetype.endsWith(contentType.toLowerCase())) {
        deleteFiles(content);
        res.status(400);
        throw new ApiError(400, `File type does not match the content type for topic ${index + 1}`);
    }
    const url = await uploadFile(content, contentType.toLowerCase() === "video" ? "video" : "auto", "Course Contents");
    // console.log(url);

    const topic = await Topic.create({
        courseId,
        topicName,
        topicDescription,
        learningObjectives,
        prerequisites,
        contentType,
        contentFile: url
    })
    res.status(200).json(new ApiResponse(
        200,
        { topic },
        "Topic Added success"
    ))
})

const deleteTopic = asyncHandler(async (req, res) => {
    const { topicId } = req.params;
    const userId = req.user._id;
    const topic = await Topic.findById(topicId);
    if (!topic) {
        res.status(404)
        throw new ApiError(404, "Topic founded");
    }
    const course = await Course.findOne({ _id: topic.courseId, ownerId: userId });
    if (!course) {
        res.status(400);
        throw new ApiError("Unauthorize")
    }
    //NOTE - Delete image,videos and pdf from cloudinary
    const result = await deleteFromCloudinary(topic.contentFile);
    // console.log(result);

    await Topic.deleteOne({ _id: topicId });
    res.status(200).json(new ApiResponse(
        200,
        {},
        "Topic Successfully deleted"
    ))
})

module.exports = {
    createNewCourse,
    addNewTopic,
    deleteCourse,
    deleteTopic
}