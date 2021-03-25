'use strict';

const responseHelper = require('../helpers/responseHelper');
const HttpStatusCode = require('../helpers/httpStatusCode');
const paramValidator = require('../utils/paramValidator');
const SwaggerHelper = require('../helpers/swaggerHelper');
const cache = require('memory-cache');
let memCache = new cache.Cache();

/**
 * Request service HTTP route
 * @author Filipe Campos
 */
module.exports = class BaseController {

    constructor(service) {
        //initialize service object
        this._service = service;
    }

    /**
     * Envia um resposta sucesso
     * 
     * @param {Response} res 
     * @param {Result} result 
     */
    async sendSuccess(res, result) {
        try {
            responseHelper.response(res, result, HttpStatusCode.OK);
        } catch (err) {
            responseHelper.error(res, err);
        }
    }

    /**
     * Envia um resposta erro
     * 
     * @param {Response} res 
     * @param {Result} result 
     */
    async sendError(res, err, code) {
        responseHelper.error(res, err, code);
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
    async get(req, res) {

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
                responseHelper.response(res, cacheContent, HttpStatusCode.OK);
            } else {

                let results = await this._service.get(params);

                //exists solicitacao de cache
                if (cacheRequest) {
                    //save request in cache
                    memCache.put(cacheRequest.key, { results }, cacheRequest.duration * 1000);
                }

                responseHelper.response(res, { results }, HttpStatusCode.OK);
            }

        } catch (err) {
            responseHelper.error(res, err);
        }
    }

    /**
     * Envia uma requisição get
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    async getById(req, res) {
        try {
            const id = isNaN(req.params.id)
                ? req.params.id
                : parseInt(req.params.id);
            let result = await this._service.getById(id);
            responseHelper.response(res, result, HttpStatusCode.OK);
        }
        catch (err) {
            responseHelper.error(res, err);
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
            let result = await this._service.post(req.body);
            responseHelper.response(res, result, HttpStatusCode.CREATED);
        }
        catch (err) {
            responseHelper.error(res, err);
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
            let id = req.query.id.value;
            let body = req.body;
            let result = await this._service.put(id, body);
            responseHelper.response(res, result, HttpStatusCode.OK);
        }
        catch (err) {
            responseHelper.error(res, err);
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
            let id = req.query.id.value;
            let body = req.body;
            let result = await this._service.patch(id, body);
            responseHelper.response(res, result, HttpStatusCode.OK);
        }
        catch (err) {
            if (err instanceof ErroException) {
                responseHelper.responseAPI.error(res, HttpStatusCode.UNPROCESSABLE_ENTITY, err.message, true);
            } else {
                responseHelper.responseAPI.error(res, HttpStatusCode.INTERNAL_SERVER_ERROR, err.message);
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
            let id = req.query.id.value;
            let result = await this._service.deleteById(id);
            responseHelper.response(res, result, HttpStatusCode.OK);
        }
        catch (err) {
            responseHelper.error(res, err);
        }
    }

    /**
     * Recupera o valor do parametro id na request
     * @param {Request} req 
     */
    getParamId(req) {
        return req.query.id.value;
    }

    /**
     * Validate parameter
     */
    toParamValue(o, defaultValue) {
        return paramValidator.toParamValue(o, defaultValue);
    }

    toParams(req) {
        return SwaggerHelper.params(req);
    }
}