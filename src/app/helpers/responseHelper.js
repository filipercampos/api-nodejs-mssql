
'use strict';
const Exception = require('../exceptions/exception');
const log = require('../../infrastructure/logger/logger');
const HttpStatusCode = require('./httpStatusCode');


/**
 * Padrão de resposta da API
 */
module.exports = class ResponseHelper {

    /// default key => data
    static response(res, data, code) {
        if (data != null && data.data) {
            res.status(code).json(data);
        } else {
            res.status(code).send({ data: data });
        }
        return;
    }

    /// default key => data
    static error(res, err, code) {

        if (err instanceof Exception) {
            const resData = {
                "code": err.code,
                "message": err.message,
                "status": err.status
            }
            this.response(res, resData, code || err.code);
        }
        else {
            log.error(err);
            const data = {
                "code": code || HttpStatusCode.INTERNAL_SERVER_ERROR,
                "message": err,
                "status": "INTERNAL_SERVER_ERROR"
            }
            this.response(res, data, code);
        }
    }
}