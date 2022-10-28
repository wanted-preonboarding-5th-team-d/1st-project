const userDao = require("../models/userDao");
const bcrypt = require("bcrypt");

const signout = async (email, password) => {
    const existsCheck = await userDao.checkEmail(email);
    const checkResult = JSON.stringify(Object.values(existsCheck[0])[0]);
    const ResultEmail = checkResult.replace(/\"/gi, '');
    if (ResultEmail == 0) {
        throw new Error("KEY ERROR", 400);
    }

    const getBcrypt = await userDao.checkPassword(email);
    const decode = await bcrypt.compare(password, getBcrypt[0].password);
    if (!decode) {
        throw new Error("KEY ERROR", 400);
    }

    await userDao.deleteUser(email)
    return true;
}

module.exports = {
    signout
}