'use strict';

const shopModel = require("../models/shop.model");
const bcrypt = require('bcrypt');
const { time, timeLog, log } = require("console");
const crypto = require('crypto');
const KeyTokenService = require("./keyToken.service");
const { createTokenPair }  = require('../auth/authUtils');
const { getInforObject }  = require('../utils/index.util');
const { ConflicError, UnauthorizedError } = require("../middlewares/error.response");
const { OkayResponse } = require("../middlewares/success.response");


const SHOP_ROLES = {
    SHOP: 'shop',
    WRITER: 'writer',
    ADMIN: 'admin'
}

class AccessService {
    static signUp = async ({name, email, password}) => {
        const shopCheck = await shopModel.findOne({email}).lean();
        if(shopCheck) throw new ConflicError('Shop email already registered!')

        const passwordHash = await bcrypt.hash(password, 10);
        const shop = await shopModel.create(
            {name, email, password: passwordHash, roles: [SHOP_ROLES.ADMIN]}
        )

        if(shop) {
            

            // const publicKeyString = await KeyTokenService.createKeyToken({
            //     shopId: shop._id,
            //     publicKey
            // });

            // if(!publicKeyString) {
            //     throw new UnauthorizedError('Can not create public token!');
            // }

            // const tokens = await createTokenPair(
            //     {shopId: shop._id, email},
            //     publicKeyString,
            //     privateKey
            // );

            // if(!tokens) {
            //     throw new UnauthorizedError('Can not create tokens pair!');
            // }

            return {
                message: 'Sign up successfully!',
                metadata: {
                    shop: getInforObject(["_id", "name", "email"], shop),
                }
            }
        } else {
            throw new UnauthorizedError('Can not create shop!');
        }
    }

    static login = async ({ email, password, refreshToken = null }) => {

        /*
            1/ check email
            2/ check password
            3/ generate key
            4/ create token pair
            5/ return information
        */

        const shopCheck = await shopModel.findOne({ email }).lean();
        if(!shopCheck) throw new UnauthorizedError('Shop email not exist');

        const passwordCheck = await bcrypt.compare(password, shopCheck.password);
        if(!passwordCheck) throw new UnauthorizedError('Password not match');

        const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type:'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem'
            }
        });

        const tokens = await createTokenPair(
            {shopId: shopCheck._id, email},
            publicKey.toString(),
            privateKey.toString()
        );

        await KeyTokenService.createKeyToken({shopId: shopCheck._id, publicKey: publicKey.toString(), privateKey: privateKey.toString(), refreshToken: tokens.refreshToken});

        return {
            message: 'Login successfully!',
            metadata: {
                shop: getInforObject(["_id", "name", "email"], shopCheck),
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
            }
        }

    }

    static logout = async ( keyStore ) => {
        return {
            message: 'Logout successfully',
            metadata: await KeyTokenService.removeKey(keyStore._id)
        }
    }
}

module.exports = AccessService;