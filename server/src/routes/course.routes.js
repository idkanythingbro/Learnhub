const { Router } = require('express');
const upload = require('../middleware/multer.middleware');
const { createNewCourse, addNewTopic, deleteCourse, deleteTopic } = require('../controllers/courses.controllers');
const { jwtVerify } = require('../middleware/auth.middleware');
const router = Router();

// Function to create dynamic upload fields for topics

router.get('/', (req, res) => {
    res.send('Course Route')
})
router.post('/create', jwtVerify, upload.any(), createNewCourse);
router.delete("/:courseId", jwtVerify, deleteCourse);
router.post("/topic/:courseId", jwtVerify, upload.single("content"), addNewTopic);
router.delete("/topic/:topicId", jwtVerify, deleteTopic);

module.exports = router;