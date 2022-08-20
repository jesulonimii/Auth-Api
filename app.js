const express = require('express');
const app = express(); // Create an ExpressJS app
const dotenv = require('dotenv').config({path:'./config/local.env'})
const mongoose =  require('mongoose')

const path = require('path');
const serverless = require('serverless-http');
const layouts = require("express-ejs-layouts")
const bodyParser = require('body-parser'); // middleware

//Connect to DB
mongoose.connect(process.env.MONGODB_CONNECT, ()=>{console.log('DB connected!')})


//Import Routes
const authRoute =  require('./routes/auth')



app.set("view engine", "ejs")
app.use(express.static('views'));
app.use(layouts)


app.use('/api/user/', authRoute)




module.exports = app;
module.exports.handler = serverless(app);