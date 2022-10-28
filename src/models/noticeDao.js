const { AppDataSource } = require("./datasource");
const Error = require("../middlewares/errorConstructor");

const getNoticeList = async() => {

    return await AppDataSource.query(
        `SELECT * FROM notice`
    );
}

const getTypeId = async(user_id) => {

    return await AppDataSource.query(
        `SELECT id FROM notice_type
            WHERE grade_id = (SELECT grade_id FROM user WHERE id = "${user_id}")`
    );
}

const registerNotice = async (user_id,title,content,type_id) => {

    try {
        return await AppDataSource.query(
            `INSERT INTO notice (user_id,title,content,type_id)
                VALUES ("${user_id}","${title}","${content}",${type_id});`
        )
    } catch (err) {
        console.log(err)
        throw new Error( "INVALID DATA INPUT",500 );
    }
}

const checkNotice = async(notice_id) => {

    try {
        return await AppDataSource.query(
            `
                SELECT * FROM notice WHERE id = ${notice_id}
            `
        )
    } catch (err) {
        throw new Error( "INVALID DATA INPUT",500 );
    }

}

const addViewCnt = async(id) => {

    try {
        return await AppDataSource.query(
            `UPDATE notice 
                SET view = view + 1
            WHERE id = ${id}`
        )
    } catch (err) {
        throw new Error( "FAILED TO UPDATE", 500 );
    }
}

const getUserGrade = async(user_id) => {

    try {
        return await AppDataSource.query(
            `SELECT grade_id FROM user 
                WHERE user_id = "${user_id}"`
        )
    } catch (err) {
        throw new Error( "FAILED TO UPDATE", 500 );
    }
}

const getNoticeGrade = async(notice_id) => {
    
    try {
        return await AppDataSource.query(
            `SELECT grade_id FROM notice_type t
                JOIN notice n ON t.id = t.type_id
                WHERE n.id = ${notice_id}`
        )
    } catch (err) {
        throw new Error( "FAILED TO UPDATE", 500 );
    }

}

const noticeView = async(notice_id) => {

    try {
        return await AppDataSource.query(
            `SELECT * FROM notice WHERE id = ${notice_id}`
        )
    } catch (err) {
        throw new Error( "NO COTENT ",403);
    }
}

const getNoticeInfo = async(notice_id) => {

    return await AppDataSource.query(
        `SELECT * FROM notice WHERE id = ${notice_id}`
    );
}

const editNotice = async(title,content,notice_id) => {

    try {
        return await AppDataSource.query(
            `UPDATE notice
                SET title = "${title}",
                content = "${content}"
            WHERE id = ${notice_id}`
        )
    } catch (err) {
        console.log(err)
        throw new Error( "FAILED TO UPDATE", 500 );
    }
}

const getUserInfo = async(user_id) => {

    return await AppDataSource.query(
        `SELECT * FROM user WHERE id = "${user_id}"`
    );
}

const deleteNotice = async(notice_id) => {

    try {
        return await AppDataSource.query(
            `DELETE FROM notice
            WHERE id = ${notice_id}`
        )
    } catch (err) {
        console.log(err)
        throw new Error( "FAILED TO DELETE", 500 );
    }
}

module.exports = {

    getNoticeList,
    getTypeId,
    registerNotice,
    checkNotice,
    getUserGrade,
    getNoticeGrade,
    noticeView,
    addViewCnt,
    getNoticeInfo,
    editNotice,
    getUserInfo,
    deleteNotice
}