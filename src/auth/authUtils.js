'use strict';

const JWT = require('jsonwebtoken');

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = await JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '2 days'
        })
        
        const refreshToken = await JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '7 days'
        })
        
        JWT.verify(accessToken, publicKey, { algorithms: 'RS256' }, (err, decoded) => {
            if (err) {
              console.error('Xác thực thất bại:', err);
            } else {
              console.log('Thông tin xác thực:', decoded);
            }
          });
        
        return {accessToken, refreshToken};
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    createTokenPair
}