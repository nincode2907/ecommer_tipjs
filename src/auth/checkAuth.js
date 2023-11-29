'use strict';

const ApiKeyService = require("../services/apiKey.service");

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization',
}

const checkApiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();

        if(!key) {
            return res.status(403).json({
                code: 'check_api_key',
                message: 'Forbidden error!'
            })
        }

        const objKey = await ApiKeyService.findApiKey(key);

        if(!objKey) {
            return res.status(403).json({
                code: 'check_api_key',
                message: 'Forbidden error!'
            })
        }

        req.objKey = objKey;
        return next();
        
    } catch (error) {
        return {
            code: 'check_api_key',
            message: error.message
        }
    }
}

const checkPermissions = ( permission ) => {
    return (req, res, next) => {
        try {
            if(!req.objKey.permissions && !req.objKey?.permissions.includes(permission)) {
                return res.status(403).json({
                    code: 'check_api_key',
                    message: 'Permission denied!'
                })
            }

            return next();
        } catch (error) {
            return res.status(403).json({
                code: 'check_api_key',
                message: error.message
            })
        }
    }
}

module.exports = {
    checkApiKey,
    checkPermissions
}