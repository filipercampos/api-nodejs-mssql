'use strict';
const HttpStatusCode = require('../common/helpers/http-status-code');
const { ObjectUtil } = require('../common/utils');

/**
 * Validação de parametros do swagger
 */
module.exports = (err, req, res, next) => {
  const code = err.status || HttpStatusCode.INTERNAL_SERVER_ERROR;
  let message = req.tokenError ? req.tokenError : err.message + ' ' + err.path;

  //change message
  if (message.toLowerCase().includes('x-api-key')) {
    message = 'X-API-Key token is required';
  }
  const statusText = ObjectUtil.getKeyFromObject(HttpStatusCode, code);

  const data = {
    code: code,
    message: message,
    status: statusText,
  };
  res.status(code).send({ data });
};
