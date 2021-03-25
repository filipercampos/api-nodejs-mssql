const config = require('config');
const axios = require('axios');
const https = require('https');
const Exception = require('../exceptions/exception');
const _ = require('lodash');

module.exports = class BaseApiService {

    constructor(baseURL) {
        this._configKey = baseURL;
        this.consoleLog = false;
        //despreza validação de certificado
        this._rejectUnauthorized = false;
    }

    async getAxiosResult(endpoint, headers = null) {
        try {
            const url = this._buildEndpointUrl(endpoint);
            let result = await axios.get(url, this._configDefaultAxios(headers));
            return this._responseData(result);

        } catch (err) {
            this._handleError(err);
        }
    }

    async postAxiosResult(endpoint, data, headers = null) {

        try {
            headers = this._validateHeaders(headers);

            const url = this._buildEndpointUrl(endpoint);

            let result = await axios.post(url, data, this._configDefaultAxios(headers));
            if (result.data.data == undefined) {
                return result.data;
            }
            if (result.data == undefined) {
                return null;
            }
            return result.data.data;
        } catch (err) {
            this._handleError(err);
        }
    }

    async putAxiosResult(endpoint, id, data, headers = null) {
        try {
            headers = this._validateHeaders(headers);

            let url = this._buildEndpointUrl(endpoint);

            if (!_.isNil(id)) {
                url = `${url}/${id}`;
            }
            let result = await axios.put(url, data, this._configDefaultAxios(headers));
            if (result.data.data == undefined) {
                return result.data;
            }
            if (result.data == undefined) {
                return null;
            }
            return result.data.data;
        } catch (err) {
            this._handleError(err);
        }
    }

    async patchAxiosResult(endpoint, id, data, headers = null) {

        try {
            headers = this._validateHeaders(headers);

            let url = this._buildEndpointUrl(endpoint);

            if (!_.isNil(id)) {
                url = `${url}/${id}`;
            }

            let result = await axios.patch(url, data, this._configDefaultAxios(headers));
            if (result.data.data == undefined) {
                return result.data;
            }
            if (result.data == undefined) {
                return null;
            }
            return result.data.data;
        } catch (err) {
            this._handleError(err);
        }
    }

    _buildEndpointUrl(endpointUrl) {
        const baseURL = this._getBaseURL();
        const url = `${baseURL}/${endpointUrl}`;

        this._handleConsole(url);

        return url;
    }

    _handleError(err) {

        if (typeof err == typeof Exception) {
            throw err;
        }
        if (err.isAxiosError && err.response) {
            err.message += err.message + `\n ${typeof err.response.data === 'object' ? JSON.stringify(err.response.data) : err.response.data}`;
        }
        throw err;
    }

    // handleResponseError(err) {
    //     if (err.isAxiosError && err.response) {
    //         const message = ` ${typeof err.response.data === 'object'
    //             ? JSON.stringify(err.response.data) : err.response.data}`;
    //         throw new Exception(message, err.status);
    //     } else {
    //         throw err;
    //     }
    // }

    _getBaseURL() {
        if (this._configKey != undefined) {
            if (config.has(this._configKey)) {
                return config.get(this._configKey);
            }
        }
        throw new Error(`Config API => ${this._configKey} não foi encontrada.`);
    }

    /**
     * Valida e ou seta o header padrão
     */
    _validateHeaders(headers) {
        if (_.isNil(headers)) {
            return null;
        }
        if (headers === "default") {
            headers = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };
        }

        return headers;
    }

    _responseData(result) {

        if (result.data.data == undefined) {
            return result.data;
        }
        if (result.data == undefined) {
            return null;
        }
        return result.data.data;
    }

    getConfigByKey(key) {
        if (config.has(key)) {
            return config.get(key);
        }
        return null;
    }

    _configDefaultAxios(headers) {

        if (headers === "default") {
            headers = {
                'Content-Type': 'application/json',
            };
        }
        else if (_.isNil(headers)) {
            headers = null;
        }
        const httpsAgent = new https.Agent({ rejectUnauthorized: this._rejectUnauthorized });

        const axioConfig = {
            headers: headers,
            httpsAgent: httpsAgent
        };
        return axioConfig;
    }

    _handleConsole(url) {

        /**
         * console.log altera tempo de resposta dos testes
         */
        if (this.consoleLog) {
            console.log('\tRequest => ' + url);
        }
    }
} 