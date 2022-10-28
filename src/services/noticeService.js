const noticeDao = require("../models/noticeDao");
const noticeExist = require("../utils/noticeExist");
const noticeAuth = require("../utils/noticeAuth");

const getNoticeList = async() => {

    const noticeList = await noticeDao.getNoticeList();

    return noticeList;
}

const getTypeId = async(user_id) => {
    
    const type = await noticeDao.getTypeId(user_id);

    const typeId = type[0].id;

    return typeId;
}

const registerNotice = async(user_id,title,content,type_id) => {

    await noticeDao.registerNotice(user_id,title,content,type_id);

    return true;
}

const noticeView = async(notice_id) => {

    await noticeExist.checkNotice(notice_id);

    const notice = await noticeDao.noticeView(notice_id);

    return notice;
}

const addViewCnt = async(notice_id) => {

    await noticeDao.addViewCnt(notice_id);

    return true;
}

const editNotice = async(notice_id ,user_id, title, content) => {

    await noticeAuth.editAuth(notice_id ,user_id, title, content)

    return true;
}

const deleteNotice = async(notice_id ,user_id) => {

    await noticeAuth.deleteAuth(notice_id ,user_id)

    return true;
}

module.exports = {
    
    getNoticeList,
    getTypeId,
    registerNotice,
    noticeView,
    addViewCnt,
    editNotice,
    deleteNotice
}
