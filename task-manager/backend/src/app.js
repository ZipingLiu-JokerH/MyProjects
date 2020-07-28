const express = require("express");

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

require("./db/mongoose");

const app = express();

// set up express, so it can auto parse
// incoming json data to object, so we can
// access from req handlers
app.use(express.json());

// link each router into the app
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
