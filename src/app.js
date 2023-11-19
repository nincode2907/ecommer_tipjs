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

// init routes
app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Hello World!', 
        metadata: 'Kim Ngoc'.repeat(300)
    });
})

module.exports = app;