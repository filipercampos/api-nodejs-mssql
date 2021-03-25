'use strict';
const HttpStatusCode = require('../helpers/httpStatusCode');
const ObjectUtils = require('../utils/objectUtil');

/**
 * Validação de parametros do swagger
 */
module.exports = (err, req, res, next) => {

    let code = err.status || HttpStatusCode.INTERNAL_SERVER_ERROR;
    let message = err.message + ' ' + err.path;;

    if (err.message && err.message.toLowerCase().includes('x-api-key')) {
        message = "Token is required";
        code = HttpStatusCode.UNAUTHORIZED;
    } else if (req.tokenError) {
        message = req.tokenError;
    } else {
        message = err.message + ' ' + err.path;

    }
    let statusText = ObjectUtils.getKeyFromObject(HttpStatusCode, code);

    const data = {
        code: code,
        message: message,
        status: statusText
    };
    res.status(code).send({ data });
}