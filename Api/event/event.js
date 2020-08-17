const { renderResult } = require("../../server/responseHandler");
const Event = require("../../services/event/event");
const { eventValidations } = require("../../Controllers/auth/event");

const getEventHandler = async (req, res) => {
    try {
        const { pageno, pagesize } = req.query;
        const offset = ((+pageno - 1) * (+pagesize)) || 0;
        const limit = +pagesize;
        const response = await Event.findEvents(offset, limit);
        return renderResult(res, 200, "Success", response);
    }
    catch (error) {
        renderResult(res, 500, error.message);
    }
}

const createEventHandler = async (req, res) => {
    try {
        const { error } = eventValidations(req.body);
        if (error) return renderResult(res, 400, error.details[0].message);
        const [response, isCreated] = await Event.addEvent(req.body);
        if (!isCreated) return renderResult(res, 400, "Event already exist");
        return renderResult(res, 200, "event created successfully", {});
    }
    catch (error) {
        renderResult(res, 500, error.message);
    }
}
module.exports = { getEventHandler, createEventHandler };