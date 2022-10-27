const logDao = require("../models/logDao");

const getLogByGender = async (gender) => {
  const result = await logDao.getLogByGender(gender);

  return result.length;
};

module.exports = {
  getLogByGender,
};
