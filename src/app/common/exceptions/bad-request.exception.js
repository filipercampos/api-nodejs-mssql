'use strict';
const Exception = require('./exception');
const HttpStatusCode = require('../helpers/http-status-code');
module.exports = class BadRequestException extends Exception {
  constructor(message) {
    super(message, HttpStatusCode.BAD_REQUEST);
  }
};
