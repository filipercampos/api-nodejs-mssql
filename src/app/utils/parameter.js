const util = require('./paramValidator');
const _ = require('lodash');

module.exports = class Parameter {

    constructor(endpoint) {
        this.endpoint = endpoint;
        this.queryParams = '';
        this.parameters = [];
    }

    /**
     * Adiciona o parametro e atualiza a url
     * 
     * @param {string} name 
     * @param {any} value 
     * @param {boolean} validate 
     */
    pushParam(name, value, validate = true) {

        if (_.isNil(name)) {
            throw new Error('Informe o nome do parametro para construção da url');
        }

        if (value == 'path') {
            console.log(value);
        }
        if (validate) {
            value = util.toParamValue(value);
        }
        if (value != null) {

            let newUrl = '';
            if (this.parameters.length == 0) {
                newUrl += `?${name}=${value}`;
            } else {
                newUrl += `&${name}=${value}`;
            }
            this.parameters.push({
                "name": name,
                "value": value
            });
            this.queryParams += newUrl;
        }
    }

    /**
     * Adiciona o parametro e atualiza a url
     * @name {Nome} 
     * @value {Valor} 
     */
    pushParamArray(name, ids) {

        ids = util.toParamValue(ids);

        if (_.isArray(ids) && ids.length > 0) {
            let idsString = ids[0];
            for (let i = 1; i < ids.length; i++) {
                const id = ids[i];
                idsString = `${idsString},${id}`;
            }
            this.pushParam(name, idsString, false);
        }
    }

    /**
     * Adiciona um parametro path
     */
    pushPath(value) {

        this.queryParams = `/${util.toParamValue(value)}`;
    }

    pop() {
        this.queryParams = '';
        this.parameters = [];
    }

    popPath() {
        this.queryParams = '';
    }

    /**
     * Converter os parametros informados em payload
     */
    toPayload() {
        let payload = {};

        for (let i = 0; i < this.parameters.length; i++) {
            const o = this.parameters[i];
            payload[o.name] = o.value;
        }
        return payload;
    }

    toUrl() {
        return `${this.endpoint}${_.isNil(this.queryParams) ? '' : this.queryParams}`;
    }

    parseMapToJson(map) {
        let objects = {};

        map.forEach((value, key) => {
            var keys = key.split('.'),
                last = keys.pop();
            keys.reduce((r, a) => r[a] = r[a] || {}, objects)[last] = value;
        });
        return objects;
    }
} 