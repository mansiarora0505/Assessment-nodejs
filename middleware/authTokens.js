const jwt = require("jsonwebtoken");
const { renderResult } = require("../server/responseHandler");

const authToken = (req, res, next) => {
    try {
        const token = req.header("Authorization") ? req.header("Authorization").split(" ")[1] : undefined;
        if (!token) renderResult(res, 401, "Unauthorized access");
        const payload = jwt.verify(token, process.env.privateKey);
        req.payload = payload;
        next();
    }
    catch (error) {
        renderResult(res, 401, error.message);
    }
}
module.exports = authToken;