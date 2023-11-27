'use strict';

const {Schema, Types, model} = require('mongoose'); 

const DOCUMENT_NAME = 'keyToken'
const COLLECTION_NAME = 'keyTokens'

var keyTokenSchema = new Schema({
    shop:{
        type: Types.ObjectId,
        required: true,
        ref: 'shop'
    },
    publicKey:{
        type: String,
        required: true,
    },
    refreshToken:{
        type: Array,
        default: []
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, keyTokenSchema);