'use strict';

const ResponseHelper = require('../common/helpers/response.helper');
const HttpStatusCode = require('../common/helpers/http-status-code');
const cache = require('memory-cache');
const Exception = require('../common/exceptions/exception');
let memCache = new cache.Cache();

/**
 * Controller route
 * @author Filipe Campos
 */
module.exports = class BaseController {
  constructor(service) {
    //initialize service object
    this._service = service;
  }
  /**
   * Envia um requisição get
   *
   * Aceita cache em memória
   *
   * @param {Request} req
   * @param {Response} res
   * @param {Array} result
   */
  async find(req, res) {
    let cacheContent = null;
    const cacheRequest = req.cache;

    if (cacheRequest) {
      //verifica se recuperou o cache
      cacheContent = memCache.get(cacheRequest.key);
    }

    try {
      let params = req.query;
      if (cacheContent != null) {
        //send cache
        ResponseHelper.response(res, cacheContent, HttpStatusCode.OK);
      } else {
        const results = await this._service.find(params);

        //exists solicitacao de cache
        if (cacheRequest) {
          //save request in cache
          memCache.put(
            cacheRequest.key,
            { results },
            cacheRequest.duration * 1000
          );
        }

        ResponseHelper.response(res, { results }, HttpStatusCode.OK);
      }
    } catch (err) {
      ResponseHelper.error(res, err);
    }
  }

  /**
   * Envia uma requisição get
   *
   * @param {Request} req
   * @param {Response} res
   */
  async findById(req, res) {
    try {
      const id = isNaN(req.params.id) ? req.params.id : parseInt(req.params.id);
      const result = await this._service.findById(id);
      ResponseHelper.response(res, result, HttpStatusCode.OK);
    } catch (err) {
      ResponseHelper.error(res, err);
    }
  }

  /**
   * Envia uma requisição save
   *
   * @param {Request} req
   * @param {Response} res
   */
  async post(req, res) {
    try {
      const result = await this._service.post(req.body);
      ResponseHelper.response(res, result, HttpStatusCode.CREATED);
    } catch (err) {
      ResponseHelper.error(res, err);
    }
  }

  /**
   * Envia uma requisição update
   *
   * @param {Request} req
   * @param {Response} res
   */
  async put(req, res) {
    try {
      const id = req.query.id;
      const body = req.body;
      const result = await this._service.put(id, body);
      ResponseHelper.response(res, result, HttpStatusCode.OK);
    } catch (err) {
      ResponseHelper.error(res, err);
    }
  }

  /**
   * Envia uma requisição update
   *
   * @param {Request} req
   * @param {Response} res
   */
  async patch(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;
      const result = await this._service.patch(id, body);
      ResponseHelper.response(res, result, HttpStatusCode.OK);
    } catch (err) {
      if (err instanceof Exception) {
        ResponseHelper.error(res, err.code, err.message);
      } else {
        ResponseHelper.error(
          res,
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          err.message
        );
      }
    }
  }

  /**
   * Envia uma requisição delete
   *
   * @param {Request} req
   * @param {Response} res
   */
  async deleteById(req, res) {
    try {
      const id = req.params.id;
      const result = await this._service.deleteById(id);
      ResponseHelper.response(res, result, HttpStatusCode.OK);
    } catch (err) {
      ResponseHelper.error(res, err);
    }
  }
};
