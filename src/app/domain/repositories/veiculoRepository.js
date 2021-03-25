'use strict';
const mssql = require('mssql');
const BaseRepository = require('./baseRepository');

module.exports = class VeiculoRepository extends BaseRepository {

    constructor() {
        super();
    }

    /**
     * Recupera dados de veiculos
     */
    async getById(params) {
        try {
            const veiculoId = this.toParamValue(params.id);
            const result = await this.get(veiculoId);
            return this.toFirst(result);

        } catch (error) {
            this.handleError(error);
        }
    }

    /**
     * Recupera dados de veiculos
     */
    async get(params) {
        try {

            const sqlText = this.getSqlText('../sql/veiculo_get.sql')
            const veiculoIdPlaca = this.toParamValue(params.veiculoIdPlaca);
            const pagination = this.toParamsPagination(params);
            const conn = await this.openConnection();
            const request = await conn.request();
            //check is Placa ou CodigoMVA
            let fieldName = isNaN(veiculoIdPlaca) ? 'Placa' : 'CodigoMVA';

            let sqlFilter = ' WHERE 1 = 1 ';
            if (veiculoIdPlaca != null) {
                sqlFilter += `AND ${fieldName} @CodigoMVAPlaca `
                request.input('CodigoMVAPlaca', mssql.VarChar, veiculoIdPlaca)

            }

            if (pagination != null) {
                request.input('Page', mssql.Int, pagination.page);
                request.input('RowsCount', mssql.Int, pagination.rows);
            }

            const result = await conn.request().query(sqlText);

            return this.getResponseResultModel(result);

        } catch (error) {
            this.handleError(error);
        }
    }


    /**
     * Recuperar dados de modelos de veiculos
     */
    async findModelo(params) {
        try {
            const conn = await this.openConnection();


            const request = conn.request();
            let sqlFilter = ' WHERE 1 = 1 ';
            if (params.modeloId !== null) {
                request.input('CodigoModelo', mssql.Int, params.modeloId);
                sqlFilter = sqlFilter + ' AND VeiculosModelos.CodigoModelo =@CodigoModelo'
            }
            if (params.modelo !== null && params.modelo !== undefined) {
                request.input('Descricao', mssql.VarChar(200), this.toParamValue(params.modelo));
                sqlFilter = sqlFilter + ' AND VeiculosModelos.Descricao = @Descricao'
            }
            const sqlText = `
                           SELECT 
                            CodigoModelo ModeloId,
                            Descricao Modelo
                           FROM VeiculosModelos
                           ${sqlFilter}       
                     `
            const result = await request.query(sqlText);

            return this.getResponseResultModel(result);

        } catch (err) {
            this.handleError(err, 'VeiculoRepository', 'findModelo');
        }
    }
}
