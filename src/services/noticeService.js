const noticeDao = require("../models/noticeDao");
                       
const getBoardList = async(user_id) => {

    const boardList = await noticeDao.getBoardList(user_id);

    return boardList;
}

const registerNotice = async(user_id,title,content,type_id) => {

    await noticeDao.registerNotice(user_id,title,content,type_id);

    return true;
}

const noticeView = async(notice_id) => {

    const notice = await noticeDao.noticeView(notice_id);

    return notice;
}

const getNoticeInfo = async(notice_id) => {

    const noticeInfo = await noticeDao.getNoticeInfo(notice_id);
    
    return noticeInfo;
}

const editNotice = async(title,content,notice_id) => {

    await noticeDao.editNotice(title,content,notice_id);

    return true;
}

const getUserInfo = async(user_id) => {

    const userInfo = await noticeDao.getUserInfo(user_id);

    return userInfo;
}

const deleteNotice = async(notice_id) => {

    await noticeDao.deleteNotice(notice_id);

    return true;
}

module.exports = {

    getBoardList,
    registerNotice,
    noticeView,
    getNoticeInfo,
    editNotice,
    getUserInfo,
    deleteNotice
}
