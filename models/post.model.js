const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min: 5,
        max: 15
    },
    email:{
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    title:{
        type: String,
        required: true,
        min: 8
    },
    content:{
        type: String,
        required: true,
        min: 8
    },
    date:{
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Post', postSchema)