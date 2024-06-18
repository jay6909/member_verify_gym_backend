const Joi = require("joi");
const { password } = require("./custom.validation");
const { isMobilePhone } = require("validator");

/**
 * Check request *body* for fields (all are *required*)
 * - "email" : string and satisyfing email structure
 * - "password": string and satisifes the custom password structure defined in "src/validations/custom.validation.js"
 * - "name": string
 */
const register = {
  body: Joi.object().keys({
    // phone: Joi.string().required().pattern(),
    phone: Joi.string()
      .required()
      .pattern(/^[0-9]{10,15}$/)
      .messages({
        "string.pattern.base":
          "Phone number must be between 10 and 15 digits long and contain only numbers.",
      }),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    gender: Joi.string().required().valid("male", "female", "other").messages({
      "any.only": "Gender must be one of [male, female, other].",
    }),
    role: Joi.string().required().valid("owner", "member").messages({
      "any.only": "Role must be one of [owner, member].",
    }),
  }),
};

/**
 * Check request *body* for fields (all are *required*)
 * - "email" : string and satisyfing email structure
 * - "password": string and satisifes the custom password structure defined in "src/validations/custom.validation.js"
 */
const login = {
  body: Joi.object().keys({
    phone: Joi.string()
      .required()
      .pattern(/^[0-9]{10,15}$/)
      .messages({
        "string.pattern.base":
          "Phone number must be between 10 and 15 digits long and contain only numbers.",
      }),
    password: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
};
