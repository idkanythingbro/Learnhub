const {User} = require("../models/user.model");
const ApiError = require("../utils/ApiErrors");
const asyncHandler = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");

const jwtVerify = asyncHandler(async (req, _, next) => {
    if(req.user){
        // console.log("JWt=>",req.user);
        next();  
        return;
    }
    try {
      
        
        
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");     
        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
// console.log();

        if (!user) {
            throw new ApiError(401, "Invalid Access Token")
        }

        req.user = user;
        next()

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})

module.exports = { jwtVerify }