const Error = require("../middlewares/errorConstructor");
const bcrypt = require("bcrypt");
const userDao = require("../models/userDao");

const signup = async (name, age, email, password, gender, phone) => {
    const validationEmail = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!validationEmail.test(email)) {
        throw new Error("EMAIL ERROR", 400);
    }

    const checkEmail = await userDao.checkEmail(email);

    if (checkEmail.length == 1) {
        throw new Error("EMAIL ALREADY EXIST", 400);
    }

    const validationPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!validationPassword.test(password)) {
        throw new Error("PASSWORD ERROR", 400);
    }

    const validationPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    if(!validationPhone.test(phone)) {
        throw new Error("PHONE NUMBER ERROR", 400);
    }

    if( gender !== "male" && gender !== "female") {
        throw new Error("WRITE CORRECT GENDER", 400);
    }

    if( age <= 0 || age > 120 ) {
        throw new Error("INCORRECT AGE", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await userDao.signup(name, age, email, hashedPassword, gender, phone);

    return true;
}

module.exports = {
    signup
}