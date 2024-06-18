const httpStatus = require("http-status");
const userService = require("./user.service");
const ApiError = require("../utils/ApiError");
const { User } = require("../models");
const { http } = require("winston");
const bcrypt = require("bcryptjs");

/**
 * Login with username and password
 * - Utilize userService method to fetch user object corresponding to the email provided
 * - Use the User schema's "isPasswordMatch" method to check if input password matches the one user registered with (i.e, hash stored in MongoDB)
 * - If user doesn't exist or incorrect password,
 * throw an ApiError with "401 Unauthorized" status code and message, "Incorrect email or password"
 * - Else, return the user object
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithPhoneAndPassword = async (phone, password) => {
  const user = await userService.getUserByPhone(phone);
  if (!user) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "there are no users with that phone"
    );
  }

  // const hashedPassword = await bcrypt.hash(password, 10);

  const isPassMatch = await user.isPasswordMatch(password);
  if (!isPassMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }

  return user;
};

module.exports = {
  loginUserWithPhoneAndPassword,
};
