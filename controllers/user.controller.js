const User = require("../models/user.model");
const dataValidation = require("../helpers/DataValidation")
const bcrypt = require("bcryptjs")
const jwt =  require('../middlewares/jwt.middleware')

exports.signup = async (req, res) => {

    const validateDataResult = dataValidation.signupValidationSchema.validate(req.body)
    if (validateDataResult['error']) return res.status(400).send(JSON.stringify({error: `${validateDataResult['error'].message}`}))

    //check if email exists
    const emailExist = await User.findOne({email: req.body.email.toLowerCase()});
    if (emailExist) return res.status(400).send(JSON.stringify({error: `User SignUp Failed`, cause: `Email already exists!`}))

    //check if username exists
    const usernameExist = await User.findOne({username: req.body.username});
    if (usernameExist) return res.status(400).send(JSON.stringify({error: `User SignUp Failed`, cause: `Username already exists!`}))

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        username: req.body.username,
        username_lower: req.body.username.toLowerCase(),
        email: req.body.email.toLowerCase(),
        password: hashedPassword
    })
    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch (err) {
        res.status(400).end(JSON.stringify({"error-code": `400`, "error": `${err}`}))
    }

}
exports.login = async (req, res) => {

    const validateDataResult = dataValidation.loginValidationSchema.validate(req.body)
    if (validateDataResult['error']) return res.status(400).send(JSON.stringify({error: `${validateDataResult['error'].message}`}))

    //check if email exists
    let user = await User.findOne({email: req.body.id.toLowerCase()});

    if (!user){
        user = await User.findOne({username_lower : req.body.id.toLowerCase()});
        if (!user) return res.status(400).send(JSON.stringify({error: `Login Failed`, cause: `We couldn't find any account matching the details provided.`}))
    }

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send(JSON.stringify({error: `Login Failed`, cause: `We couldn't find any account matching the details provided.`}))

    let details = {
        id : user._id,
        username : user.username,
        email : user.email,
        time : Date.now
    }


    const token = jwt.createToken(req, res, details)
    details = Object.assign(details, {"auth-token" : token})

    res.status(200).header('x-auth-token', token).send(JSON.stringify({success: `Logged in!`, data: details}))
}