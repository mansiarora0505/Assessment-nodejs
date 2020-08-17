
const { loginValidations } = require("../../Controllers/auth/auth");
const Auth = require("../../services/auth/loginService");
const { renderResult } = require("../../server/responseHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const lodash = require("lodash");

const loginHandler = async (req, res) => {
    try {
        const { error } = loginValidations(req.body);
        if (error) return renderResult(res, 400, error.details[0].message);
        const { email, password } = req.body;
        const user = await Auth.findUser(email);
        if (!user) return renderResult(res, 400, "invalid email and password");

        const verifyPass = await bcrypt.compare(password, user.password);
        if (!verifyPass) return renderResult(res, 400, "incorrect password");
        const token = jwt.sign({ id: user.id }, process.env.privateKey, {
            expiresIn: "15m"
        });
        return renderResult(res, 200, "Success", {
            accessTokens: token,
            userInfo: lodash.pick(user, ['id', 'userName', 'email'])
        });
    }
    catch (error) {
        renderResult(res, 500, error.message);
    }

}
module.exports = { loginHandler };