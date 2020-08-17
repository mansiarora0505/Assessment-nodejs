const express = require("express");
const authRouter = express.Router();
const { loginHandler } = require("../../Api/Auth/login");
const signupHandler = require("../../Api/Auth/signup");

authRouter.post("/signup", signupHandler);

authRouter.post("/login", loginHandler);

module.exports = authRouter;