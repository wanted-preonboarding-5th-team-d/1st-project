const responseMessage = require("../constants/responseMessage");
const statusCode = require("../constants/statusCode");
const util = require("../lib/util");
const logService = require("../services/logService");

/**
 *  @성별_통계_조회하기
 *  @route GET /log/gender?gender=
 *  @access public
 *  @err
 */
const getLogByGender = async (req, res) => {
  try {
    const { gender } = req.query;

    const result = await logService.getLogByGender(gender);

    return res.status(statusCode.OK).send(
      util.success(statusCode.OK, responseMessage.GET_LOG_SUCCESS, {
        count: result,
      })
    );
  } catch (error) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          responseMessage.INTERNAL_SERVER_ERROR
        )
      );
  }
};
/**
 *  @나이별_통계_조회하기
 *  @route GET /log/age
 *  @access public
 *  @err
 */
const getLogByAge = async (req, res) => {
  try {
    const result = await logService.getLogByAge();

    return res
      .status(statusCode.OK)
      .send(
        util.success(statusCode.OK, responseMessage.GET_LOG_SUCCESS, result)
      );
  } catch (error) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          responseMessage.INTERNAL_SERVER_ERROR
        )
      );
  }
};

/**
 *  @접속시간별_통계_조회하기
 *  @route GET /log/time
 *  @access public
 *  @err
 */

module.exports = {
  getLogByGender,
  getLogByAge,
};
