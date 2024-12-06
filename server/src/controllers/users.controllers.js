// users.controllers.js

const ApiError = require("../utils/ApiErrors");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const { uploadFileToCloudinary, deleteFromCloudinary } = require("../service/cloudinary.service");
const User = require("../models/user.model");
const { isFileSizeValid, isEmailValid, isPhoneNumberValid, isPasswordValid, isGithubLinkValid, isLinkedinLinkValid, isTwitterLinkValid, isLinkValid } = require("../utils/validation");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const sendEmail = require("../service/email.service");
const { accessTokenCookieOption, refreshTokenCookieOption, accessTokenCookieName, refreshTokenCookieName } = require("../assets/constan");
const Post = require("../models/post.models");

// const cookieOption = {
//     httpOnly:true,
//     secure:true,
//     sameSite:"none",
//     expires: new Date(Date.now()+1000*60*60*24*3)
// }

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        if (!user) {
            throw new ApiError(404, "User not found")
        }
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken };


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

// const sendOtp = async (userId) => {
//     try {
//         const user = await User.findById(userId);
//         if (!user) {
//             throw new ApiError(404, "User not found")
//         }
//         const otp = await user.generateOtp();
//         if (!otp) {
//             throw new ApiError(500, "Failed to generate OTP")
//         }
//         const isSuccess = await sendEmail(
//             user.email,
//             "Email verification",
//             `Your OTP is ${otp}`,
//             `<h1>Your OTP is ${otp}</h1>`
//         );
//         if (!isSuccess) {
//             throw new ApiError(500, "Failed to send OTP")
//         }
//         return true;

//     } catch (error) {
//         throw new ApiError(500, "Something went wrong while sending OTP")
//     }

// }


// Register controller

const registerUser = asyncHandler(async (req, res) => {
    let { firstname, lastname, email, phone, company, password, confirmpassword } = req.body;
    if (
        !firstname || !lastname || !email || !phone || !company || !password
        || !isEmailValid(email) || !isPhoneNumberValid(phone)   // || !isPasswordValid(password)
    ) {
        throw new ApiError(400, "Invalid input");
    }
    if (password !== confirmpassword) {
        throw new ApiError(400, "Password and confirm password must be same")
    }
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
        throw new ApiError(400, "User already exists")
    }
    let currentTime = Date.now().toString();
    let userName = email.split('@')[0] + currentTime.substring(currentTime.length - 2);
    const user = await User.create(
        {
            firstName: firstname,
            lastName: lastname,
            userName,
            email,
            phone,
            company,
            password,
        });
    // await sendOtp(user._id);
    res.status(201).json(new ApiResponse(
        201,
        {
            id: user._id,
            userName: user.userName
        },
        "User registered successfully"
    ));
})

//Active account
// const activeAccount = asyncHandler(async (req, res) => {
//     const { email, otp } = req.body;
//     console.log(otp);

//     const user = await User.findOne({ email });
//     if (!user) {
//         throw new ApiError(404, "User not found")
//     }
//     if (user.isActive) {
//         throw new ApiError(400, "Account is already active")
//     }
//     const isOtpValid = await user.verifyOtp(otp);
//     if (!isOtpValid) {
//         throw new ApiError(400, "Invalid OTP")
//     }

//     user.isActive = true;
//     await user.save({
//         validateModifiedOnly: true
//     });
//     res.status(200).json(new ApiResponse(
//         200,
//         {
//             user: {
//                 _id: user._id,
//                 userName: user.userName
//             }

//         },
//         "Your account has been activated"
//     ));
// })

//Resend otp
// const sendOtpControllers = asyncHandler(async (req, res) => {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//         throw new ApiError(404, "User not found")
//     }
//     await sendOtp(user._id);
//     res.status(200).json(new ApiResponse(
//         200,
//         {},
//         "OTP has been resent to your registered email"
//     ));
// })

