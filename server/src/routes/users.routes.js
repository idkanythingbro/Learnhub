const { Router } = require('express');
const router = Router();
const { registerUser,
    // activeAccount,
    sendOtpControllers,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getLoginUserDetails,
    getUserProfile,
    updatePassword,
    updateProfile,
    follow,
    unfollow,
    getLoggedInUserPost
} = require('../controllers/users.controllers');
const upload = require('../middleware/multer.middleware');
const { jwtVerify } = require('../middleware/auth.middleware');

router.get("/", jwtVerify, getLoggedInUserPost)
router.post('/register', upload.single("avatar"), registerUser);
// router.post('/active-account', activeAccount);
router.post("/sendOtp", sendOtpControllers);
router.post('/login', loginUser);
router.get('/logout', jwtVerify, logoutUser);
router.get("/refresh-access-token", refreshAccessToken)
router.get('/me', jwtVerify, getLoginUserDetails);
router.put("/update-password", updatePassword);
router.put("/update-profile", jwtVerify, upload.single("avatar"), updateProfile)
router.put("/follow", jwtVerify, follow);
router.put("/unfollow", jwtVerify, unfollow);
router.get("/:identifier", getUserProfile);



module.exports = router;