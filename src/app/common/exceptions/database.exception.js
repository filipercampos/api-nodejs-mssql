'use strict';
const HttpStatusCode = require('../helpers/http-status-code');
const ObjectUtil = require('../utils/object.util');
/**
 * Database Exception
 * @author Filipe Campos
 */
module.exports = class DatabaseException {
  constructor(description, error, code = 500) {
    const isObj = typeof error === 'object';
    this.internalMessage = {
      sp: description,
      error: isObj ? error.message : error,
      lineNumber: isObj ? error.lineNumber : undefined,
      state: isObj ? error.state : undefined,
    };
    if (error.number == 50000) {
      this.message = error.message; //or originalError;
      code = HttpStatusCode.UNPROCESSABLE_ENTITY;
    } else {
      this.message = `${this.internalMessage.error} Line ${this.internalMessage.lineNumber}`;
    }
    this.code = code || HttpStatusCode.INTERNAL_SERVER_ERROR;
    this.status = ObjectUtil.getKeyFromObject(HttpStatusCode, this.code);
  }
};
