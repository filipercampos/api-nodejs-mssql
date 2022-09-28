const Exception = require('./exception');
const HttpStatusCode = require('../helpers/http-status-code');
module.exports = class UnauthorizedException extends Exception {
  constructor(message) {
    super(message, HttpStatusCode.UNAUTHORIZED);
  }
};
