const express = require("express");
const compression = require("compression");
const cors = require("cors");
const httpStatus = require("http-status");
const routes = require("./routes/v1");
const { errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");
const passport = require("passport");
const { jwtStrategy } = require("./config/passport");

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

//initilize passport
passport.use(jwtStrategy);
app.use(passport.initialize());

// Reroute all API request starting with "/v1" route
app.use("/api/v1", routes);

// send back a 404 error for any unknown api request
app.all((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// handle error
app.use(errorHandler);

module.exports = app;
