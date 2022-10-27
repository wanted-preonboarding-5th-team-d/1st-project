const noticeService = require("../services/noticeService");
const Error = require("../middlewares/errorConstructor");

const getBoardList = async(req,res) => { 

    const { user_id } = req.body;
    
    const boardList = await noticeService.getBoardList(user_id);

    res.status(200).json({boardList :boardList});
    
}

const registerNotice = async(req,res) => {

    const { user_id, title ,content,type_id } = req.body;

    console.log(req.body)

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

    //edit_auth, delete_auth 내보내기.
    res.status(200).json({ notice:notice});
}



module.exports = {
    
    getBoardList,
    registerNotice,
    noticeView,
    editNotice,
    deleteNotice
}