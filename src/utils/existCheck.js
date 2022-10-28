const Error = require("../middlewares/errorConstructor");
const noticeDao = require("../models/noticeDao");

const checkNotice = async(notice_id) => {

    const noticeExist = await noticeDao.checkNotice(notice_id);
    
    if( noticeExist.length > 0 ) {
        return true;
    }else {
        throw new Error("존재 하지 않는 게시글 입니다.",403)
    }
    
}

module.exports = {

    checkNotice
}