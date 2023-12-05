'use strict'
const _ = require('lodash')

const getInforObject = (feilds=[], object={}) => {
    return _.pick(object, feilds)
}

const asyncFunction = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next)
    }
}

module.exports = {
    getInforObject,
    asyncFunction,
}