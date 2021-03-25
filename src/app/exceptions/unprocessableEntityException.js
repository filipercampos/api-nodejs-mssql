const Exception = require('./exception');
module.exports = class UnprocessableEntityException extends Exception {
    constructor(message) {
        super(message, httpStatus.UNPROCESSABLE_ENTITY);
    }
}