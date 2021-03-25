'use strict';
const HttpStatusCode = require('../helpers/httpStatusCode');
const Exception = require('./exception');
module.exports = class AutheticationException extends Exception {
    constructor(message) {
        super(message, HttpStatusCode.UNAUTHORIZED);
    }
}