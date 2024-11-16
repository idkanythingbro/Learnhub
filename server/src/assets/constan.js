const emailVerificationMailSubject = "Email verification";
const emailVerificationMailText = (otp) => {
    return `Your OTP is ${otp}`;
};
const emailVerificationMailHtml = (otp) => {
    return `<h3>Your OTP is ${otp}</h3>`;
};
const emailVerificationMailSuccessMessage = "Please verify your email address. OTP has been sent to your registered email";
const emailVerificationMailFailureMessage = "Failed to send email";
const loginInvalidInputMessage = "Invalid input";
const loginUserNotFoundMessage = "User not found";
const loginInvalidCredentialsMessage = "Invalid credentials";
const loginSuccessMessage = "User logged in successfully";
const otpExpiredMessage = "Otp expired";
const otpAlreadyVerifiedMessage = "Otp already verified";
const otpInvalidMessage = "Invalid otp";
const otpGenerationFailureMessage = "Failed to generate OTP";
const accessTokenCookieName = "accessToken";
const refreshTokenCookieName = "refreshToken";
const accessTokenCookieOption = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3) //
};
const refreshTokenCookieOption = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
};

module.exports = {
    emailVerificationMailSubject,
    emailVerificationMailText,
    emailVerificationMailHtml,
    emailVerificationMailSuccessMessage,
    emailVerificationMailFailureMessage,
    loginInvalidInputMessage,
    loginUserNotFoundMessage,
    loginInvalidCredentialsMessage,
    loginSuccessMessage,
    otpExpiredMessage,
    otpAlreadyVerifiedMessage,
    otpInvalidMessage,
    otpGenerationFailureMessage,
    accessTokenCookieName,
    refreshTokenCookieName,
    accessTokenCookieOption,
    refreshTokenCookieOption
}