const checkUser = require("../utils/signupFormValidate");

const signup = async (name, age, email, password, gender, phone) => {
    await checkUser.signup(name, age, email, password, gender, phone);
    return true;
}

module.exports = {
    signup
}