'use strict';

const { UnauthorizedError, BadRequestError } = require("../middlewares/error.response");
const keyTokenModel = require("../models/keyToken.model");

class KeyTokenService {

    static createKeyToken = async ({shopId, publicKey, privateKey, refreshToken = null}) => {
        // const publicKeyString = publicKey.toString();
        // const privateKeyString = privateKey.toString();
        // const token = await keyTokenModel.create({
        //     shop: shopId,
        //     publicKey: publicKeyString
        // });

        // return token ? token.publicKey : null;

        const filter = {shop: shopId}, update = {
            publicKey, privateKey, refreshTokensUsed: [], refreshToken
        }, options = { upsert: true, new: true };

        const keyToken = await keyTokenModel.findOneAndUpdate(filter, update,options);
        if(!keyToken) throw new BadRequestError('Can not created key token');
    }

    static findKeyById = async ( shopId ) => {
        const keyStore = await keyTokenModel.findOne({shop: shopId}).lean()
        return keyStore
    }

    static removeKey = async (id) => {
        return await keyTokenModel.deleteOne({_id: id})
    }
    
}

module.exports = KeyTokenService;