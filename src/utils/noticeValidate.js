const Error = require("../middlewares/errorConstructor");

const checkNoticeValidate = (title,content) => {

    if (!title) {
        throw new Error("제목을 입력 해 주세요.",400);
    }else if (!content){

        throw new Error("내용을 입력 해 주세요.",400);
    }else {
        return true;
    }

};


module.exports = {

    checkNoticeValidate
}