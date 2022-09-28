const HttpStatusCode = require('../helpers/http-status-code');
const Exception = require('./exception');
module.exports = class InternalErrorException extends Exception {
    constructor(message) {
        super(message, HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
}