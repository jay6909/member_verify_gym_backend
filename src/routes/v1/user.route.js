const express = require("express");
const validate = require("../../middlewares/validate");
const userValidation = require("../../validations/user.validation");
const userController = require("../../controllers/user.controller");
const { isEmailTaken } = require("../../models/user.model");
const { User } = require("../../models");
const mongoose = require("mongoose");
const { userService } = require("../../services");
const router = express.Router();

router.get(
  "/:userId",
  validate(userValidation.getUser),
  userController.getUser
);

router.post("/", validate(userValidation.createUser), userController.addUser);

//profile pic, name, phone number, email, gender
router.put("/", (req, res) => {});
module.exports = router;
