'use strict';
const { ResponseHelper } = require('../common/helpers');
const AuthService = require('../domain/services/auth.service');
/**
 * Get access token
 */
module.exports.accessToken = async (req, res) => {
  try {
    const service = new AuthService();
    const result = await service.accessToken(req.body);
    ResponseHelper.sendSuccess(res, result);
  } catch (err) {
    ResponseHelper.sendError(res, err);
  }
};
/**
 * Refresh token
 */
module.exports.refreshToken = async (req, res) => {
  try {
    const service = new AuthService();
    const result = await service.refreshToken(req.security);
    ResponseHelper.sendSuccess(res, result);
  } catch (err) {
    ResponseHelper.sendError(res, err);
  }
};
