const express = require("express");
const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const router = express.Router();

// TODO: memberverify_TASK_MODULE_UNDERSTANDING_BASICS - Reroute all API requests beginning with the `/v1/users` route to Express router in user.route.js

router.use("/users", userRoute);
router.use("/auth", authRoute);

module.exports = router;
