'use strict';
const HttpStatusCode = require('../helpers/httpStatusCode');
const Exception = require('./exception');
module.exports = class BadRequestException extends Exception {
    constructor(message) {
        super(message, HttpStatusCode.BAD_REQUEST);
    }
}