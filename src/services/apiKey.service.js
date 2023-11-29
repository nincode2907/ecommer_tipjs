'use strict';

const apikeyModel = require("../models/apiKey.model");

const crypto = require('crypto');

class ApiKeyService {

    static createApiKey = async () => {
        try {
            const apiKey = await crypto.randomBytes(64).toString('hex');
            const apiKeyCreate = await apikeyModel.create({apiKey, status: 'active', permissions: ['0000']});

            return apiKeyCreate
        } catch (error) {
            return {
                code: 'check_api_key',
                message: error.message
            }
        }
    }

    static findApiKey = async ( apiKey ) => {
        try {
            const apiKeyFind = await apikeyModel.findOne({apiKey, status: 'active'});
            return apiKeyFind         
        } catch (error) {
            return {
                code: 'check_api_key',
                message: error.message
            }
        }
    }
}

module.exports = ApiKeyService;