const Joi = require("joi");

exports.signupValidationSchema = Joi.object({
    username: Joi.string().min(5).max(15).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required(),
})

exports.loginValidationSchema = Joi.object({
    id: Joi.string().required(),
    password: Joi.string().min(8).required(),
})