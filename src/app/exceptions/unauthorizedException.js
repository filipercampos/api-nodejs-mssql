const Exception = require('./exception');
module.exports = class UnauthorizedException extends Exception {
    constructor(message) {
        super(message, httpStatus.UNAUTHORIZED);
    }
}