'use strict';

const BaseController = require('./baseController');
const AuthRepository = require('../domain/repositories/authRepository');
const swaggerHelper = require('../helpers/swaggerHelper');
const repository = new AuthRepository();
class AuthController extends BaseController {
    constructor() {
        super(repository);
    }

    /**
     * Realiza o login e retorna um token
     */
    async accessToken(req, res) {
        try {

            swaggerHelper.validateBody(req, ['username', 'password']);
            let result = await repository.accessToken(req.body);
            super.sendSuccess(res, result);
        } catch (err) {
            super.sendError(res, err);
        }
    }
    /**
     * Renova o token
     */
    async refreshToken(req, res) {
        try {
            let result = await repository.refreshToken(req.security);
            super.sendSuccess(res, result);
        } catch (err) {
            super.sendError(res, err);
        }
    }
}
module.exports = new AuthController();