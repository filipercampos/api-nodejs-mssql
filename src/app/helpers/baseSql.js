
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const Exception = require('../exceptions/exception');
const array_util = require('../utils/arrayUtil');

module.exports = class BaseSql {
    constructor() {

    }

    /**
    * Leitura de arquivos .sql directory sql
    * ```
    * '../sqls/file.sql';
    * ```
    * or Use 
    * ```
    * '../sqls/prefix/file.sql';
    * ```
     * @param {string} pathSql 
     * @param {string} prefix 
     */
    getSqlText(pathSql, prefix) {
        try {

            const path_sql = prefix !== undefined ? `${prefix}//${pathSql}` : pathSql;
            const sqlText = fs.readFileSync(path.join(__dirname, path_sql),
                { encoding: 'utf8' }
            );
            if (this.debug) {
                console.log(sqlText);
            }
            return sqlText;

        } catch (err) {
            throw new Exception(`base_repository.getSqlText => Erro na leitura do sql ${pathSql}`);
        }
    }

    /**
     * Check array has data
     */
    isResultEmpty(result) {
        return array_util.isEmpty(result);
    }

    /**
     * Get first object of array
     */
    toFirst(result, model) {
        const value = array_util.toFirst(result);
        if (model) {
            return model.toModel(value);
        }
        return value;
    }

    /**
     * Alterar o response para o modelo 
     * @param {array} result 
     * @param {*} model Modelo
     * @returns {any} Array
     */
    getResponse(result, model) {
        if (this.debug) {
            console.log(result);
        }
        if (this.isResultEmpty(result)) {
            return null;
        }
        const results = array_util.toArray(result);
        if (model) {
            return results.map(i => model.toModel(i));
        }
        return results;
    }

    /**
     * Alterar o response para o modelo com a chave results: []
     * @param {array} result 
     * @param {*} model Modelo
     * @returns {Array} Array
     */
    getResponseResults(result, model) {
        if (this.isResultEmpty(result)) {
            return { results: [] };
        }
        let results = array_util.toArray(result);
        if (model) {
            let mapper = results.map(i => model.toModel(i));
            results = mapper;
        }
        return { results };
    }

    // Accepts the array and key (string)
    groupBy(array, key) {
        // Return the end result
        return array.reduce((result, currentValue) => {
            // If an array already present for key, push it to the array. Else create an array and push the object
            (result[currentValue[key]] = result[currentValue[key]] || []).push(
                currentValue
            );
            // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
            return result;
        }, {}); // empty object is the initial value for result object
    } 
}