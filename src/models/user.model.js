const mongoose = require("mongoose");
const validator = require("validator");
const config = require("../config/config");
const validate = require("../middlewares/validate");
const bcrypt = require("bcryptjs");

// TODO: memberverify_TASK_MODULE_UNDERSTANDING_BASICS - Complete userSchema, a Mongoose schema for "users" collection
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      enum: ["owner", "member"],
    },
    gender: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isMobilePhone(value)) {
          throw new Error("invalid phone number");
        }
      },
    },
    email: {
      type: String,
      required: false,
      trim: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email");
        }
      },
    },
    password: {
      type: String,
      requried: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
    },
    walletMoney: {
      type: Number,
      required: false,
      default: config.default_wallet_money,
    },
    address: {
      type: String,
      default: config.default_address,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },

  // Create createdAt and updatedAt fields automatically
  {
    timestamps: true,
  }
);

// TODO: memberverify_TASK_MODULE_UNDERSTANDING_BASICS - Implement the isEmailTaken() static method
/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email) {
  const user = await this.findOne({ email: email });
  return user;
};

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

// /**
//  * Check if user have set an address other than the default address
//  * - should return true if user has set an address other than default address
//  * - should return false if user's address is the default address
//  *
//  * @returns {Promise<boolean>}
//  */
// userSchema.methods.hasSetNonDefaultAddress = async function () {
//   const user = this;
//   return user.address !== config.default_address;
// };

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
