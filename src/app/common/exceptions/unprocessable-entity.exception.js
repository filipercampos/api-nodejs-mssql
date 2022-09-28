const Exception = require('./exception');
const HttpStatusCode = require('../helpers/http-status-code');
module.exports = class UnprocessableEntityException extends Exception {
  constructor(message) {
    super(message, HttpStatusCode.UNPROCESSABLE_ENTITY);
  }
};
