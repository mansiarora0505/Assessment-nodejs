const express = require("express");
const eventRouter = express.Router();
const { getEventHandler, createEventHandler } = require("../../Api/event/event");
const authToken = require("../../middleware/authTokens");
eventRouter.get("/get", authToken, getEventHandler);
eventRouter.post("/create", authToken, createEventHandler);

module.exports = eventRouter;
