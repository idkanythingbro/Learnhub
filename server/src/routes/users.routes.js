const { Router } = require('express');
const router = Router();
const { registerUser,
    // activeAccount,
    // sendOtpControllers,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getLoginUserDetails,
    getUserProfile,
    updatePassword,
    updateProfile,
    follow,
    unfollow,
    getLoggedInUserPost,
    sendPasswordResetMail
} = require('../controllers/users.controllers');
const upload = require('../middleware/multer.middleware');
const { jwtVerify } = require('../middleware/auth.middleware');
const ApiResponse = require('../utils/ApiResponse');

router.get("/", jwtVerify, getLoggedInUserPost)
router.post('/register', upload.single("avatar"), registerUser);

router.post('/login', loginUser);
// router.
router.get('/logout', jwtVerify, logoutUser);
router.get("/refresh-access-token", refreshAccessToken)
router.get('/me', jwtVerify, getLoginUserDetails);
router.put("/request-reset-password", sendPasswordResetMail);
router.put("/update-password", updatePassword);
router.put("/update-profile", jwtVerify, upload.single("avatar"), updateProfile)
router.put("/follow", jwtVerify, follow);
router.put("/unfollow", jwtVerify, unfollow);
router.get("/profile", jwtVerify, getUserProfile);

// TODO - Google login




module.exports = router;