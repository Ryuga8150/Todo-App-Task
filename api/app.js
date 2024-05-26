const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const taskRouter = require("./routes/taskRoute");
const globalErrorHandler = require("./controllers/errorController");

const app = express();
app.set("trust-proxy", true);

app.use(cors());
app.use(morgan("dev"));

app.use(express.json());

app.use("/api/tasks", taskRouter);

// UNCOMMENT BELOW//
app.use(express.static(path.join(__dirname, "..", "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});

app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server`);
  err.status = "fail";
  err.statusCode = 404;

  next(err);
});

app.use(globalErrorHandler);
module.exports = app;
