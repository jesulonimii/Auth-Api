const jwt = require('jsonwebtoken')

exports.verifyToken = (req, res, next) =>{
    const token = req.headers['x-auth-token']
    if (!token) return res.status(400).send(JSON.stringify({error: `Access Denied`, cause: `You are not authorized to access this endpoint.`}))


    try {
        const verified = jwt.verify(token, process.env.JWT_TOKEN_SECRET)
        req.user = verified;
        next()
    }
    catch (err) {
        res.status(400).send(JSON.stringify({error: `Access Denied`, cause: `Invalid Access Token`}))
    }
}

exports.createToken= (req, res, data) => {
    const token = jwt.sign(data, process.env.JWT_TOKEN_SECRET)

    return token
}