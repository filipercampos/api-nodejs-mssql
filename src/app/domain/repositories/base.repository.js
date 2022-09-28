'use strict';

const mssql = require('mssql');
const appConfig = require('../../../infra/config/app.config');
const { DatabaseException, Exception } = require('../../common/exceptions');
const fs = require('fs');
const path = require('path');
const ArrayUtil = require('../../common/utils/array.util');
const LoggerBuilder = require('../../../infra/logger/logger.builder');
const BaseMapper = require('../models/base.mapper');

/**
 * Database access layer
 */
module.exports = class BaseRepository {
  /**
   * @param {BaseMapper} mapper
   */
  constructor(mapper) {
    this._logger = new LoggerBuilder(this);
    this._mapper = mapper;
  }

  /**
   * Create connection pool
   */
  async openConnection() {
    const pool = new mssql.ConnectionPool(appConfig.mssqlConfig).connect();
    return await pool;
  }

  /**
   * Create connection pool
   * @param {{mssql.config}} config Database config
   */
  async openConnectionConfig(config) {
    if (!config) {
      throw new Error('Environment database config not found');
    }
    const pool = new mssql.ConnectionPool(config).connect();
    return await pool;
  }

  /**
   * Read file from name in directory sql
   * ```
   * '../sql/file.sql';
   * ```
   * Use
   * @param {string} sqlFile Path do arquivo
   * @return {string}
   */
  getSqlText(sqlFile) {
    try {
      const file = sqlFile.includes('.sql') ? sqlFile : sqlFile + '.sql';
      const sqlText = fs.readFileSync(path.join(__dirname, `../sql/${file}`), {
        encoding: 'utf8',
      });
      return sqlText;
    } catch (err) {
      this._logger.error(`getSqlText.${err.message}`);
      throw new Exception('Internal error');
    }
  }

  /**
   * Check array has data
   *
   * @param {Array} result
   * @returns {boolean} true empty or false
   */
  isResultEmpty(result) {
    return ArrayUtil.isEmpty(result);
  }

  /**
   * Get first object of array
   *
   * @param {object} result
   * @param {Function} fnMapper Mapper function
   * @returns {object} Entity
   */
  toFirst(result, fnMapper) {
    const value = ArrayUtil.toFirst(result);
    if (fnMapper) {
      return fnMapper(value);
    }
    if (this._mapper) {
      return this._mapper.toModel(value);
    }
    return value;
  }

  /**
   * Mapper response to model
   * @param Array result Array<T>
   * @param Function model Mapper function.toModel
   * @returns {Array<T>} Array
   */
  getResponse(result, fnMapper) {
    if (this.isResultEmpty(result)) {
      return [];
    }
    const results = ArrayUtil.toArray(result);
    if (fnMapper) {
      return results.map((i) => fnMapper(i));
    } else if (this._mapper) {
      return results.map((i) => this._mapper.toModel(i));
    }
    return results;
  }

  /**
   * Mapper response to model with key: results: []
   *
   * @param Array<T> result Recordset
   * @param any model Model
   * @returns {Array<T>} Array
   */
  getResponseResults(result, fnMapper) {
    if (this.isResultEmpty(result)) {
      return [];
    }
    let results = ArrayUtil.toArray(result);
    if (fnMapper) {
      let mapper = results.map((i) => fnMapper.toModel(i));
      results = mapper;
    } else if (this._mapper) {
      let mapper = results.map((i) => this._mapper.toModel(i));
      results = mapper;
    }
    return results;
  }

  /**
   * Drop temp table
   *
   * @param {mssql.ConnectionPool} conn SQL Connection
   * @param string Table name
   */
  async dropTempTable(conn, tableName) {
    try {
      const batchSql = `IF OBJECT_ID('tempdb..${tableName}') IS NOT NULL 
                            DROP TABLE ${tableName}
                          `;
      await conn.request().batch(batchSql);
    } catch (error) {
      this._logger.error(error.message);
    }
  }

  /**
   * Std log and throw exception
   *
   * @param {any} error
   * @param {string} funcName
   * @param {string} spName
   * @throws {Exception}
   * @throws {DatabaseException}
   */
  handleError(error, funcName = 'error', spName) {
    this._logger.error(`${funcName}:${spName || ''} ${error.message}`);
    if (error.code == 'EREQUEST' || error.class) {
      throw new DatabaseException(spName ?? 'SqlText', error);
    }
    if (error instanceof Exception) throw error;
    if (spName) {
      let code = HttpStatusCode.INTERNAL_SERVER_ERROR;
      if (error.state === 1) {
        code = HttpStatusCode.BAD_REQUEST;
      } else if (error.state === 2) {
        code = HttpStatusCode.UNPROCESSABLE_ENTITY;
      }
      throw new DatabaseException(spName, error, code);
    }

    throw error;
  }

  /**
   * Logger
   * @param string log
   */
  log(log) {
    this._logger.log(log);
  }
};
