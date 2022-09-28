'use strict';
const mssql = require('mssql');
const BaseRepository = require('./base.repository');
const UserModel = require('../models/user.model');
const PostUserDto = require('../dto/post-user.dto');
const GetUserDto = require('../dto/get-user.dto');
const PatchUserDto = require('../dto/patch-user.dto');
module.exports = class UserRepository extends BaseRepository {
  constructor() {
    super(new UserModel());
  }

  /**
   * Get user by id
   *
   * @param {number} id
   */
  async findById(id) {
    try {
      const sqlText = this.getSqlText('user.get.sql');
      const conn = await this.openConnection();
      const result = await conn
        .request()
        .input('UserID', mssql.Int, id)
        .input('FirstName', mssql.VarChar(40), null)
        .query(sqlText);
      const user = this.toFirst(result);
      return user;
    } catch (err) {
      this.handleError(err, 'findById');
    }
  }

  /**
   * Get users from query
   * @param {GetUserDto}
   * @returns {Promise<UserModel>}
   */
  async find(query) {
    try {
      this.log('find');
      const sqlText = this.getSqlText('user.get.sql');
      const conn = await this.openConnection();
      const result = await conn
        .request()
        .input('UserID', mssql.Int, null)
        .input('FirstName', mssql.VarChar(40), query.name + '%')
        .query(sqlText);
      return this.getResponseResults(result);
    } catch (err) {
      this.handleError(err, 'find');
    }
  }

  /**
   * Save user
   *
   * @param {PostUserDto} body
   */
  async post(body) {
    try {
      this.log('post');
      const sqlText = this.getSqlText('user.post');
      const conn = await this.openConnection();
      const result = await conn
        .request()
        .input('NickName', mssql.VarChar(40), body.nickName)
        .input('FirstName', mssql.VarChar(40), body.firstName)
        .input('LastName', mssql.VarChar(40), body.lastName)
        .input('Email', mssql.VarChar(120), body.email)
        .input('Password', mssql.NVarChar(128), body.password)
        .query(sqlText);
      return result.recordset[0][''];
    } catch (err) {
      this.handleError(err, 'query:post');
    }
  }

  /**
   * Update partial user data
   *
   * @param {number} id
   * @param {PatchUserDto} body
   */
  async patch(id, body) {
    this.log('patch');
    try {
      const sqlText = this.getSqlText('user.patch');
      const conn = await this.openConnection();
      await conn
        .request()
        .input('UserId', mssql.Int, id)
        .input('FirstName', mssql.VarChar(40), body.firstName)
        .input('LastName', mssql.VarChar(40), body.lastName)
        .query(sqlText);
      return true;
    } catch (err) {
      this.handleError(err, 'query:patch');
    }
  }
};
