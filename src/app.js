require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

const app = express();

// init middlewares
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

// init database
const instanceMongoDB  = require('./dbs/init.mongodb');
const { countConnect, overloadedConnect }  = require('./helpers/check.connection');

// overloadedConnect();

// init routes
app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Hello World!', 
    });
})

// handle functions

module.exports = app;