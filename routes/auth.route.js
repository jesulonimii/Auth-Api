//Authentication Routes
const router = require('express').Router();
const User = require('../models/user.model')
const Joi = require('joi')
const UserController = require("../controllers/user.controller");


router.post('/signup', UserController.signup)
router.post('/login', UserController.login)


module.exports = router;