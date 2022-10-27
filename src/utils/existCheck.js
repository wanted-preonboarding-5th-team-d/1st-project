const Error = require("../middlewares/errorConstructor");
const noticeDao = require("../models/noticeDao");

const checkNotice = async(notice_id) => {

    const noticeExist = await noticeDao.checkNotice(notice_id);
    
}

module.exports = {


}