'use strict';
const config = require('config');
const _ = require('lodash');
const ParameterUtil = require('../utils/parameter');
const BaseApiService = require('./baseApiService');
const paramValidator = require('../utils/paramValidator');

module.exports = class MarvelApiService extends BaseApiService {

    constructor() {
        super('API_CONFIG.API_MARVEL.BASE_URL');
        this._apiKey = this.getConfigByKey('API_CONFIG.API_MARVEL.API_KEY');
    }

    async getCharacteres(params) {
        const pUtil = new ParameterUtil('characters');
        pUtil.pushParam('apikey', this._apiKey);
        pUtil.pushParam('name', params.name);
        return await this.getAxiosResult(pUtil.toUrl());
    }

    async getCharacterById(id) {
        const pUtil = new ParameterUtil(`characters/${id}`);
        pUtil.pushParam('apikey', this._apiKey);
        return await this.getAxiosResult(pUtil.toUrl());
    }
}