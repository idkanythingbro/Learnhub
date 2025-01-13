// users.controllers.js

const ApiError = require("../utils/ApiErrors");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const {
  uploadFileToCloudinary,
  deleteFromCloudinary,
} = require("../service/cloudinary.service");
const { User, UserDetails, OauthUser } = require("../models/user.model");
const {
  isFileSizeValid,
  isEmailValid,
  isPhoneNumberValid,
  isPasswordValid,
} = require("../utils/validation");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const sendEmail = require("../service/email.service");
const {
  accessTokenCookieOption,
  refreshTokenCookieOption,
  accessTokenCookieName,
  refreshTokenCookieName,
  passwordResetMailHtml,
} = require("../assets/constan");
const Post = require("../models/post.models");




const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

const generateResetToken = (email) => {
  const payload = { email };
  return jwt.sign(payload, process.env.PASSWORD_RESET_TOKEN_SECRET, { expiresIn: "1h" });
};

const registerUser = asyncHandler(async (req, res) => {
  let {
    firstname,
    lastname,
    email,
    phone,
    organization,
    password,
    confirmpassword,
  } = req.body;

  // console.log(
  //   firstname,
  //   lastname,
  //   email,
  //   phone,
  //   organization,
  //   password,
  //   confirmpassword
  // );
  if (
    !firstname ||
    !lastname ||
    !email ||
    !phone ||
    !organization ||
    !password ||
    !isEmailValid(email) ||
    !isPhoneNumberValid(phone) // || !isPasswordValid(password)
  ) {
    throw new ApiError(400, "Invalid input");
  }
  if (password !== confirmpassword) {
    throw new ApiError(400, "Password and confirm password must be same");
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  let currentTime = Date.now().toString();
  let userName =
    email.split("@")[0] + currentTime.substring(currentTime.length - 2);
  // console.log(userName);
  const user = await User.create({
    name: `${firstname} ${lastname}`,
    email,
    password,
  });
  // console.log(userName);

  const userDetails = await UserDetails.create({
    ownerId: user._id,
    phone,
    organization,
    userName,
  });

  res.status(201).json(
    new ApiResponse(
      201,
      {
        id: user._id,
        userName: userDetails.userName,
      },
      "User registered successfully"
    )
  );
});

// Login controller
const loginUser = asyncHandler(async (req, res) => {
  // Add your code here
  const { email, password } = req.body;
  if (!(email && password)) {
    throw new ApiError(400, "Invalid input");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const isMatch = await user.isPasswordCorrect(password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  return res
    .status(200)
    .cookie(accessTokenCookieName, accessToken, accessTokenCookieOption)
    .cookie(refreshTokenCookieName, refreshToken, refreshTokenCookieOption)
    .json(
      new ApiResponse(
        200,
        {
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

// Logout controller
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    { new: true }
  );

  const cookieOption = {
    path: "/",
    sameSite: "none",
    secure: true,
  };

  return res
    .status(200)
    .clearCookie(accessTokenCookieName, cookieOption)
    .clearCookie(refreshTokenCookieName, cookieOption)
    .clearCookie("connect.sid", cookieOption)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

//Refresh access token
const refreshAccessToken = asyncHandler(async (req, res) => {
  const requestRefreshToken = req.cookies.refreshToken;
  if (!requestRefreshToken) {
    throw new ApiError(400, "Refresh token not found");
  }
  const decodeToken = jwt.verify(
    requestRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );
  const user = await User.findById(decodeToken._id);
  if (!user) {
    throw new ApiError("Invalid refresh token");
  }
  if (user.refreshToken !== requestRefreshToken) {
    throw new ApiError(401, "Refresh token is expired or used");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );
  // console.log(accessToken);

  res
    .status(200)
    .cookie(accessTokenCookieName, accessToken, accessTokenCookieOption)
    .cookie(refreshTokenCookieName, refreshToken, refreshTokenCookieOption)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken },
        "Access token successfully refresh"
      )
    );
});

//Gate login user details
const getLoginUserDetails = asyncHandler(async (req, res) => {
  let user = req.user;
  // console.log(user);

  if (!user) {
    throw new ApiError(404, "User not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, user, "User details fetched successfully"));
});

//Gate user profile
const getUserProfile = asyncHandler(async (req, res) => {
  // const { identifier } = req.params;
  let user = req.user;
  // console.log(user);

  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const userDetails = await UserDetails.findOne({ ownerId: user._id });
  if (!userDetails) {
    throw new ApiError(404, "User details not found");
  }
  const userProfile = {
    ...user.toObject(),
    ...userDetails.toObject(),
  };
  res
    .status(200)
    .json(
      new ApiResponse(200, userProfile, "User details fetched successfully")
    );
});

//Send mail for reset password
const sendPasswordResetMail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  // console.log(email);

  if (!email || !isEmailValid(email)) {
    throw new ApiError(400, "Invalid email");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  //Genaret Password reset token
  const resetToken = generateResetToken(email);
  const resetUrl = `${process.env.CLIENT_BASE_URL}/reset-password?token=${resetToken}`;
  //Send mail
  const subject = "Reset Password";

  const html = passwordResetMailHtml(resetUrl);

  const success = await sendEmail(email, subject, "", html);
  if (!success) {
    throw new ApiError(500, "Failed to send email");

  }
  res.status(200).json(new ApiResponse(200, {}, "Password reset mail sent on registered email"));

});

//Reset password
const restPassword = asyncHandler(async (req, res) => {
  const { password, confirmPassword } = req.body;
  const token = req.query.token;
  // console.log(token);

  if (!token) {
    throw new ApiError(400, "Invalid request");
  }
  if (!password || !confirmPassword) {
    throw new ApiError(400, "Password is required");
  }
  if (password !== confirmPassword) {
    throw new ApiError(400, "Password and confirm password must be same");
  }

  let decodeToken = {};
  try {
    decodeToken = jwt.verify(token, process.env.PASSWORD_RESET_TOKEN_SECRET);
  } catch (error) {
    throw new ApiError(400, "Invalid token");
  }

  const user = await User.findOne({ email: decodeToken.email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  user.password = password;
  await user.save({ validateBeforeSave: true });


  res.status(200).json(new ApiResponse(200, {}, "Password updated successfully"));
});

//Update profile
const updateProfile = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const {
    name,
    organization,
    phone,
    email,
    description,
    location,
    designation,
  } = req.body;

  //NOTE - check if user is logged in
  const userId = req.user._id;
  if (!userId) {
    if (localFilePath) {
      fs.unlinkSync(localFilePath);
    }
    throw new ApiError(400, "Invalid request");
  }
  //NOTE - Check if designation is valid
  if (designation) {
    designation = designation.toLowerCase();
    const designationList = ["student", "teacher"];
    if (!designationList.includes(designation)) {
      if (localFilePath) {
        fs.unlinkSync(localFilePath);
        throw new ApiError(400, "Invalid designation");
      }
    }
  }

  //NOTE - Check if file is valid
  let localFilePath = null;
  if (req.file) {
    const file = req.file;
    // console.log(file);
    localFilePath = file.path;
    if (!isFileSizeValid(file.size, process.env.PROFILE_PHOTO_MAXIMUM_SIZE)) {
      fs.unlinkSync(localFilePath);
      throw new ApiError(
        400,
        `File size must be under ${process.env.PROFILE_PHOTO_MAXIMUM_SIZE}`
      );
    }
  }

  //NOTE - get user details
  let user = null;
  if (req.user.oauthId) {
    user = await OauthUser.findById(req.user._id).select(
      "_id name email avatar"
    );
  } else {
    user = await User.findById(req.user._id).select("_id name email avatar");
  }

  if (!user) {
    if (localFilePath) {
      fs.unlinkSync(localFilePath);
    }
    throw new ApiError(404, "User not found");
  }
  const userDetails = await UserDetails.findOne({ ownerId: userId });
  if (!userDetails) {
    if (localFilePath) {
      fs.unlinkSync(localFilePath);
    }
    throw new ApiError(500, "User not found");
  }

  //NOTE - Update user profile
  if (localFilePath) {
    const oldAvatar = user.avatar;
    user.avatar = await uploadFileToCloudinary(
      localFilePath,
      "auto",
      "Profile photo"
    );
    if (oldAvatar) {
      await deleteFromCloudinary(oldAvatar);
    }
  }

  if (name) user.name = name;
  if (email && isEmailValid(email)) user.email = email;
  if (phone && isPhoneNumberValid(phone)) userDetails.phone = phone;
  if (description) userDetails.description = description;
  if (organization) userDetails.organization = organization;
  if (location) userDetails.location = location;
  if (designation) userDetails.designation = designation;
  await user.save({ validateModifiedOnly: true });
  await userDetails.save({ validateModifiedOnly: true });
  const userProfile = {
    ...user.toObject(),
    ...userDetails.toObject(),
  };
  res
    .status(200)
    .json(new ApiResponse(200, userProfile, "Profile updated successfully"));
});

//FIXME - 
const follow = asyncHandler(async (req, res) => {
  const { userId, userName } = req.body;
  if (!userId && !userName) {
    throw new ApiError(400, "Invalid request");
  }

  const followingUser = await User.findById(req.user?.id);
  if (!followingUser) {
    throw new ApiError(404, "Following user not found");
  }

  const followUser = await User.findOne({
    $or: [
      { _id: mongoose.isValidObjectId(userId) ? userId : null },
      { userName },
    ],
    isActive: true,
  });
  if (!followUser) {
    throw new ApiError(404, "Follow user not found");
  }

  if (followingUser._id.toString() === followUser._id.toString()) {
    throw new ApiError(400, "You can't follow yourself");
  }

  //TODO - Handel if user already follow
  followingUser.following.push({
    id: followUser._id,
    userName: followUser.userName,
  });
  await followingUser.save({ validateModifiedOnly: true });
  followUser.followers.push({
    id: followingUser._id,
    userName: followingUser.userName,
  });
  await followUser.save({ validateModifiedOnly: true });
  res.status(200).json(new ApiResponse(200, {}, "Flowers added successfully"));
});

//FIXME - 
const unfollow = asyncHandler(async (req, res) => {
  const { userId, userName } = req.body;
  if (!userId && !userName) {
    throw new ApiError(400, "Invalid request");
  }
  const followingUser = await User.findById(req.user?.id);
  if (!followingUser) {
    throw new ApiError(404, "Following user not found");
  }
  const followUser = await User.findOne({
    $or: [
      { _id: mongoose.isValidObjectId(userId) ? userId : null },
      { userName },
    ],
    isActive: true,
  });
  if (!followUser) {
    throw new ApiError(404, "Follow user not found");
  }

  //TODO - Handel if user already follow
  followingUser.following = followingUser.following.filter(
    (follow) => follow.id.toString() !== followUser._id.toString()
  );
  await followingUser.save({ validateModifiedOnly: true });
  followUser.followers = followUser.followers.filter(
    (follower) => follower.id.toString() !== followingUser._id.toString()
  );
  await followUser.save({ validateModifiedOnly: true });
  res
    .status(200)
    .json(new ApiResponse(200, {}, "Flowers removed successfully"));
});

//Gate post
//FIXME - 
const getLoggedInUserPost = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    throw new ApiError(400, "Invalid request");
  }
  const posts = await Post.find({
    $or: [{ ownerId: userId }, { share: userId }],
  }).sort({ createdAt: -1 });
  res
    .status(200)
    .json(new ApiResponse(200, posts, "Posts fetched successfully"));
});




module.exports = {
  registerUser,
  // activeAccount,
  // sendOtpControllers,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getLoginUserDetails,
  getUserProfile,
  sendPasswordResetMail,
  restPassword,
  updateProfile,
  follow,
  unfollow,
  getLoggedInUserPost,
};
