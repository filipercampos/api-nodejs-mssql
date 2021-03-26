'use strict';
const mssql = require('mssql');

const BaseRepository = require('./baseRepository');
const _ = require('lodash');
const UserModel = require('../models/usuarioModel');
module.exports = class UsuarioRepository extends BaseRepository {

  constructor() {
    super();
  }

  /**
   * Recupera os dados do usuário
   * 
   * @param {number} id 
   */
  async getById(id) {

    try {

      const sqlText = this.getSqlText('../sqls/usuario_get.sql') + ' WHERE UsuarioID = @UsuarioID'
      const conn = await this.openConnection();
      const result = await conn.request()
        .input('UsuarioID', mssql.Int, id)
        .query(sqlText);

      if (this.isResultEmpty(result)) {
        return null;
      }
      const user = this.toFirst(result, UserModel);
      return user;
    } catch (err) {
      this.handleQueryError(err);
    }
  }

  /**
   * Recupera os dados do usuário
   */
  async get(params) {

    try {

      const sqlText = this.getSqlText('../sqls/usuario_get.sql') + ' WHERE Nome LIKE @Nome ';
      const conn = await this.openConnection();
      const result = await conn.request()
        .input('NomeUsuario', mssql.VarChar(45), params.nomeUsuario + '%')
        .query(sqlText);

      return this.getResponse(result, UserModel);

    } catch (err) {
      this.handleError(err);
    }
  }

}