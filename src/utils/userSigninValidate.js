const Error = require("../middlewares/errorConstructor");
const bcrypt = require("bcrypt");
const userDao = require("../models/userDao");
const jwt = require("jsonwebtoken");

const signin = async (email, password) => {
    const checkEmail = await userDao.checkEmail(email);

    if (checkEmail.length == 0) {
        throw new Error("EMAIL NOT EXIST", 400);
    }

    const getBcrypt = await userDao.checkPassword(email);
    const decode = await bcrypt.compare(password, getBcrypt[0].password);
    if (!decode) {
        throw new Error("PASSWORD ERROR", 400);
    }


    const payLoadId = await userDao.getUserIdByEmail(email);
    const id = JSON.stringify(Object.values(payLoadId[0])[0]);
    const payLoadGrade = await userDao.getUserGradeByEmail(email);
    const grade = JSON.stringify(Object.values(payLoadGrade[0])[0]);
    const accessToken = jwt.sign({ userId: id, userGrade: grade, exp: Math.floor(Date.now() / 1000) + (3600 * 10) }, process.env.JWT_SECRET);

    return accessToken;
}

module.exports = {
    signin
}