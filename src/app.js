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
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// init database
require('./dbs/init.mongodb');
// const { countConnect, overloadedConnect }  = require('./helpers/check.connection');

// overloadedConnect();

// init routes
app.use('', require('./routes'));

// handle error
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        code: 'error',
        status: error.status,
        message: error.message || 'Internal Server'
    })
})

// handle functions

module.exports = app;