'use strict';

const keyTokenModel = require("../models/keyToken.model");

class KeyTokenService {

    static createKeyToken = async ({shopId, publicKey}) => {
        const publicKeyString = publicKey.toString();
        const token = await keyTokenModel.create({
            shop: shopId,
            publicKey: publicKeyString
        });

        return token ? token.publicKey : null;
    }
    
}

module.exports = KeyTokenService;