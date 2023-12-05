'use strict';

const JWT = require('jsonwebtoken');
const { UnauthorizedError } = require('../middlewares/error.response');

const createTokenPair = async (payload, publicKey, privateKey) => {
    const accessToken = await JWT.sign(payload, privateKey, {
        algorithm: 'RS256',
        expiresIn: '2 days'
    })
    
    const refreshToken = await JWT.sign(payload, privateKey, {
        algorithm: 'RS256',
        expiresIn: '7 days'
    })
    
    // JWT.verify(accessToken, publicKey, { algorithms: 'RS256' }, (err, decoded) => {
    //     if (err) {
    //         console.error('Xác thực thất bại:', err);
    //         throw new UnauthorizedError('Verify failed')
    //     } else {
    //         console.log('Thông tin xác thực:', decoded);
    //     }
    // });
    
    return {accessToken, refreshToken};
}

module.exports = {
    createTokenPair
}