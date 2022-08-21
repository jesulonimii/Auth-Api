const Joi = require("joi");

exports.signupValidationSchema = Joi.object({
    username: Joi.string().min(4).max(15).regex(/^[\w_]+$/).required().messages({
        "string.pattern.base": "username cannot contain spaces and special characters except '_'"
    }),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required()
})

exports.loginValidationSchema = Joi.object({
    id: Joi.string().required(),
    password: Joi.string().min(8).required()
})