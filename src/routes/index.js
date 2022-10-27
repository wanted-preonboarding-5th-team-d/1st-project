const express = require("express");
const router = express.Router();
const testRouter = require("./testRouter")
const noticeRouter = require("./noticeRouter");

router.use("/test", testRouter.router);
router.use("/notice" , noticeRouter.router);

module.exports = router;