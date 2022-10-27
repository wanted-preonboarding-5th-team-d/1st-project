const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const logRouter = require("./logRouter");

router.use("/user", userRouter.router);
router.use("/log", logRouter.router);

module.exports = router;
