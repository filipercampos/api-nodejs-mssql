const AuthRepository = require('../repositories/auth.repository');
const JwtUtil = require('../../common/utils/jwt.util');
const BaseService = require('./base.service');
const UserModel = require('../models/user.model');

module.exports = class AuthService extends BaseService {
  constructor() {
    super();
    this._repository = new AuthRepository();
  }

  /**
   * Auth and get token
   * @param {AuthDto} body
   */
  async accessToken(body) {
    const result = await this._repository.auth(body);
    //generate token
    const token = await this._generateTokenJWT(result);
    return token;
  }

  /**
   * Refresh token
  
   * @param {any} user Token decoded
   */
  async refreshToken(user) {
    const result = this._repository.validateToken(user);
    //generate token
    const token = await this._generateTokenJWT(result);
    return token;
  }
  /**
   * Generate token from user data
   * @param {UserModel} user
   */
  async _generateTokenJWT(user) {
    //token data
    const encode = {
      id: user.id,
      name: user.firstName,
    };
    //generate token
    const token = await JwtUtil.sign(encode);
    return { token };
  }
};
