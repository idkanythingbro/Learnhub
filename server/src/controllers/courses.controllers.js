const e = require("express");
const { Course, Topic } = require("../models/course.model");
const { uploadFileToCloudinary, uploadLargeFileToCloudinary, deleteFromCloudinary } = require("../service/cloudinary.service");
const ApiError = require("../utils/ApiErrors");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const fs = require("fs");
const { User, OauthUser, UserDetails } = require("../models/user.model");
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

const createNewTopics = async (courseId, topics, files) => {
    // console.log("Topics",topics);

    // Create a map for quick file lookup by fieldname
    const fileMap = files.reduce((map, file) => {
        map[file.fieldname] = file;
        return map;
    }, {});

    // Prepare promises for creating topics
    const promises = topics.map(async (topic, index) => {
        const file = fileMap[topic];
        if (!file) {
            throw new ApiError(400, `File for topic "${topic}" not found`);
        }
        const url = await uploadFile(file, "video", "Course Contents");
        return Topic.create({
            course: courseId,
            topicNo: index + 1,
            topicName: topic,
            file: url
        });
    });

    // Wait for all promises to settle
    const results = await Promise.allSettled(promises);

    // Check for rejections and log them
    const errors = results.filter(result => result.status === 'rejected');
    if (errors.length > 0) {
        const errorMessages = errors.map(error => error.reason.message).join(", ");
        throw new ApiError(400, `Failed to create some topics: ${errorMessages}`);
    }

    return true;
};

const createNewCourse = asyncHandler(async (req, res) => {
    // console.log(req.body);
    const { courseName, description, prerequsite } = req.body;
    // const coursePrice = Number(req.body.coursePrice);

    const poster = req.files.find(file => file.fieldname === 'poster');
    const introVideo = req.files.find(file => file.fieldname === 'introVideo');

    const requiredFields = {
        courseName: "Course Name",
        description: "Course description",
        prerequsite: "Course Prerequsite",
    };

    for (const [field, message] of Object.entries(requiredFields)) {
        if (!req.body[field]) {
            deleteFiles(req.files);
            res.status(400);
            throw new ApiError(400, `${message} is required`);
        }
    }

    if (!poster) {
        deleteFiles(req.files);
        res.status(400);
        throw new ApiError(400, "Course poster is required");
    }

    if (poster.size > 2 * 1024 * 1024) { //NOTE - Give valid for file size
        deleteFiles(req.files);
        res.status(400);
        throw new ApiError(400, "Course poster must be less than 2MB");
    }

    const posterUrl = await uploadFile(poster, "", "Course Posters");

    let introVideoUrl = "";
    if (introVideo) {
        if (introVideo.mimetype.startsWith("video")) {
            if (introVideo.size > 20 * 1024 * 1024) { //NOTE - Give valid for file size 
                deleteFiles(req.files);
                res.status(400);
                throw new ApiError(400, "Intro video must be less than 20MB");
            }
            //NOTE - Give valid for file size 
            introVideoUrl = await uploadFile(introVideo, "video", "Promotional Videos");
            // console.log(promotionalVideoUrl);
        }
        else {
            deleteFiles(req.files);
            res.status(400);
            throw new ApiError(400, "Intro video must be a video file");
        }
    }

    // Create new course
    const newCourse = await Course.create({
        owner: req.user._id,
        ownerModel: req.user.oauthId ? "OauthUser" : "User",
        courseName,
        description,
        prerequsite,
        poster: posterUrl,
        introVideo: introVideoUrl
    });

    res.status(201).json(new ApiResponse(
        201,
        newCourse,
        "Course created successfully"));

})
//TODO - 
const updateCourse = asyncHandler(async (req, res) => {
    // console.log("update course");
    const { courseName, description, prerequsite, topics } = req.body;
    const courseId = req.params.courseId;
    const userId = req.user._id;
    const course = await Course.findOne({ _id: courseId, owner: userId });
    if (!course) {
        res.status(404);
        throw new ApiError(404, "Course not found");
    }
    const updatedCourse = {
        courseName: courseName || course.courseName,
        description: description || course.description,
        prerequsite: prerequsite || course.prerequsite,
    }
    const poster = req.files.find(file => file.fieldname === 'poster');
    const introVideo = req.files.find(file => file.fieldname === 'introVideo');
    if (poster) {
        if (poster.size > 2 * 1024 * 1024) {
            deleteFiles(req.files);
            res.status(400);
            throw new ApiError(400, "Course poster must be less than 2MB");
        }
        const posterUrl = await uploadFile(poster, "", "Course Posters");
        await deleteFromCloudinary(course.poster);
        updatedCourse.poster = posterUrl;
    }
    if (introVideo) {
        if (introVideo.mimetype.startsWith("video")) {
            if (introVideo.size > 20 * 1024 * 1024) {
                deleteFiles(req.files);
                res.status(400);
                throw new ApiError(400, "Intro video must be less than 20MB");
            }
            const introVideoUrl = await uploadFile(introVideo, "video", "Promotional Videos");
            await deleteFromCloudinary(course.introVideo, "video");
            updatedCourse.introVideo = introVideoUrl;
        } else {
            deleteFiles(req.files);
            res.status(400);
            throw new ApiError(400, "Intro video must be a video file");
        }
    }
    await Course.updateOne({
        _id: course._id
    }, updatedCourse);

    const result = await createNewTopics(course._id, topics, req.files);
    // console.log(result);
    res.status(200).json(new ApiResponse(
        200,
        {},
        "Course updated successfully"
    ));
})
//FIXME - 
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
//FIXME -  - Topic
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
//FIXME - 
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

const getAllCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find({}).populate({
        path: "owner",
        select: "name email"
    });
    // console.log(courses);

    res.status(200).json(new ApiResponse(
        200,
        courses,
        "All Courses"
    ))
})

const getCourseById = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    let course = await Course.findById(courseId).populate({
        path: "owner",
        select: "name email"
    });

    if (!course) {
        res.status(404);
        throw new ApiError(404, "Course not found");
    }

    const topics = await Topic.find({ course: courseId });
    topics.sort((a, b) => a.topicNo - b.topicNo);
    course = {
        ...course.toObject(), // Convert Mongoose document to plain object
        topics
    };

    res.status(200).json(new ApiResponse(
        200,
        course,
        "Course Details"
    ))

})

const getCreatedCourses = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const courses = await Course.find({ owner: userId });
    res.status(200).json(new ApiResponse(200, courses, "Created Courses"));
})

const enrolledNewCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    const userId = req.user._id;
    let user = null;
    if (req.user.oauthId) {
        user = await OauthUser.findById(userId);
    } else {
        user = await User.findById(userId);
    }
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const course = await Course.findById(courseId);
    if (!course) {
        throw new ApiError(404, "Course not found");
    }
    const userDetails = await UserDetails.findOne({ ownerId: userId });
    if (!userDetails) {
        throw new ApiError(404, "User details not found");
    }
    const isEnrolled = userDetails.enrolledCourses.find(
        (courseDetails) => courseDetails.course.toString() === courseId.toString()
    );
    if (isEnrolled) {
        throw new ApiError(400, "Course already enrolled");
    }
    userDetails.addCourse(courseId);


    // await userDetails.save();
    res.status(200)
        .json(new ApiResponse(200, { course }, "Course enrolled successfully"));
})


const unenrolledCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    const course = await Course.findById(courseId);
    if (!course) {
        throw new ApiError(404, "Course not found");
    }
    const userDetails = await UserDetails.findOne({ ownerId: userId });
    if (!userDetails) {
        throw new ApiError(404, "User details not found");
    }
    const isEnrolled = userDetails.enrolledCourses.find(
        (courseDetails) => courseDetails.course.toString() === courseId.toString()
    );
    if (!isEnrolled) {
        throw new ApiError(400, "Course not enrolled");
    }
    userDetails.enrolledCourses = userDetails.enrolledCourses.filter(
        (courseDetails) => courseDetails.course.toString() !== courseId.toString()
    );
    await userDetails.save();
    res
        .status(200)
        .json(new ApiResponse(200, { course }, "Course unenrolled successfully"));
})

const getEnrolledCourses = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const userDetails = await UserDetails.findOne({ ownerId: userId });
    if (!userDetails) {
        throw new ApiError(404, "User details not found");
    }
    const courseIds = userDetails.enrolledCourses.map(courseDetails => courseDetails.course);
    const courses = await Course.find({ _id: { $in: courseIds } });

    res.status(200).json(new ApiResponse(200, courses, "Enrolled courses"));
})

module.exports = {
    createNewCourse,
    addNewTopic,
    deleteCourse,
    deleteTopic,
    getAllCourses,
    getCourseById,
    getCreatedCourses,
    enrolledNewCourse,
    unenrolledCourse,
    getEnrolledCourses,
    updateCourse
}