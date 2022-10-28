const Error = require("../middlewares/errorConstructor");
const noticeDao = require("../models/noticeDao");

const editAuth = async(notice_id ,user_id, title, content) => {

    const noticeInfo = await noticeDao.getNoticeInfo(notice_id);
    const noticeUserId = noticeInfo[0].user_id;

    if (user_id !== noticeUserId) {

        throw new Error("게시글 작성자만 수정이 가능합니다.",400);
    }

    await noticeDao.editNotice(title, content, notice_id);

    return true;
    

}

const deleteAuth = async(notice_id ,user_id ) => {

    const noticeInfo = await noticeDao.getNoticeInfo(notice_id);
    const userInfo = await noticeDao.getUserInfo(user_id);
    const noticeUserId = noticeInfo[0].user_id;
    const userGrade = Number(userInfo[0].grade_id);

    if ( userGrade === 2 && noticeUserId !== user_id) {

        throw new Error("게시글 작성자만 삭제가 가능합니다.",400);

    }else if( noticeUserId != user_id && userGrade !== 2 ){
        
        await noticeDao.deleteNotice(notice_id);
        return true;

    }else if (noticeUserId === user_id){
        
        await noticeDao.deleteNotice(notice_id);
        return true;
    }


}

module.exports =  {

    editAuth,
    deleteAuth
}