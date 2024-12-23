const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isEmailValid, isPhoneNumberValid, isPasswordValid } = require("../utils/validation");
const generateOtp = require("../utils/generatOtp");
const Otp = require("./otp.models");
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
        // required: true,
        unique: true,
        trim: true,
        validate: {
            validator: isPhoneNumberValid,
            message: props => `${props.value} is not a valid phone number!`
        },
    },
    organization: {
        type: String,
        // required: true,
        trim: true,
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
        default: ""
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
const googleUserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
        unique: true,
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

const User = mongoose.model("User", userSchema);
const GoogleUser = mongoose.model("GoogleUser", googleUserSchema);
const UserDetails = mongoose.model("UserDetails", userDetailsSchema);

module.exports = { User, GoogleUser, UserDetails };