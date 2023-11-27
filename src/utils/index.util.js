'use strict'
const _ = require('lodash')

const getInforObject = (feilds=[], object={}) => {
    return _.pick(object, feilds)
}

module.exports = {
    getInforObject
}