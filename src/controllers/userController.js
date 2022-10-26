const userService = require("../services/userService");

const signup = async (req, res) => {
    const { name, age, email, password, gender, phone } = req.body
    if( !name || !age || !email || !password || !gender || !phone ) {
        return  res.status(400).json({"message": "빈칸없이 모두 입력해주세요"});
    }
    await userService.signup(name, age, email, password, gender, phone)
    res.status(200).json({"message": "signup success"})
}

module.exports = {
    signup
}