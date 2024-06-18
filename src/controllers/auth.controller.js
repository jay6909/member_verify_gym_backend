const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { authService, userService, tokenService } = require("../services");
const { otpHelper } = require("../helpers");

/**
 * Perform the following steps:
 * -  Call the userService to create a new user
 * -  Generate auth tokens for the user
 * -  Send back
 * --- "201 Created" status code
 * --- response in the given format
 *
 * Example response:
 *
 * {
 *  "user": {
 *      "_id": "5f71b31888ba6b128ba16205",
 *      "name": "crio-user",
 *      "email": "crio-user@gmail.com",
 *      "password": "$2a$08$bzJ999eS9JLJFLj/oB4he.0UdXxcwf0WS5lbgxFKgFYtA5vV9I3vC",
 *      "createdAt": "2020-09-28T09:55:36.358Z",
 *      "updatedAt": "2020-09-28T09:55:36.358Z",
 *      "__v": 0
 *  },
 *  "tokens": {
 *      "access": {
 *          "token": "eyJhbGciOiJIUz....",
 *          "expires": "2020-10-22T09:29:01.745Z"
 *      }
 *  }
 *}
 *
 */
const register = catchAsync(async (req, res) => {
  // if(!userBody.password || !userBody.email || !userBody.name) throw new ApiError(httpStatus.BAD_REQUEST)
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  return res.status(httpStatus.CREATED).send({ user, tokens });
});
const sendOneTimePassword = catchAsync(async (req, res) => {
  const otpSuccess = await otpHelper.sendOtp(req.body.phoneNumber);
  if (!otpSuccess)
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: "unable to send otp. try again later" });
  return res
    .status(httpStatus.OK)
    .send({ message: "otp was sent to your number" });
});

const verifyOneTimePassword = catchAsync(async (req, res) => {
  const verfied = await otpHelper.verifyOtp(req.body.enteredOtp);
  if (!verfied)
    return res.status(httpStatus.UNAUTHORIZED).send({ message: "Wrong otp" });
  return res.status(httpStatus.OK).send({ message: "verified" });
});
/**
 * Perform the following steps:
 * -  Call the authservice to verify is password and email is valid
 * -  Generate auth tokens
 * -  Send back
 * --- "200 OK" status code
 * --- response in the given format
 *
 * Example response:
 *
 * {
 *  "user": {
 *      "_id": "5f71b31888ba6b128ba16205",
 *      "name": "crio-user",
 *      "email": "crio-user@gmail.com",
 *      "password": "$2a$08$bzJ999eS9JLJFLj/oB4he.0UdXxcwf0WS5lbgxFKgFYtA5vV9I3vC",
 *      "createdAt": "2020-09-28T09:55:36.358Z",
 *      "updatedAt": "2020-09-28T09:55:36.358Z",
 *      "__v": 0
 *  },
 *  "tokens": {
 *      "access": {
 *          "token": "eyJhbGciOiJIUz....",
 *          "expires": "2020-10-22T09:29:01.745Z"
 *      }
 *  }
 *}
 *
 */
const login = catchAsync(async (req, res) => {
  const { phone, password } = req.body;
  // if(!userBody.email || !userBody.password) throw new ApiError(httpStatus.BAD_REQUEST)
  // const accessToken=req.headers['authorization'];
  // if(!accessToken) throw new ApiError(httpStatus.UNAUTHORIZED,"no access token");
  const user = await authService.loginUserWithPhoneAndPassword(phone, password);
  console.log(user);
  const tokens = await tokenService.generateAuthTokens(user);
  return res.status(httpStatus.OK).send({ user, tokens });
});

module.exports = {
  register,
  login,
  sendOneTimePassword,
  verifyOneTimePassword,
};
