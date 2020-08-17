const Joi = require("@hapi/joi");

const loginValidations = (body) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    }).unknown(false);
    return schema.validate(body);
}

const signupValidations = (body) => {
    const schema = Joi.object({
        userName: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    }).unknown(false);
    return schema.validate(body);

}

module.exports = { loginValidations, signupValidations };