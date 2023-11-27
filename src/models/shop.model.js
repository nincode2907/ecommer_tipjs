'use strict';

const {Schema, Types, model} = require('mongoose'); 

const DOCUMENT_NAME = 'shop'
const COLLECTION_NAME = 'shops'

var shopSchema = new Schema({
    name:{
        type:String,
        required:true,
        maxLength:150,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:['active', 'inactive'],
        default:'inactive',
    },
    verify:{
        type: Boolean,
        default:false,
    },
    role:{
        type:Array,
        default:[]
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, shopSchema);