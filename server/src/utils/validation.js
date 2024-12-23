
const isFileSizeValid = (originalSize, maxiMumSize) => {
    const MB = 1 * 1024 * 1024;
    const KB = 1 * 1024;
    let size = 99999;
    if (maxiMumSize.charAt(maxiMumSize.length - 2) === "M"||maxiMumSize.charAt(maxiMumSize.length - 2) === "m") {
        size = parseInt(maxiMumSize.slice(0, maxiMumSize.length - 2)) * MB;
    }
    else if (maxiMumSize.charAt(maxiMumSize.length - 2) === "K" || maxiMumSize.charAt(maxiMumSize.length - 2) === "k") {
        size = parseInt(maxiMumSize.slice(0, maxiMumSize.length - 2)) * KB;
    }
    return originalSize <= size;
}
//Email validator
const isEmailValid = (email) => {
    const emailRegEx = /\S+@\S+\.\S+/;
    return emailRegEx.test(email);
}
//phone number validator
const isPhoneNumberValid = (phoneNumber) => {
    console.log(phoneNumber);
    
    const phoneNumberRegEx = /^[0-9]{10}$/;
    return phoneNumberRegEx.test(phoneNumber)||phoneNumber==="N/A";
}
//password validator
const isPasswordValid = (password) => {
    const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return passwordRegEx.test(password);
}
//Social link validation - github
const isGithubLinkValid = (link) => {
    const linkRegEx = /^(https:\/\/)?(www\.)?github.com\/[a-zA-Z0-9]+$/;
    return linkRegEx.test(link);
}
//linkedin
const isLinkedinLinkValid = (link) => {
    const linkRegEx =/^(https:\/\/)?(www\.)?linkedin\.com\/[a-z]+\/[a-zA-Z0-9-]+\/?$/;
    return linkRegEx.test(link);
}
//twitter
const isTwitterLinkValid = (link) => {
    const linkRegEx = /^(https:\/\/)?(www\.)?x.com\/[a-zA-Z0-9]+$/;
    return linkRegEx.test(link);
}
//any  link
const isLinkValid = (link) => {
    const linkRegEx =/^(https?:\/\/|www\.)/;
    return linkRegEx.test(link);
}






module.exports={
    isFileSizeValid,
    isEmailValid,
    isPhoneNumberValid,
    isPasswordValid,
    isGithubLinkValid,
    isLinkedinLinkValid,
    isTwitterLinkValid,
    isLinkValid
}