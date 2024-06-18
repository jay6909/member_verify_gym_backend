const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync.js");
const { userService } = require("../services");
const { User } = require("../models");

/**
 * Get user details
 *  - Use service layer to get User data
 * 
 *  - Return the whole user object fetched from Mongo

 *  - If data exists for the provided "userId", return 200 status code and the object
 *  - If data doesn't exist, throw an error using `ApiError` class
 *    - Status code should be "404 NOT FOUND"
 *    - Error message, "User not found"
 *
 * 
 * Request url - <workspace-ip>:8082/v1/users/6010008e6c3477697e8eaba3
 * Response - 
 * {
 *     "address": "ADDRESS_NOT_SET",
 *     "_id": "6010008e6c3477697e8eaba3",
 *     "name": "memberverify-users",
 *     "email": "memberverify-user@gmail.com",
 *     "password": "memberverifyuser123",
 *     "createdAt": "2021-01-26T11:44:14.544Z",
 *     "updatedAt": "2021-01-26T11:44:14.544Z",
 *     "__v": 0
 * }
 * 
 *
 * Example response status codes:
 * HTTP 200 - If request successfully completes
 * HTTP 404 - If user entity not found in DB
 * 
 * @returns {User | {address: String}}
 *
 */
const getUser = catchAsync(async (req, res) => {
  // const uid=req.query.id.toString()
  const userId = req.params.userId;
  // console.log(userId)
  const data = await userService.getUserById(userId);
  if (!data) throw new ApiError(httpStatus.BAD_REQUEST, "");

  return res.status(200).send(data);
});
const addUser = catchAsync(async (req, res) => {
  const data = await userService.createUser(req.body);
  if (!data) throw new ApiError(httpStatus.BAD_REQUEST, "");

  return res.status(200).send(data);
});

const updateUser = catchAsync(async (req, res) => {
  //   console.log();
  //   return res.send("done");
  const data = await userService.updateUser(req.params.userId, req.body);
  return res.status(200).send({ message: "updated", data: data });
});

module.exports = {
  getUser,
  addUser,
  updateUser,
};
