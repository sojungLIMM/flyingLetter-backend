require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("morgan");

const authRouter = require("./routes/auth");
const connectMongoDB = require("./loaders/mongooseLoader");

const app = express();

connectMongoDB();

app.use(logger("dev"));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500);

  if (req.app.get("env") === "development") {
    res.json({
      result: err.result || "error",
      message: err.message,
      stack: err.stack,
    });

    return;
  }

  if (err.statusCode === 500) {
    err.message = "Internal Server Error";
  }

  res.json({
    result: err.result || "error",
    message: err.message,
  });
});

module.exports = app;
