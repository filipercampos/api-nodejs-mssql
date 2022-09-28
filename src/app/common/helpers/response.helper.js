'use strict';
const Exception = require('../exceptions/exception');
const log = require('../../../infra/logger/logger');
const HttpStatusCode = require('./http-status-code');

/**
 * Padrão de resposta da API
 */
module.exports = class ResponseHelper {
  /// default key => data
  static response(res, data, code) {
    if (data != null && data.data) {
      res.status(code).json(data);
    } else {
      if (data instanceof Array)
        res.status(code).send({ data: { results: data } });
      else res.status(code).send({ data: data });
    }
    return;
  }

  static error(res, err = 'INTERNAL_SERVER_ERROR', code = 500) {
    /// default key => data
    if (err instanceof Exception) {
      const resData = {
        code: err.code,
        message: err.message,
        status: err.status,
      };
      this.response(res, resData, code || err.code);
    } else {
      log.error(err);
      const data = {
        code: code || HttpStatusCode.INTERNAL_SERVER_ERROR,
        message: err.message ? err.message : err,
        status: 'INTERNAL_SERVER_ERROR',
      };
      this.response(res, data, code || HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Send response OK
   *
   * @param {Response} res
   * @param {Result} result
   */
  static sendSuccess(res, result, code) {
    try {
      ResponseHelper.response(res, result, code || HttpStatusCode.OK);
    } catch (err) {
      this.l;
      ResponseHelper.error(res, err);
    }
  }

  /**
   * Send response ERROR
   *
   * @param {Response} res
   * @param {Result} result
   */
  static sendError(res, err, code) {
    ResponseHelper.error(res, err, code);
  }
};
