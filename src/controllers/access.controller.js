'use strict';

const { CreatedResponse, OkayResponse } = require("../middlewares/success.response");
const AccessService = require("../services/access.service");

class AccessController {
    signUp = async (req, res, next) => {
        console.log("signup:::", req.body);
        new CreatedResponse(await AccessService.signUp(req.body)).send(res);
    }

    login = async (req, res, next) => {
        console.log("login:::", req.body);
        new OkayResponse(await AccessService.login(req.body)).send(res);
    }

    logout = async (req, res, next) => {
        new OkayResponse(await AccessService.logout(req.keyStore)).send(res);
    }
}

module.exports = new AccessController()