const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");

mongoose.connect(config.mongoose.url).then(() => {
  console.log("Connected to MongoDB");

  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
});
