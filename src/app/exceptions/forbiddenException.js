const HttpStatusCode = require('../helpers/httpStatusCode');
const Exception = require('./exception');
module.exports = class ForbiddenException extends Exception {
    constructor(message) {
        super(message, HttpStatusCode.FORBIDDEN);
    }
}