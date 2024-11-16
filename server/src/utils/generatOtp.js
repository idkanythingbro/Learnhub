
const generateOtp = (numberOfDigit = 4) => {
    let x = Math.pow(10, numberOfDigit - 1);
    return Math.floor(x + Math.random() * ((9 * x) - 1));
}

module.exports = generateOtp