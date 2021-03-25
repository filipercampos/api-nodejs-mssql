const HttpStatusCode = require('../helpers/httpStatusCode');
const Exception = require('./exception');

module.exports = class NotFoundException extends Exception {
    constructor(message) {
        super(message, HttpStatusCode.NOT_FOUND);
    }
}