const { Router } = require('express');
const upload = require('../middleware/multer.middleware');
const { createNewCourse, addNewTopic, deleteCourse, deleteTopic, getAllCourses, enrolledNewCourse, getCreatedCourses, getEnrolledCourses, getCourseById, updateCourse, unenrolledCourse, markTopicAsCompleted } = require('../controllers/courses.controllers');
const { jwtVerify } = require('../middleware/auth.middleware');
const router = Router();

// Function to create dynamic upload fields for topics

router.get('/', jwtVerify, getAllCourses);
router.get('/created', jwtVerify, getCreatedCourses);
router.get('/enrolled', jwtVerify, getEnrolledCourses);
router.get('/:courseId', jwtVerify, getCourseById);

router.post('/create', jwtVerify, upload.any(), createNewCourse);
router.put('/update/:courseId', jwtVerify, upload.any(), updateCourse);
router.post("/topic/:courseId", jwtVerify, upload.single("content"), addNewTopic);

router.patch("/enroll/:courseId", jwtVerify, enrolledNewCourse);
router.patch("/unenroll/:courseId", jwtVerify, unenrolledCourse);
router.patch("/topic/complete/", jwtVerify, markTopicAsCompleted);


router.delete("/:courseId", jwtVerify, deleteCourse);
router.delete("/topic/:topicId", jwtVerify, deleteTopic);

module.exports = router;