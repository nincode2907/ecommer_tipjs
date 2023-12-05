'use strict';

const apikeyModel = require("../models/apiKey.model");

const crypto = require('crypto');

class ApiKeyService {

    static createApiKey = async () => {
        const apiKey = await crypto.randomBytes(64).toString('hex');
        const apiKeyCreate = await apikeyModel.create({apiKey, status: 'active', permissions: ['0000']});

        return apiKeyCreate
    }

    static findApiKey = async ( apiKey ) => {
        const apiKeyFind = await apikeyModel.findOne({apiKey, status: 'active'});
        return apiKeyFind         
    }
}

module.exports = ApiKeyService;