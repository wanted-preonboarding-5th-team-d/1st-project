
const express = require("express");
const router = express.Router();

const noticeController = require("../controllers/noticeController")

router.post("/type",noticeController.getBoardList);
router.post("/register", noticeController.registerNotice);
router.get("/:notice_id",noticeController.noticeView);
router.put("/edit",noticeController.editNotice);



module.exports = { router };