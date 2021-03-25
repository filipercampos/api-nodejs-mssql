const mssql = require('mssql');
const BaseRepository = require('./baseRepository');
const UsuarioRepository = require('./usuarioRepository');
const JwtUtil = require('../../utils/jwtUtil');
const exceptions = require('../../exceptions/index');

module.exports = class AuthRepository extends BaseRepository {
    constructor() {
        super();
    }

    async accessToken(params) {

        try {
            const conn = await this.openConnection();
            const sqlText = this.getSqlText('../sqls/autenticacao_usuario_get.sql');

            const result = await conn.request()
                .input('Email', mssql.VarChar(120), params.username)
                .input('Senha', mssql.VarChar(32), params.password)
                .query(sqlText);

            if (this.isResultEmpty(result)) {
                throw new exceptions.AutheticationException('Usuário ou senha inválido(s)');
            }
            const user = this.toFirst(result);
            //generate token
            const token = await this._generateTokenJWT(user);
            return token;
        } catch (error) {
            this.handleError(error);
        }
    }

    async refreshToken(params) {

        try {
            const userRepository = await new UsuarioRepository(params);
            //check user from token
            let user = await userRepository.getById(params.id);
            //generate token
            const token = await this._generateTokenJWT(user);
            return token;
        } catch (error) {
            throw new exceptions.AutheticationException('Token inválido. Impossível renovar token');
        }
    }
    /**
     * Gera um token JWT
     */
    async _generateTokenJWT(user) {

        //dados do token
        const encode = {
            id: user.CodigoUsuario,
            username: user.NomeUsuario,
        };

        //generate token
        const token = await JwtUtil.sign(encode);
        const decoded = JwtUtil.decode(token);
        return {
            "token": token,
            "issuedAt": new Date(new Date(0)).setUTCSeconds(decoded.iat),
            "expiresAt": new Date(new Date(0)).setUTCSeconds(decoded.exp)
        };

    }

}

