'use strict';

const {Schema, model} = require('mongoose'); 

const DOCUMENT_NAME = 'apiKey'
const COLLECTION_NAME = 'apiKeys'

var apiKeySchema = new Schema({
    apiKey:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        enum:['active', 'inactive'],
        default:'active',
    },
    permissions:{
        type: [String],
        require: true,
        enum: ['0000','1111','2222'],
        default: []
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, apiKeySchema);