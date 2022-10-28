const noticeService = require("../services/noticeService");
const existCheck = require("../utils/noticeExist");
const noticeValidate = require("../utils/noticeValidate");

const getNoticeList = async(req,res) => { 

    const noticeList = await noticeService.getNoticeList();
    
    return res.status(200).json({noticeList : noticeList});
}

const registerNotice = async(req,res) => {

    const { user_id, title ,content} = req.body;

    const type_id = await noticeService.getTypeId(user_id);

    await noticeValidate.checkNoticeValidate(title,content);

    await noticeService.registerNotice(user_id,title,content,type_id);

    return res.status(200).json({"message":"게시글이 등록 되었습니다."});
}

const noticeView = async(req,res) => {

    const { notice_id } = req.params;

    await existCheck.checkNotice(notice_id);

    await noticeService.addViewCnt(notice_id);

    const notice = await noticeService.noticeView(notice_id);

    res.status(200).json({ notice:notice});
}

const editNotice = async (req,res) => {

    
    const {notice_id ,user_id, title, content} = req.body;
    
    if(!user_id) {
        return res.status(400).json({"message" : "게시글 작성자만 수정이 가능합니다. 로그인 해 주세요"});
    }

    await existCheck.checkNotice(notice_id);

    await noticeValidate.checkNoticeValidate(title,content);

    await noticeService.editNotice(notice_id ,user_id, title, content);

    return res.status(200).json({"message":"게시글이 수정 되었습니다."});
}

const deleteNotice = async(req,res) => {

    const { notice_id ,user_id } = req.body;

    await existCheck.checkNotice(notice_id);
    
    if(!user_id) {
        return res.status(400).json({"message" : "게시글 작성자/운영자/관리자만 삭제가 가능합니다. 로그인 해 주세요"});
    }

    await noticeService.deleteNotice(notice_id ,user_id);

    return res.status(200).json({"message":"게시글이 삭제 되었습니다."});

}


module.exports = {

    getNoticeList,
    registerNotice,
    noticeView,
    editNotice,
    deleteNotice
}