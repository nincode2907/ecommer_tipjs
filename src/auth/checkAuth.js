'use strict';

const JWT = require('jsonwebtoken')
const { ForbiddenError, ErrorResponse, UnauthorizedError } = require("../middlewares/error.response");
const ApiKeyService = require("../services/apiKey.service");
const KeyTokenService = require("../services/keyToken.service");
const { asyncFunction } = require("../utils/index.util");

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization',
    CLIENT_ID : 'x-client-id'
}

const checkApiKey = async (req, res, next) => {
    const key = req.headers[HEADER.API_KEY]?.toString();

    if(!key) throw new ForbiddenError('Forbidden error!')

    const objKey = await ApiKeyService.findApiKey(key);

    if(!objKey) throw new ForbiddenError('Forbidden error!')

    req.objKey = objKey;
    return next();
}

const checkPermissions = ( permission ) => {
    return (req, res, next) => {
        try {
            if (!req.objKey || !req.objKey.permissions || !req.objKey.permissions.includes(permission)) {
                throw new ForbiddenError('Permission denied!');
            }
            return next();
        } catch (error) {
            return next(error);
        }
    }
}

const authentication = async (req, res, next) => {
    /*
        1/ check userid missing?
        2/ get token from db by userid
        3/ verify access token
        4/ return
    */

    const userId = req.headers[HEADER.CLIENT_ID]
    console.log(typeof(userId));
    if(!userId) throw new UnauthorizedError('Not found client id');

    const keyStore = await KeyTokenService.findKeyById(userId);
    if(!keyStore) throw new UnauthorizedError('Not found client');

    const accessToken = req.headers[HEADER.AUTHORIZATION]?.toString()
    if(!accessToken) throw new UnauthorizedError('Not found accessToken')

    await JWT.verify(accessToken, keyStore.publicKey, (err, result) => {
        if(err) {
            console.log('Failed to verify');
            throw new UnauthorizedError('Verification failed')
        } else {
            console.log('Successfully verify');
            req.keyStore = keyStore
            return next()
        }
    })
}

module.exports = {
    checkApiKey,
    checkPermissions,
    authentication
}