const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min: 4,
        max: 15
    },
    username_lower:{
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
    password:{
        type: String,
        required: true,
        min: 8,
        max: 2048
    },
    date:{
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('User', userSchema)