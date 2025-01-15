const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isEmailValid, isPhoneNumberValid, isPasswordValid } = require("../utils/validation");
const generateOtp = require("../utils/generatOtp");
const Otp = require("./otp.models");
const { Topic } = require("./course.model");
const userDetailsSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    phone: {
        type: String,
        trim: true,
        validate: {
            validator: isPhoneNumberValid,
            message: props => `${props.value} is not a valid phone number!`
        },
        default: "N/A"
    },
    organization: {
        type: String,
        trim: true,
        default: "N/A"
    },
    description: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        default: ""
    },
    designation: {
        type: String,
        enum: ["student", "teacher"],
        default: "student"
    },
    enrolledCourses: {
        type: [{
            course: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course",
                required: true
            },
            completedTopic: {
                type: [mongoose.Schema.Types.ObjectId],
                default: []
            },
            totalTopic: {
                type: Number,
                default: 0
            }
        }],
        ref: "Course",
        default: []
    },
    completedCourses: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Course",
        default: []
    },
})

const userSchema = new mongoose.Schema({
    // firstName: {
    //     type: String,
    //     required: true,
    //     trim: true,
    // },
    // lastName: {
    //     type: String,
    //     required: true,
    //     trim: true,
    // },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: isEmailValid,
            message: props => `${props.value} is not a valid email number!`
        },
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [4, "Password must be at least 4 characters long"],
    },
    avatar: {
        type: String, // cloudinary url
        default: null
    },
    refreshToken: {
        type: String,
        default: null
    },
}, {
    timestamps: true
})

// userSchema.add(userDetailsSchema);
const OauthUserSchema = new mongoose.Schema({
    oauthId: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        validate: {
            validator: isEmailValid,
            message: props => `${props.value} is not a valid email number!`
        },
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    avatar: {
        type: String, //google avatar
        default: null
    },
    refreshToken: {
        type: String,
        default: null
    },
}, {
    timestamps: true
})

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = bcrypt.hashSync(this.password, 10);
    }
    next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return bcrypt.compareSync(password, this.password);
}

userSchema.methods.generateOtp = async function (digit = 4) {
    let otp = generateOtp(digit);
    let savedOtpDetails = await Otp.create({
        otp
    })
    this.otpId = savedOtpDetails._id;
    await this.save({ validateBeforeSave: false });
    return otp;

}

userSchema.methods.verifyOtp = async function (otp) {
    let otpDetails = await Otp.findById(this.otpId);
    if (!otpDetails) {
        throw new Error("Otp expired");
    }
    // if (otpDetails.isVerified) {
    //     throw new Error("Otp already verified");
    // }
    if (otpDetails.otp !== otp) {
        throw new Error("Invalid otp");
    }
    await Otp.deleteOne({ _id: otpDetails._id });
    // otpDetails.isVerified = true;
    // await otpDetails.save({ validateBeforeSave: false });
    return true;
}

userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
}

userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
}

userDetailsSchema.methods.addCourse = async function (courseId) {
    this.enrolledCourses.push({ course:courseId });
    await this.save();
    return this;
}
userDetailsSchema.methods.removeCourse = async function (courseId) {
    this.enrolledCourses = this.enrolledCourses.filter(courseDetails => courseDetails.course.toString() !== courseId.toString());
    await this.save();
    return this;
}
//Update totalTopic count when a new course is added
userDetailsSchema.pre("save", async function (next) {
    if (this.isModified('enrolledCourses')) {
        for (const enrolledCourse of this.enrolledCourses) {
            if (enrolledCourse.isNew) { // Only set for newly added courses
                const topics = await Topic.find({ course: enrolledCourse.course });
                // console.log("topics", topics.length);
                enrolledCourse.totalTopic = topics ? topics.length : 0;
            }
        }
    }
    next();
})
//Update completedTopic count 
userDetailsSchema.methods.updateCompletedTopics = async function (courseId) {
    const courseDetails = this.enrolledCourses.find(courseDetails => courseDetails.course.toString() === courseId.toString());
    if (!courseDetails) {
        throw new Error("Course not found");
    }
    courseDetails.completedTopic = courseDetails.completedTopic + 1;
    await this.save();
    return this;
}

const User = mongoose.model("User", userSchema);
const OauthUser = mongoose.model("OauthUser", OauthUserSchema);
const UserDetails = mongoose.model("UserDetails", userDetailsSchema);

module.exports = { User, OauthUser, UserDetails };