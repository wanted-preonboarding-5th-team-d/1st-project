const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const userRouter = require("./userRouter");

router.use("/user", userRouter.router)
=======
const testRouter = require("./testRouter")
const noticeRouter = require("./noticeRouter");

router.use("/test", testRouter.router);
router.use("/notice" , noticeRouter.router);
>>>>>>> feature/notice_register

module.exports = router;