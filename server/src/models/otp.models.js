const mongoose = require("mongoose")
const otpSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true
    },
    // isVerified: {
    //     type: Boolean,
    //     default: false
    // },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 5 * 60
    }
}, {
    timestamps: true
})

otpSchema.methods.isOtpVerified = async function () {
    return this.isVerified;
}

const Otp = mongoose.model("Otp", otpSchema);
module.exports = Otp;