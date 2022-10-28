
const express = require("express");
const router = express.Router();

const noticeController = require("../controllers/noticeController")

router.get("/list",noticeController.getNoticeList);
router.post("/register", noticeController.registerNotice);
router.get("/detail/:notice_id",noticeController.noticeView);
router.put("/edit",noticeController.editNotice);
router.delete("/delete",noticeController.deleteNotice);



module.exports = { router };