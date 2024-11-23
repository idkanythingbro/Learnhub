const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isEmailValid, isPhoneNumberValid, isPasswordValid } = require("../utils/validation");
const generateOtp = require("../utils/generatOtp");
const Otp = require("./otp.models");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    company: {
        type: String,
        required: true,
        trim: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
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
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: isPhoneNumberValid,
            message: props => `${props.value} is not a valid phone number!`
        },
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
        validate: {
            validator: isPasswordValid,
            message: `password must contain one uppercase,one lowercase,one digit`
        },
    },
    avatar: {
        type: String, // cloudinary url
        default: null
    },


    post: {
        type: Number,
        default: 0
    },
    followers: {
        type: [
            {
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true
                },
                userName: {
                    type: String,
                    required: true
                }
            }
        ],
        default: []
    },
    following: {
        type: [
            {
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true
                },
                userName: {
                    type: String,
                    required: true
                }
            }
        ],
        default: []
    },
    progress: {
        type: [
            {
                topic: {
                    type: String,
                    required: true
                },
                value: {
                    type: Number,
                    required: true
                }
            }
        ],
        default: []
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
            userName: this.userName,
            email: this.email,
            role: this.role,
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

const User = mongoose.model("User", userSchema);

module.exports = User;