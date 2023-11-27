'use strict';

const shopModel = require("../models/shop.model");
const bcrypt = require('bcrypt');
const { time, timeLog, log } = require("console");
const crypto = require('crypto');
const KeyTokenService = require("./keyToken.service");
const { createTokenPair }  = require('../auth/authUtils');
const { getInforObject }  = require('../utils/index.util');

const SHOP_ROLES = {
    SHOP: 'shop',
    WRITER: 'writer',
    ADMIN: 'admin'
}

class AccessService {
    static signUp = async ({name, email, password}) => {
        try {

            const shopCheck = await shopModel.findOne({email}).lean();
            if(shopCheck) {
                return {
                    code: 'exits_email',
                    message: 'Shop email already exists!'
                }
            }

            const passwordHash = await bcrypt.hash(password, 10);
            const shop = await shopModel.create(
                {name, email, password: passwordHash, roles: [SHOP_ROLES.ADMIN]}
            )

            if(shop) {
                const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        type: 'spki',
                        format: 'pem'
                    },
                    privateKeyEncoding: {
                        type: 'pkcs8',
                        format: 'pem'
                    }
                });

                const publicKeyString = await KeyTokenService.createKeyToken({
                    shopId: shop._id,
                    publicKey
                });

                if(!publicKeyString) {
                    return {
                        code: 'error_signup',
                        message: 'Error creating public key!'
                    }
                }

                const tokens = await createTokenPair(
                    {shopId: shop._id, email},
                    publicKeyString,
                    privateKey
                );

                if(!tokens) {
                    return {
                        code: 'error_signup',
                        message: 'Error creating tokens Pair!'
                    }
                }

                return {
                    code:'success_signup',
                    message: 'Sign up successfully!',
                    metadata: {
                        shop: getInforObject(["_id", "name", "email"], shop),
                        accessToken,
                        refreshToken
                    }
                }
            }

            return {
                code: 'error_signup',
                message: 'Error creating shop!'
            }

        } catch (error) {
            return {
                code: 'error_signup',
                message: error.message
            }
        }
    }
}

module.exports = AccessService;