const {
  BadRequestException,
  UnprocessableEntityException,
} = require('../exceptions');
const { ObjectUtil } = require('../utils');
const { validationResult } = require('express-validator');

/**
 * Request Helper
 */
module.exports = {
  /**
   * Transport data token query/body from request
   *
   * @param {import("express").Request} req
   * @returns {{id: number, nome: string, empresa: number}}
   */
  transportToken(req) {
    if (req && req.security) {
      if (req.method == 'GET') {
        req.query.id = req.security.id;
      } else {
        req.body.id = req.security.id;
      }
    }
  },

  /**
   * Get token data decoded
   *
   * @param {import("express").Request} req
   * @returns {{id: number, name: string}}
   */
  getSecurity(req) {
    if (req && req.security) {
      return req.security;
    } else {
      return null;
    }
  },

  /**
   * Validate query params
   * @param {import("express").Request} req
   * @param {*} params_name
   * @returns
   */
  validateQuery(req, params_name) {
    if (req && req.query) {
      const params_validator = _validateData(req.query, params_name);
      if (params_validator.length > 0) {
        throw new BadRequestException(
          `Parâmetro(s) '${params_validator}' obrigatório(s)`
        );
      }
    } else {
      return null;
    }
  },

  /**
   * Validate body params
   * @param {import("express").Request} req
   * @param {Array<String>} params_name
   * @returns
   */
  validateBody(req, params_name) {
    if (req && req.body) {
      const params_validator = _validateData(req.body, params_name);
      if (params_validator.length > 0) {
        throw new BadRequestException(
          `Payload '${params_validator}' obrigatório(s)`
        );
      }
    } else {
      return null;
    }
  },

  /**
   * Express validation
   * @param {import("express").Request} req
   * @returns {{message:string,hasError:boolean}} Validation
   */
  expressValidator(req, onlyMessage = true) {
    const validRes = validationResult(req);
    if (validRes && validRes.errors.length == 0) {
      return {
        message: null,
        hasError: false,
      };
    }
    //erros validators express
    const errors = validRes.errors;

    let data = {
      message: '',
      hasError: errors.length > 0,
    };

    if (errors.length > 1) {
      const length = errors.length - 1;
      for (let i = 0; i < length; i++) {
        const e = errors[i];
        if (onlyMessage) {
          data.message += `${e.msg},`;
        } else {
          data.message += `${e.param} ${e.msg},`;
        }
      }
      if (onlyMessage) {
        data.message += `${errors[length].msg}`;
      } else {
        data.message += `${errors[length].param} ${errors[length].msg}`;
      }
    } else {
      //length 1
      if (onlyMessage) {
        data.message += `${errors[0].msg}`;
      } else {
        data.message += `${errors[0].param} ${errors[0].msg}`;
      }
    }
    return data;
  },

  /**
   * Throw exception
   *
   * @param {import("express").Request} req
   * @param {number} status
   */
  handleExpressValidator(req, status = 400) {
    const errors = this.expressValidator(req);
    if (errors.hasError) {
      if (status == 400) throw new BadRequestException(errors.message);
      if (status == 422) throw new UnprocessableEntityException(errors.message);
    }
  },
};

function _validateData(obj, params_name) {
  if (ObjectUtil.isEmpty(obj) && params_name) {
    throw new BadRequestException('Required parameters');
  }
  const params = obj;
  const array_validator = [];
  for (const key of params_name) {
    const value = params[key];
    if (!value) {
      array_validator.push(key);
    }
  }
  return array_validator;
}
