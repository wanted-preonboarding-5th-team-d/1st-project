const noticeDao = require("../models/noticeDao");
const Error = require("../middlewares/errorConstructor");

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

const deleteNotice = async(notice_id, user_id ) => {
    
    
}

module.exports = {

    getBoardList,
    registerNotice,
    noticeView
}
