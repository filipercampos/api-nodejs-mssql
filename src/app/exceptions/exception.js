'use strict';
const HttpStatusCode = require('../helpers/httpStatusCode');
const ObjectUtils = require('../utils/objectUtil');
/**
 * Exceção para classificação interna de erros
 * 
 * Ex: SQL inválido ou objetos
 * 
 * @author Filipe Campos
 */
module.exports = class Exception extends Error {
    constructor(err, status) {
        super(err || "INTERNAL_SERVER_ERROR");

        let errorMsg = err;
        if (typeof err === 'string') {
            errorMsg = err;
        }
        else if (err.message) {
            errorMsg = err.message;
        }
        else if (err.response && err.response.data && err.response.data.message === 'object') {
            errorMsg = JSON.stringify(err.response.data.message);
        }
        else if (err.isAxiosError && err.response) {
            errorMsg = err.message + `\n ${typeof err.response.data === 'object'
                ? JSON.stringify(err.response.data)
                : err.response.data}`;
        } else {
            //eh um objeto mas nao eh uma exception
            this.data = typeof err === 'object' ? err : undefined;
        }
        this.message = errorMsg;
        this.code = status || 500;
        this.status = ObjectUtils.getKeyFromObject(HttpStatusCode, this.code);
    }
}