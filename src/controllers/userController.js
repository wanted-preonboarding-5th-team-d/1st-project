const responseMessage = require("../constants/responseMessage");
const statusCode = require("../constants/statusCode");
const util = require("../lib/util");
const userService = require("../services/userService");

/**
 *  @사용자_회원가입
 *  @route POST /user/signup
 *  @access public
 *  @err
 */
const signup = async (req, res) => {
    const { name, age, email, password, gender, phone } = req.body
    if( !name || !age || !email || !password || !gender || !phone ) {
        return  res.status(statusCode.BAD_REQUEST).send(
            util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE)
        );
    }
    await userService.signup(name, age, email, password, gender, phone)
    res.status(statusCode.CREATED).send(
        util.success(statusCode.CREATED, responseMessage.SIGNUP_SUCCESS)
    );
}

/**
 *  @사용자_로그인
 *  @route GET user/signin
 *  @access public
 *  @err
 */
const signin = async (req, res) => {
    const {email, password } = req.query
    const token = await userService.signin(email, password)
    res.status(statusCode.OK).json({"message": responseMessage.SIGNIN_SUCCESS, "accessToken": token});
}

/**
 *  @사용자_회원탈퇴
 *  @route POST user/signout
 *  @access public
 *  @err
 */
const signout = async (req, res) => {
    const { email, password } = req.query
    if( !email || !password ) {
        return res.status(statusCode.BAD_REQUEST).send(
            util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE)
        );
    }

    await userService.signout(email, password)
    res.status(statusCode.NO_CONTENT).send(
        util.success(statusCode.NO_CONTENT)
    );
}

module.exports = {
    signout,
    signin,
    signup
}