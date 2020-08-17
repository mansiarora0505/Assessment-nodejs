const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const db = require("./db/index");
const cors = require("cors");
const authRouter = require("./routes/auth/auth");
const eventRouter = require("./routes/event/event");

app.use(express.json());
app.use(express.urlencoded())
app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api/event", eventRouter);
app.listen("3005");

