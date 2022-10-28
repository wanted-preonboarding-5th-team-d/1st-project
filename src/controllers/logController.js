const responseMessage = require("../constants/responseMessage");
const statusCode = require("../constants/statusCode");
const util = require("../lib/util");
const logService = require("../services/logService");
const dayjs = require("dayjs");

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
const getLogByTime = async (req, res) => {
  try {
    let { time } = req.query;

    // 시간 입력이 없을 때 오늘 날짜부터 계산
    if (!time) {
      time = dayjs().format("YYYY.MM.DD 00:00:00");
    }
    const result = await logService.getLogByTime(time);

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

module.exports = {
  getLogByGender,
  getLogByAge,
  getLogByTime,
};
