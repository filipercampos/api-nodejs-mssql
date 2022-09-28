const Exception = require('./exception');
const HttpStatusCode = require('../helpers/http-status-code');
module.exports = class NotFoundException extends Exception {
  constructor(message) {
    super(message, HttpStatusCode.NOT_FOUND);
  }
};
