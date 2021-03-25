'use strict';
const mssql = require('mssql');
const _defaultConfig = require('../config/dbConfigMssql');

/**
 * Pool de conexão com o banco de dados SQL Server
 * 
 * @author Filipe Campos
 */
module.exports = class MssqlFactory {

    constructor(config) {
        this._config = config || _defaultConfig;
    }
    static async checkConnection(callback) {
        const pool = new mssql.ConnectionPool(_defaultConfig);
        // Attempt to connect 
        pool.connect().then((conn) => {
            conn.close();
            callback();
        }).catch((err) => {
            console.error(`Falha na conexão com o banco de dados`);
            console.error(err);
        }); 
    }

    connectPool() {
        const pool = new mssql.ConnectionPool(_defaultConfig).connect();
        return pool;
    }

    connectPoolConfig(config) {
        if (!config || config == null) {
            config = _defaultConfig;
        }
        const pool = new mssql.ConnectionPool(config).connect();
        return pool;
    }

    connectPoolDatabase(database) {
        if (!database) {
            throw new Error('Database não foi setado');
        }
        const config = _defaultConfig.getConnection(database);
        if (!config) {
            throw new Error('Configuração de ambiente do banco de dados não encontrada');
        }
        const pool = new mssql.ConnectionPool(config).connect();
        return pool;
    }
}