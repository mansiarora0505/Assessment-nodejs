const Joi = require("@hapi/joi");
const moment = require("moment");

const eventValidations = (body) => {
    const schema = Joi.object({
        e_name: Joi.string().required(),
        location: Joi.string().min(5).required(),
        e_date: Joi.date().min(moment().format()).required(),
        start_time: Joi.date().min(moment().format()).required(),
        end_time: Joi.date().greater(moment(body.start_time).format()).required(),
    }).unknown(false);
    return schema.validate(body);
}
module.exports = { eventValidations };