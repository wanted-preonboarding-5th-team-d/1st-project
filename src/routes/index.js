const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");
const logRouter = require("./logRouter");
const noticeRouter = require("./noticeRouter");

router.use("/user", userRouter.router);
router.use("/log", logRouter.router);
router.use("/notice", noticeRouter.router);

module.exports = router;
