
module.exports = {
    toModel: (json) => {
        return {
            "id": json["CodigoUsuario"],
            "nomeUsuario": json["NomeUsuario"],
            "cpf": json["CPF"],
        }
    }
};
