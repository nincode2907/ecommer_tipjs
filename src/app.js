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
const instanceMongoDB  = require('./dbs/init.mongodb');
const { countConnect, overloadedConnect }  = require('./helpers/check.connection');

// overloadedConnect();

// init routes
app.use('', require('./routes'));

// handle functions

module.exports = app;