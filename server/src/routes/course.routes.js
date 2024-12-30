const { Router } = require('express');
const upload = require('../middleware/multer.middleware');
const { createNewCourse, addNewTopic, deleteCourse, deleteTopic, getAllCourses } = require('../controllers/courses.controllers');
const { jwtVerify } = require('../middleware/auth.middleware');
const router = Router();

// Function to create dynamic upload fields for topics

router.get('/', jwtVerify, getAllCourses);
router.post('/create', jwtVerify, upload.any(), createNewCourse);
router.delete("/:courseId", jwtVerify, deleteCourse);
router.post("/topic/:courseId", jwtVerify, upload.single("content"), addNewTopic);
router.delete("/topic/:topicId", jwtVerify, deleteTopic);

module.exports = router;