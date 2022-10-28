const checkUserSignup = require("../utils/userSignupValidate");
const checkUserSignin = require("../utils/userSigninValidate");
const checkUserSignout = require("../utils/userSignoutValidate");

const signup = async (name, age, email, password, gender, phone) => {
    await checkUserSignup.signup(name, age, email, password, gender, phone);
    return true;
}

const signin = async (email, password) => {
    const token = await checkUserSignin.signin(email, password);
    return token;
}

const signout = async (email, password) => {
    const result = await checkUserSignout.signout(email, password);
    return result;
}

module.exports = {
    signup,
    signin,
    signout
}