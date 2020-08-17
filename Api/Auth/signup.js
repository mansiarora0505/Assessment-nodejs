const { renderResult } = require("../../server/responseHandler");
const { signupValidations } = require("../../Controllers/auth/auth");
const Auth = require("../../services/auth/loginService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const lodash = require("lodash");

const signupHandler = async (req, res) => {
    try {
        const { error } = signupValidations(req.body);
        if (error) return renderResult(res, 400, error.details[0].message);
        const { email, password } = req.body;
        const user = await Auth.findUser(email);
        if (user) return renderResult(res, 400, "user already exist with the given email");
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);
        console.log(hashPass)
        const response = await Auth.createUser(req.body);
        const token = jwt.sign({ id: response.id }, process.env.privateKey, {
            expiresIn: "1w"
        });
        return renderResult(res, 200, "Success", {
            accessToken: token,
            userInfo: lodash.pick(response, ['id', 'email', 'userName'])
        });
    }
    catch (error) {
        renderResult(res, 500, error.message);
    }

}
module.exports = signupHandler;