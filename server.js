'use strict';

const dotenv = require('dotenv').config({path: __dirname + '/config/local.env'})
const express = require('express');
const path =  require('path')
const app = require(path.resolve("app.js"));





const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Kwibblet API is live on port:${port}`)
});