const { AppDataSource } = require("./datasource");
const { v4: uuid } = require('uuid');
const Error = require("../middlewares/errorConstructor");

const signup = async (name, age, email, hashedPassword, gender, phone) => {
    const userId = uuid();
    try{
        return await AppDataSource.query(
            `
            INSERT INTO user (id, age, name, email, password, gender, phone)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `,  [userId, age, name, email, hashedPassword, gender, phone]
        )
    } catch(err) {
        throw new Error("SERVER ERROR", 500);
    }

}

const checkEmail = async (email) => {
    return await AppDataSource.query(
        `
        SELECT * FROM user
        WHERE email = "${email}";
        `
    )
}

const checkGradeByEmail = async (email) => {
    return await AppDataSource.query(
        `
        SELECT grade_id
        FROM user
        WHERE email = "${email}"
        `
    )
}

const getUserGradeByEmail = async(email) => {
    return await AppDataSource.query(
        `
        SELECT grade_id FROM user WHERE email = "${email}";
        `
    )
}

const getUserIdByEmail = async(email) => {
    return await AppDataSource.query(
        `
        SELECT id FROM user WHERE email = "${email}";
        `
    )
}

const checkPassword = async (email) => {
    return await AppDataSource.query(
        `
        SELECT password FROM user
        where email = "${email}";
        `
    )
}

const deleteUser = async (email) => {
    try {
        return await AppDataSource.query(
            `
            UPDATE user 
            SET 
            name = "null",
            password = "null",
            email = "null",
            phone = "null"
            WHERE email="${email}"
            `
        )
    } catch (err) {
        throw new Error("SERVER ERROR", 500)
    }
}



module.exports = {
    signup,
    checkEmail,
    checkGradeByEmail,
    getUserGradeByEmail,
    getUserIdByEmail,
    deleteUser,
    checkEmail,
    checkPassword
}