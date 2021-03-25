const { BadRequestException } = require("../exceptions");
const ObjectUtils = require("../utils/objectUtil");

/**
 * Validação secundária parametros do swagger
 */
module.exports = {

    get(req, name_param) {
        if (req && req.query && req.query) {
            const params = req.query;

            return (params[name_param])
                ? params[name_param]
                : null;

        } else {
            return null;
        }
    },
    validateQuery(req, params_name) {
        if (req && req.query) {
            const params_validator = _validateData(req.query, params_name);
            if (params_validator.length > 0) {
                throw new BadRequestException(`Parâmetro(s) '${params_validator}' obrigatório(s)`);
            }
        } else {
            return null;
        }
    },
    validateBody(req, params_name) {
        if (req && req.body) {
            const params_validator = _validateData(req.body, params_name);
            if (params_validator.length > 0) {
                throw new BadRequestException(`Payload '${params_validator}' obrigatório(s)`);
            }
        } else {
            return null;
        }
    }
};

function _validateData(obj, params_name) {
    if (ObjectUtils.isEmpty(obj) && params_name) {
        throw new BadRequestException(`Verifique os parametros obrigatórios`);
    }
    const params = obj;
    const array_validator = [];
    for (const key of params_name) {
        const value = params[key];
        if (!value) {
            array_validator.push(key);
        }
    }
    return array_validator;
}