// Login controller
const loginUser = asyncHandler(async (req, res) => {
    // Add your code here
    const { email, userName, phone, password } = req.body
    console.log(email)
    if (!(email || userName || phone)) {
        throw new ApiError(400, "Invalid input")
    }

    const user = await User.findOne({
        $or: [{ userName }, { email }, { phone }]
    })
    if (!user) {
        throw new ApiError(404, "User not found")
    }
    // if (!user.isActive) {
    //     throw new ApiError(400, "Your account is not activated")
    // }
    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {
        throw new ApiError(401, "Invalid credentials")
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)
    // const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    return res.status(200)
        .cookie(accessTokenCookieName, accessToken, accessTokenCookieOption)
        .cookie(refreshTokenCookieName, refreshToken, refreshTokenCookieOption)
        .json(new ApiResponse(
            200,
            {
                accessToken,
                refreshToken
            },
            "User logged in successfully",
        ))

})

// Logout controller
const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        { new: true }
    )

    const cookieOption = {
        path: "/",
        sameSite: "none",
        secure: true
    }

    return res
        .status(200)
        .clearCookie(accessTokenCookieName, cookieOption)
        .clearCookie(refreshTokenCookieName, cookieOption)
        .json(new ApiResponse(200, {}, "User logged Out"))
})
//Refresh access token
const refreshAccessToken = asyncHandler(async (req, res) => {
    const requestRefreshToken = req.cookies.refreshToken;
    if (!requestRefreshToken) {
        throw new ApiError(400, "Refresh token not found")
    }
    const decodeToken = jwt.verify(requestRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decodeToken._id);
    if (!user) {
        throw new ApiError("Invalid refresh token")
    }
    if (user.refreshToken !== requestRefreshToken) {
        throw new ApiError(401, "Refresh token is expired or used");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
    // console.log(accessToken);

    res.status(200)
        .cookie(accessTokenCookieName, accessToken, accessTokenCookieOption)
        .cookie(refreshTokenCookieName, refreshToken, refreshTokenCookieOption)
        .json(new ApiResponse(
            200,
            { accessToken, refreshToken },
            "Access token successfully refresh"
        ))


})

//Gate login user details
const getLoginUserDetails = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.user._id).select("_id userName firstName lastName company userName email phone avatar bio");
    if (!user) {
        throw new ApiError(404, "User not found")
    }
    res.status(200).json(new ApiResponse(200, user, "User details fetched successfully"))
})
//Gate user profile
const getUserProfile = asyncHandler(async (req, res) => {
    const { identifier } = req.params;
    const user = await User.findOne({
        $or: [
            { userName: identifier },
            { _id: mongoose.isValidObjectId(identifier) ? identifier : null },
        ]
    }).select("-password -refreshToken");
    if (!user) {
        throw new ApiError(404, "User not found")
    }
    res.status(200).json(new ApiResponse(200, user, "User details fetched successfully"))
})

