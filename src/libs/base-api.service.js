const config = require('config');
const axios = require('axios');
const https = require('https');
const Exception = require('../app/common/exceptions/exception');
const _ = require('lodash');

module.exports = class BaseApiService {
  constructor(baseURL, rejectUnauthorized = false) {
    this._configKey = baseURL;
    this.consoleLog = false;
    //ignore ssl
    this._rejectUnauthorized = rejectUnauthorized ?? false;
  }

  async getAxiosResult(endpoint, headers = null) {
    try {
      const url = this._buildEndpointUrl(endpoint);
      const result = await axios.get(url, this._configDefaultAxios(headers));
      return this._responseData(result);
    } catch (err) {
      this._handleError(err);
    }
  }

  async postAxiosResult(endpoint, data, headers = null) {
    try {
      const url = this._buildEndpointUrl(endpoint);

      const result = await axios.post(
        url,
        data,
        this._configDefaultAxios(headers)
      );
      return this._responseData(result);
    } catch (err) {
      this._handleError(err);
    }
  }

  async putAxiosResult(endpoint, id, data, headers = null) {
    try {
      let url = this._buildEndpointUrl(endpoint);

      if (!_.isNil(id)) {
        url = `${url}/${id}`;
      }
      const result = await axios.put(
        url,
        data,
        this._configDefaultAxios(headers)
      );
      return this._responseData(result);
    } catch (err) {
      this._handleError(err);
    }
  }

  async patchAxiosResult(endpoint, id, data, headers = null) {
    try {
      let url = this._buildEndpointUrl(endpoint);

      if (!_.isNil(id)) {
        url = `${url}/${id}`;
      }

      const result = await axios.patch(
        url,
        data,
        this._configDefaultAxios(headers)
      );
      return this._responseData(result);
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
      err.message +=
        err.message +
        `\n ${
          typeof err.response.data === 'object'
            ? JSON.stringify(err.response.data)
            : err.response.data
        }`;
    }
    throw err;
  }

  _getBaseURL() {
    if (this._configKey != undefined) {
      if (config.has(this._configKey)) {
        return config.get(this._configKey);
      }
    }
    throw new Error(`Config API => ${this._configKey} not found`);
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
    if (headers === 'default') {
      headers = {
        'Content-Type': 'application/json',
      };
    } else if (_.isNil(headers)) {
      headers = null;
    }
    const httpsAgent = new https.Agent({
      rejectUnauthorized: this._rejectUnauthorized,
    });

    const axioConfig = {
      headers: headers,
      httpsAgent: httpsAgent,
    };
    return axioConfig;
  }

  _handleConsole(url) {
    if (this.consoleLog) {
      console.log('\tRequest => ' + url);
    }
  }
};
