const noticeService = require("../services/noticeService");
const Error = require("../middlewares/errorConstructor");

const getBoardList = async(req,res) => { 

    const { user_id } = req.body;
    
    const boardList = await noticeService.getBoardList(user_id);

    res.status(200).json({boardList :boardList});
    
}

const registerNotice = async(req,res) => {

    const { user_id, title ,content,type_id } = req.body;

    if( !content ) {
        return res.status(400).json({"message":"내용을 입력 해 주세요"})
    }else if ( !title ) {
        return res.status(400).json({"message":"게시판 제목을 입력 해 주세요."});
    }else if ( !type_id ) {
        return res.status(400).json({"message":"게시판 유형을 선택해 수세요."});
    }else {
        await noticeService.registerNotice(user_id,title,content,type_id);
    }

    return res.status(200).json({"message":"게시글이 등록 되었습니다."});
}

const noticeView = async(req,res) => {

    const { notice_id } = req.params.notice_id;

    const notice = await noticeService.noticeView(notice_id);

    res.status(200).json({ notice:notice});
}

const editNotice = async (req,res) => {

    const {notice_id ,user_id, title, content} = req.body;

    if(!title || !content){
        return res.status(400).json({"message":"제목, 본문은 필수 작성사항 입니다."});
    }

    if(!user_id) {
        return res.status(400).json({"message" : "게시글 작성자만 수정이 가능합니다. 로그인 해 주세요"});
    }

    const noticeInfo = await noticeService.getNoticeInfo(notice_id);
    const noticeUserId = noticeInfo[0].user_id

    if (user_id !== noticeUserId) {
        return res.status(400).json({"message" : "게시글 작성자만 수정이 가능합니다."});
    }else{
        await noticeService.editNotice(title,content,notice_id);
    }

    return res.status(200).json({"message":"게시글이 수정 되었습니다."});
}

const deleteNotice = async(req,res) => {

    const { notice_id ,user_id } = req.body;

    if(!user_id) {
        return res.status(400).json({"message" : "게시글 작성자/운영자/관리자만 삭제가 가능합니다. 로그인 해 주세요"});
    }
    
    const noticeInfo = await noticeService.getNoticeInfo(notice_id);
    const userInfo = await noticeService.getUserInfo(user_id);
    const noticeUserId = noticeInfo[0].user_id;
    const userGrade = Number(userInfo[0].grade_id);


    if ( userGrade === 2 && noticeUserId !== user_id) {
        return res.status(400).json({"message" : "게시글 작성자만 삭제가 가능합니다."});
    }else if( noticeUserId != user_id && userGrade !== 2 ){
        await noticeService.deleteNotice(notice_id);
        return res.status(200).json({"message":"게시글이 삭제 되었습니다."});
    }else if (noticeUserId === user_id){
        await noticeService.deleteNotice(notice_id);
        return res.status(200).json({"message":"게시글이 삭제 되었습니다."});
    }

}


module.exports = {
    
    getBoardList,
    registerNotice,
    noticeView,
    editNotice,
    deleteNotice
}