const express = require('express');
const app = express(); // Create an ExpressJS app
const dotenv = require('dotenv').config({path:'./config/local.env'})
const mongoose =  require('mongoose')

const path = require('path');
const serverless = require('serverless-http');
const layouts = require("express-ejs-layouts")
const bodyParser = require('body-parser');

//Import Routes
const authRoute =  require('./routes/auth.route')
const postRoute =  require('./routes/post.route')


//Connect to DB
mongoose.connect(process.env.MONGODB_CONNECT, ()=>{console.log('DB connected!')})

//Middlewares
app.set("view engine", "ejs")
app.use(express.static('views'));
app.use(layouts)
app.use(express.json())

//Route Middlewares
app.use('/api/user/', authRoute)
app.use('/api/kwibs/', postRoute)





module.exports = app;
module.exports.handler = serverless(app);