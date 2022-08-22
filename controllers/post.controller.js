const Post = require("../models/post.model");
const dataValidation = require("../helpers/DataValidation")

exports.create = (req, res) =>{
    res.send('create post')
}
exports.fetch = (req, res) =>{
    res.send(req.user)
}

exports.edit = (req, res) =>{
    res.send('editing post')
}

exports.delete = (req, res) =>{
    res.send('deleting post')
}