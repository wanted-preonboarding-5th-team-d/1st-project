const logDao = require("../models/logDao");

const getLogByGender = async (gender) => {
  const result = await logDao.getLogByGender(gender);

  return result.length;
};

const getLogByAge = async () => {
  const result = await logDao.getLogByAge();

  console.log(result);
  return result;
};

module.exports = {
  getLogByGender,
  getLogByAge,
};
