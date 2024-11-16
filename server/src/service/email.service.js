const nodemailer = require("nodemailer");
const asyncHandler = require("../utils/asyncHandler");

const createTransport = () => {
    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_ID,
            pass: process.env.GMAIL_PASS
        }
    });
}

const sendEmail = async (to, subject, text, html) => {
    try {
        if (!to || !subject || !(text || html)) {
            return false;
        }
        const transporter = createTransport();
        const mailOptions = {
            from: process.env.GMAIL_ID,
            to,
            subject,
            text,
            html
        }
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = sendEmail;