const HttpStatusCode = require('../helpers/httpStatusCode');
const Exception = require('./exception');
module.exports = class MultipleChoicesException extends Exception {
    constructor(message) {
        super(message, HttpStatusCode.MULTIPLE_CHOICES);
    }
}