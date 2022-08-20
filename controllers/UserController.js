const User = require("../models/UserModel");
const dataValidation = require("../helpers/DataValidation")
const bcrypt = require("bcryptjs")

exports.signup = async (req, res) => {

    const validateDataResult = dataValidation.signupValidationSchema.validate(req.body)
    if (validateDataResult['error']) return res.status(400).send(JSON.stringify({error: `${validateDataResult['error'].message}`}))

    //check if email exists
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send(JSON.stringify({error: `User SignUp Failed`, cause: `Email already exists!`}))

    //check if username exists
    const usernameExist = await User.findOne({username: req.body.username});
    if (emailExist) return res.status(400).send(JSON.stringify({error: `User SignUp Failed`, cause: `Username already exists!`}))

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        username: req.body.username,
        email: req.body.email,
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
    let user = await User.findOne({email: req.body.id});

    if (!user){
        user = await User.findOne({username: req.body.id});
        if (!user) return res.status(400).send(JSON.stringify({error: `Login Failed`, cause: `We couldn't find any account matching the details provided.`}))
    }

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send(JSON.stringify({error: `Login Failed`, cause: `We couldn't find any account matching the details provided.`}))

    res.status(200).send(JSON.stringify({success: `Logged in!`}))
}