//Update password
const updatePassword = asyncHandler(async (req, res) => {
    const { userId, userName, email, newPassword, oldPassword, otp } = req.body;
    console.log("ch");
    if (!isPasswordValid(newPassword) || !(userId || userName || email)) {
        throw new ApiError(400, "Invalid Input")
    }
    const user = await User.findOne({
        $or: [
            { _id: mongoose.isValidObjectId(userId) ? userId : null },
            { userName },
            { email }
        ]
    });
    if (!user) {
        throw new ApiError(404, "User not found")
    }
    let isPasswordChange = false;
    if (oldPassword) {
        const isMatch = await user.isPasswordCorrect(oldPassword);
        if (!isMatch) {
            throw new ApiError(401, "Invalid credentials")
        }
        isPasswordChange = true;
    }
    else if (otp) {
        isPasswordChange = user.verifyOtp(otp);
    }
    if (!isPasswordChange) {
        throw new ApiError(401, "Invalid credential")
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json(new ApiResponse(200, {}, "Password updated successfully"))
})

//Update profile
const updateProfile = asyncHandler(async (req, res) => {
    const {
        name,
        phoneNumber,
        bio,
        experience,
        collage,
        location,
        githubUrl,
        linkedinUrl,
        twitterUrl,
        websiteUrl
    } = req.body;
    const userId = req.user._id;
    let localFilePath = null;
    if (req.file) {
        const file = req.file;
        // console.log(file);
        localFilePath = file.path;
        if (!isFileSizeValid(file.size, process.env.PROFILE_PHOTO_MAXIMUM_SIZE)) {
            fs.unlinkSync(localFilePath);
            throw new ApiError(400, `File size must be under ${process.env.PROFILE_PHOTO_MAXIMUM_SIZE}`)
        }
    }
    if (!userId) {
        if (localFilePath) {
            fs.unlinkSync(localFilePath);
        }
        throw new ApiError(400, "Invalid request")
    }
    const user = await User.findOne({
        _id: userId,
        isActive: true
    }).select("-password -refreshToken");
    if (!user) {
        if (localFilePath) {
            fs.unlinkSync(localFilePath);
        }
        throw new ApiError(404, "User not found")
    }

    if (localFilePath) {
        const oldAvatar = user.avatar;
        user.avatar = await uploadFileToCloudinary(localFilePath, "auto", "Profile photo");
        if (oldAvatar) {
            await deleteFromCloudinary(oldAvatar);
        }
    }
    if (name) user.name = name;
    if (phoneNumber && isPhoneNumberValid(phoneNumber)) user.phoneNumber = phoneNumber;
    if (bio) user.bio = bio;
    if (experience) user.experience = experience;
    if (collage) user.collage = collage;
    if (location) user.location = location;

    if (githubUrl && isGithubLinkValid(githubUrl)) user.socialLinks.github = githubUrl;
    if (linkedinUrl && isLinkedinLinkValid(linkedinUrl)) user.socialLinks.linkedin = linkedinUrl;
    if (twitterUrl && isTwitterLinkValid(twitterUrl)) user.socialLinks.twitter = twitterUrl;
    if (websiteUrl && isLinkValid(websiteUrl)) user.socialLinks.website = websiteUrl;


    await user.save({ validateModifiedOnly: true });
    res.status(200).json(new ApiResponse(200, user, "Profile updated successfully"));

})

//Follow
const follow = asyncHandler(async (req, res) => {
    const { userId, userName } = req.body;
    if (!userId && !userName) {
        throw new ApiError(400, "Invalid request")
    }

    const followingUser = await User.findById(req.user?.id);
    if (!followingUser) {
        throw new ApiError(404, "Following user not found")
    }

    const followUser = await User.findOne({
        $or: [
            { _id: mongoose.isValidObjectId(userId) ? userId : null },
            { userName }
        ],
        isActive: true
    });
    if (!followUser) {
        throw new ApiError(404, "Follow user not found")
    }

    if (followingUser._id.toString() === followUser._id.toString()) {
        throw new ApiError(400, "You can't follow yourself")
    }

    //TODO - Handel if user already follow
    followingUser.following.push({
        id: followUser._id,
        userName: followUser.userName
    });
    await followingUser.save({ validateModifiedOnly: true });
    followUser.followers.push({
        id: followingUser._id,
        userName: followingUser.userName
    });
    await followUser.save({ validateModifiedOnly: true });
    res.status(200).json(new ApiResponse(200, {}, "Flowers added successfully"))
})

//Unfollow
const unfollow = asyncHandler(async (req, res) => {
    const { userId, userName } = req.body;
    if (!userId && !userName) {
        throw new ApiError(400, "Invalid request")
    }
    const followingUser = await User.findById(req.user?.id);
    if (!followingUser) {
        throw new ApiError(404, "Following user not found")
    }
    const followUser = await User.findOne({
        $or: [
            { _id: mongoose.isValidObjectId(userId) ? userId : null },
            { userName }
        ],
        isActive: true
    });
    if (!followUser) {
        throw new ApiError(404, "Follow user not found")
    }

    //TODO - Handel if user already follow
    followingUser.following = followingUser.following.filter(follow => follow.id.toString() !== followUser._id.toString());
    await followingUser.save({ validateModifiedOnly: true });
    followUser.followers = followUser.followers.filter(follower => follower.id.toString() !== followingUser._id.toString());
    await followUser.save({ validateModifiedOnly: true });
    res.status(200).json(new ApiResponse(200, {}, "Flowers removed successfully"))
})

//Gate post
const getLoggedInUserPost = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    if (!userId) {
        throw new ApiError(400, "Invalid request");
    }
    const posts = await Post.find({
        $or: [
            { ownerId: userId },
            { share: userId }

        ]
    }).sort({ createdAt: -1 })
    res.status(200).json(new ApiResponse(200, posts, "Posts fetched successfully"))
})




module.exports = {
    registerUser,
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
    getLoggedInUserPost
};