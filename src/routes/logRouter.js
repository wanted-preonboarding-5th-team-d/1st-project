const express = require("express");
const router = express.Router();

const logController = require("../controllers/logController");

router.get("/gender", logController.getLogByGender);
router.get("/age", logController.getLogByAge);

module.exports = {
  router,
};
