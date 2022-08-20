//Authentication Routes
const router = require('express').Router();
const User = require('../models/UserModel')
const Joi = require('joi')
const UserController = require("../controllers/UserController");


router.post('/signup', UserController.signup)
router.post('/login', UserController.login)


module.exports = router;