const checkUserSignup = require("../utils/userSignupValidate");
const checkUserSignin = require("../utils/userSigninValidate");

const signup = async (name, age, email, password, gender, phone) => {
    await checkUserSignup.signup(name, age, email, password, gender, phone);
    return true;
}

const signin = async (email, password) => {
    const token = await checkUserSignin.signin(email, password);
    return token;
}

module.exports = {
    signup,
    signin
}