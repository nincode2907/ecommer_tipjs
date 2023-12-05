'use strict';

const express = require('express');
const AccessController = require('../../controllers/access.controller');

const { asyncFunction } = require('../../utils/index.util');
const { checkApiKey, checkPermissions, authentication } = require('../../auth/checkAuth');
const router = express.Router();

// check permissionsz
// router.use(checkPermissions('1111'))

router.post('/shop/signup',
    asyncFunction(checkApiKey),  //check api key
    checkPermissions('0000'),
    asyncFunction(AccessController.signUp)
);

router.post('/shop/login',
    asyncFunction(checkApiKey),  //check api key
    checkPermissions('0000'),
    asyncFunction(AccessController.login)
);

router.post('/shop/logout',
    asyncFunction(checkApiKey),  //check api key
    checkPermissions('0000'),
    asyncFunction(authentication),
    asyncFunction(AccessController.logout)
);


module.exports = router;