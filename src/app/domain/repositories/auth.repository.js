const mssql = require('mssql');
const BaseRepository = require('./base.repository');
const UserRepository = require('./user.repository');
const {
  UnauthorizedException,
  ForbiddenException,
} = require('../../common/exceptions');
const UserModel = require('../models/user.model');

module.exports = class AuthRepository extends BaseRepository {
  constructor() {
    super();
  }

  /**
   * Auth user database
   *
   * @param {AuthDto} body
   * @returns {Promise<UserModel>}
   */
  async auth(body) {
    try {
      this.log('accessToken');
      const conn = await this.openConnection();
      const sqlText = this.getSqlText('auth-user.get');
      const result = await conn
        .request()
        .input('Email', mssql.VarChar(120), body.username)
        .input('Password', mssql.VarChar(128), body.password)
        .query(sqlText);

      const user = this.toFirst(result);
      if (!user) {
        throw new UnauthorizedException('User or password invalid');
      }
      return user;
    } catch (error) {
      this.handleError(error, 'auth');
    }
  }

  /**
   * @param {any} params
   */
  async validateToken(params) {
    try {
      this.log('refreshToken');
      const userRepository = new UserRepository();
      //check user from token
      const user = await userRepository.findById(params.id);
      return user;
    } catch (error) {
      this.handleError(new ForbiddenException(error.message), 'refreshToken');
    }
  }
};
